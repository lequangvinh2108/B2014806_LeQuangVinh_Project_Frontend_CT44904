  <template>
    <div>
      <h2>Shopping Cart</h2>

      <div v-if="cart && cart.items && cart.items.length > 0">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart.items" :key="index">
              <td class="center">{{ item.product.name }}</td>
              <td class="center"><img :src="item.product.imgUrl" alt="" style="width: 50px;"></td>
              <td class="center">{{ formatCurrency(item.product.price) }}</td>
              <td class="center quantity-column">
                <div class="quantity-container">
                  <button @click="decreaseQuantity(item)">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input type="text" :id="'quantity' + item.productId" class="small-input" v-model="item.quantity">
                  <button @click="increaseQuantity(item)">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td class="center">{{ formatCurrency(calculateTotal(item)) }}</td>
              <td class="center"><button @click="removeItem(item)">Remove</button></td>
            </tr>
          </tbody>
        </table>

        <!-- Display total sum below the table -->
        <div class="total-sum">
          <span>Total Sum:</span>
          <span>{{ formatCurrency(calculateTotalSum()) }}</span>
        </div>
        <button @click="openOrderModal">Đặt hàng ngay</button>

        <!-- Order Modal -->
        <div v-if="isOrderModalOpen" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeOrderModal">&times;</span>

            <!-- Order Form -->
            <form @submit.prevent="submitOrder" class="modal-form">
              <h2 style="text-align: center;">Nhập thông tin khách hàng</h2>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="orderForm.name" required>
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="orderForm.address" required>
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" id="phone" v-model="orderForm.phone" required>
              </div>
              <button type="submit" class="red-button">Đặt hàng</button>
            </form>
          </div>
        </div>
      </div>

      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>

  <script>
  import CartService from "../services/cart.service";
  import OrderService from "../services/order.service";
  import _ from "lodash";


  export default {
    data() {
      return {
        cart: { items: [] },
        isOrderModalOpen: false,
        orderForm: {
          name: "",
          address: "",
          phone: ""
        },
      };
    },
    methods: {
      async getCart() {
        const userId = localStorage.getItem("userId");
        this.cart = await CartService.getCart(userId);
      },

      calculateTotal(item) {
        return item.quantity * item.product.price;
      },

      calculateTotalSum() {
        if (this.cart && this.cart.items) {
          return this.cart.items.reduce((sum, item) => sum + this.calculateTotal(item), 0);
        } else {
          return 0;
        }
      },

      formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      },

      increaseQuantity(item) {
        item.quantity++;
        this.updateQuantity(item);
      },

      decreaseQuantity(item) {
        if (item.quantity > 1) {
          item.quantity--;
          this.updateQuantity(item);
        }
      },

      async updateQuantity(item) {
        const userId = localStorage.getItem("userId");
        await CartService.updateQuantity(userId, item.productId, item.quantity);
        this.getCart();
      },

      async removeItem(item) {
        const userId = localStorage.getItem("userId");
        await CartService.removeItem(userId, item.productId);
        this.getCart();
      },

      openOrderModal() {
        this.isOrderModalOpen = true;
      },

      closeOrderModal() {
        this.isOrderModalOpen = false;
      },

      async submitOrder() {
      const userId = localStorage.getItem("userId");

      if (!this.orderForm.name || !this.orderForm.address || !this.orderForm.phone) {
        console.error("Please fill in all required information.");
        return;
      }

      if (!this.cart || !this.cart.items) {
        console.error("Error placing order: Cart or cart items are undefined.");
        return;
      }

      console.log("Order Data:", userId, this.cart.items, this.orderForm.address, this.orderForm.name, this.orderForm.phone, this.calculateTotalSum());

      try {
  const order = await OrderService.createOrder(
    userId,
    this.cart.items,
    this.orderForm.address,
    this.orderForm.name,
    this.orderForm.phone,
    this.calculateTotalSum()
  );
  console.log("Phản hồi đơn hàng:", order);

  // Kiểm tra xem sau khi đặt hàng, giỏ hàng có bị xóa không
  console.log("Giỏ hàng trước khi xóa:", this.cart);

  // Xóa giỏ hàng sau khi đặt hàng
  try {
    await CartService.clearCart(userId);
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error.message);
  }

  // Kiểm tra xem sau khi xóa giỏ hàng, giỏ hàng có trống không
  console.log("Giỏ hàng sau khi xóa:", this.cart);

  // Chuyển hướng người dùng đến trang chi tiết đơn hàng
  this.$router.push({ name: 'order', params: { userId: order.userId, orderId: order._id } });
} catch (error) {
  console.error("Lỗi khi đặt hàng:", error.message);
  this.closeOrderModal();
  this.getCart();
  // Chuyển hướng đến trang order.vue với userId của người dùng
  this.$router.push({ name: 'order', params: { userId: userId, orderId: 'dummyOrderId' } });
}


    },


    },
    mounted() {
      this.getCart();
    },
  };
  </script>
  <style scoped>
  /* Your existing styles remain unchanged */

  .total-sum {
    margin-top: 10px;
    text-align: right;
  }

  .total-sum span {
    margin-left: 10px;
    font-weight: bold;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th, td.center {
    text-align: center;
  }

  .th.center {
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  button {
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
  }

  .quantity-container {
    display: flex;
    align-items: center;
    justify-content: center; /* Center the content horizontally */
  }

  .quantity-container button {
    margin: 0 5px;
  }

  .small-input {
    width: 40px; /* Adjust the width as needed */
  }

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 2px;
    border: 1px solid #888;
    width: 60%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .form-group {
    margin-bottom: 15px;
    width: 100%;
  }

  .form-group label {
    margin-bottom: 5px;
    width: 100%;
  }

  .form-group input {
    padding: 8px;
    width: calc(100% - 16px);
  }

  .red-button {
    cursor: pointer;
    background-color: #ff0000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    align-self: flex-start;
    margin-top: 10px;
  }

  </style>


