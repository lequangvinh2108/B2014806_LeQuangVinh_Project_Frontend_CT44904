  <template>
    <div>
      <h2 style="text-align: center; font-style: italic;"><i class="fas fa-shopping-cart">Giỏ hàng</i></h2>

      <div v-if="cart && cart.items && cart.items.length > 0">
        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart.items" :key="index">
              <td class="center">{{ item.product.name }}</td>
              <td class="center"><img :src="item.product.imgUrl" alt="" style="width: 50px;"></td>
              <td class="center">{{ formatCurrency(item.product.discountedPrice || item.product.price ) }}</td>
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
              <td class="center"><button @click="removeItem(item)">Xóa</button></td>
            </tr>
          </tbody>
        </table>

        <!-- Display total sum below the table -->
        <div class="total-sum">
          <span>Tổng giá:</span>
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
                <label for="name">Tên:</label>
                <input type="text" id="name" v-model="orderForm.name" required>
              </div>
              <div class="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address" v-model="orderForm.address" required>
              </div>
              <div class="form-group">
                <label for="phone">Số điện thoại:</label>
                <input type="text" id="phone" v-model="orderForm.phone" required>
              </div>
              <div class="form-group">
                <label for="deliveryInstructions">Hướng dẫn giao hàng:</label>
                <input id="deliveryInstructions" v-model="orderForm.deliveryInstructions">
            </div>
            <!-- Chọn phương thức giao hàng -->
            <div class="form-group">
              <label for="deliveryMethod"><b>Chọn phương thức giao hàng:</b></label>
              <select v-model="selectedDeliveryMethod" id="deliveryMethod">
                <option v-for="method in deliveryMethods" :key="method.value" :value="method.value">
                  {{ method.label }}
                </option>
              </select>
            </div>

            <!-- Chọn phương thức thanh toán -->
            <div class="form-group">
              <label for="paymentMethod"><b>Chọn phương thức thanh toán:</b></label>
              <select v-model="selectedPaymentMethod" id="paymentMethod">
                <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
                  {{ method.label }}
                </option>
              </select>
            </div>

            <!-- Hiển thị tổng tiền trong modal -->
            <div class="form-group">
              <label><b>Tổng tiền:</b></label>
              <span>{{ formatCurrency(totalAmount) }}</span>
            </div>
            

              <button type="submit" class="red-button">Đặt hàng</button>
            </form>
          </div>
        </div>
      </div>

      <div v-else style="text-align: center;" >
        <p>Your cart is empty.</p>
      </div>
      
      
    </div>
  </template>

  <script>
  
  import CartService from "../services/cart.service";
  import OrderService from "../services/order.service";
  import ProductService from "../services/product.service";
  import DiscountService from "../services/discount.service";
  import _ from "lodash";


  export default {
  
    data() {
      return {
        cart: { items: [] },
        isOrderModalOpen: false,
        orderForm: {
          name: "",
          address: "",
          phone: "",
          deliveryInstructions: "",
        },
        // Thêm dữ liệu cho phương thức giao hàng và thanh toán
        deliveryMethods: [
          { value: 'Giao hàng tiết kiệm', label: 'Giao hàng tiết kiệm (10,000 VND)' },
          { value: 'Giao hàng nhanh', label: 'Giao hàng nhanh (15,000 VND)' }
        ],
        paymentMethods: [
          { value: 'Khi nhận hàng', label: 'Thanh toán khi nhận hàng' },
          { value: 'VNPay', label: 'VNPay' }
        ],

        selectedDeliveryMethod: 'Giao hàng tiết kiệm',
        selectedPaymentMethod: 'Khi nhận hàng',

        totalAmount: 0,

        orderStatus: "Đã đặt",
      };
    },
    methods: {
      async getCart() {
      const userId = localStorage.getItem("userId");
      this.cart = await CartService.getCart(userId);
      // Áp dụng giảm giá cho các sản phẩm trong giỏ hàng
      this.applyDiscountsToCartItems();
    },

    async applyDiscountsToCartItems() {
      for (const item of this.cart.items) {
        await this.applyDiscountToCartItem(item);
      }
    },

    async applyDiscountToCartItem(cartItem) {
      try {
        const productDiscount = await DiscountService.getDiscountByCode(cartItem.product.code);
        if (productDiscount && productDiscount.discount) {
          const discountPercent = productDiscount.discount;
          const discountedPrice = cartItem.product.price - (cartItem.product.price * discountPercent / 100);
          cartItem.product.discountedPrice = discountedPrice;
          console.log("discountedPrice: ",discountedPrice);
        }
      } catch (error) {
        console.error("Error applying discount to cart item:", error);
      }
    },

    calculateTotal(item) {
  // Kiểm tra xem sản phẩm có giá đã giảm không
  if (item.product.discountedPrice !== undefined && item.product.discountedPrice !== null) {
    return item.quantity * item.product.discountedPrice;
  } else {
    // Nếu không, tính tổng dựa trên giá gốc của sản phẩm
    return item.quantity * item.product.price;
  }
},

calculateTotalSum() {
  if (this.cart && this.cart.items) {
    let productsTotal = 0;
    // Lặp qua các sản phẩm trong giỏ hàng
    this.cart.items.forEach(item => {
      // Kiểm tra xem sản phẩm có giá đã giảm không
      if (item.product.discountedPrice !== undefined && item.product.discountedPrice !== null) {
        // Nếu có giá đã giảm, cộng tổng dựa trên giá đã giảm
        productsTotal += item.quantity * item.product.discountedPrice;
      } else {
        // Nếu không, cộng tổng dựa trên giá gốc của sản phẩm
        productsTotal += item.quantity * item.product.price;
      }
    });

    // Tính phí giao hàng
    const deliveryCost = this.selectedDeliveryMethod === 'Giao hàng tiết kiệm' ? 10000 : 15000;

    // Tính tổng số tiền đặt hàng
    this.totalAmount = productsTotal + deliveryCost;

    return productsTotal;
  } else {
    this.totalAmount = 0;
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

      // Kiểm tra xem đã chọn phương thức giao hàng và thanh toán chưa
      if (!this.selectedDeliveryMethod || !this.selectedPaymentMethod) {
        console.error("Vui lòng chọn phương thức giao hàng và thanh toán.");
        return;
      }

      if (!this.orderForm.name || !this.orderForm.address || !this.orderForm.phone) {
        console.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
        return;
      }

      if (!this.cart || !this.cart.items) {
        console.error("Lỗi khi đặt hàng: Giỏ hàng hoặc sản phẩm trong giỏ hàng không xác định.");
        return;
      }

      try {

        const productsTotal = this.calculateTotalSum();
        const deliveryCost = this.selectedDeliveryMethod === 'Giao hàng tiết kiệm' ? 10000 : 15000;
        const totalAmount = productsTotal + deliveryCost;

        const order = await OrderService.createOrder(
          userId,
          this.cart.items,
          this.orderForm.address,
          this.orderForm.name,
          this.orderForm.phone,
          totalAmount, 
          // this.calculateTotalSum(),
          this.orderForm.deliveryInstructions,
          this.selectedDeliveryMethod, // Thêm phương thức giao hàng
          this.selectedPaymentMethod ,// Thêm phương thức thanh toán
          this.orderStatus,
        );

        // Lấy danh sách sản phẩm trong giỏ hàng
        const cartItems = this.cart.items;

        // Cập nhật số lượng sản phẩm trong collection "products"
        for (const item of cartItems) {
          await ProductService.updateCode(item.product.code, { quantity: item.product.quantity - item.quantity });
        }

        // Xóa giỏ hàng sau khi đặt hàng
        await CartService.clearCart(userId);
        
        // Chuyển hướng người dùng đến trang sản phẩm
        this.$router.push({ name: 'order' });
        
      } catch (error) {
        console.error("Lỗi khi đặt hàng:", error.message);
        this.closeOrderModal();
        this.getCart();
        
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
    border: 2px solid #0a0a0a;
    padding: 10px;
    text-align: left;
  }

  th, td.center {
    text-align: center;
  }

  .th.center {
    text-align: center;
  }

  th {
    background-color: yellow;
  }

  td {
   background-color: beige
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

  /* Thêm style mới cho phương thức thanh toán */
  .payment-method {
    display: flex;
    align-items: left;
  }

  .payment-method input {
    margin-right: 5px; /* Điều chỉnh khoảng cách giữa nút radio và nhãn */
  }

  </style>


