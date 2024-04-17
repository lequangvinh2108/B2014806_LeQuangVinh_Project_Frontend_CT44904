<template>
  <div>
    <h2 class="text-center" style="color: red;">Đơn Hàng của Bạn</h2>

    

    <div v-if="userOrders && userOrders.length > 0">
      <div v-for="order in userOrders" :key="order._id" class="order-column">
        <div>
          <strong>Người Đặt:</strong> {{ order.name }}
        </div>
        <div>
          <strong>ID:</strong> {{ order.userId }}
        </div>
        <div>
          <strong>Mã Đơn Hàng:</strong> {{ order._id }}
        </div>
        <div>
          <strong>Thông Tin Sản Phẩm:</strong>
          <ul>
            <li v-for="product in order.cart" :key="product._id">
              <span>
                <img :src="product.product.imgUrl" alt="Product Image" class="product-image" />
              </span>
              <span>
                {{ product.product.name }} - {{ formatCurrency(product.product.price) }} (Số lượng: {{ product.quantity }})
              </span>
            </li>
          </ul>
        </div>
        <div>
          <strong>Ngày Đặt Hàng:</strong> {{ formatDate(order.orderDate) }}
        </div>
        <div>
          <strong>Tổng Tiền:</strong> {{ formatCurrency(order.totalMoney) }}
        </div>
        <!-- Hiển thị hướng dẫn giao hàng -->
        <div>
          <strong>Hướng Dẫn Giao Hàng:</strong> {{ order.deliveryInstructions }}
        </div>

        <div>
          <strong>Phương thức giao hàng:</strong> {{ order.deliveryMethods }}
        </div>

        <div>
          <strong>Phương thức thanh toán:</strong> {{ order.paymentMethods }}
        </div>

        <div>
          <strong>Trạng thái giao hàng:</strong> {{ order.orderStatus }}
        </div>

        <div class="action-buttons" >
          <div class="delete-btn-container md-6">
            <button class="delete-btn" @click="deleteOrder(order._id)" >
              Hủy đặt hàng
            </button>
          </div>
          

          <!-- Hiển thị nút "Đánh giá" nếu orderStatus là "Hoàn thành" -->
          <div v-if="order.orderStatus === 'Hoàn thành'" class="review-btn-container md-6">
            <button class="review-btn" @click="reviewOrder(order)">
              Đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center" style="background-color: aqua;">
      <p>Bạn chưa có đơn hàng nào.</p>
    </div>
    
  </div>
</template>
  
  <script>
  import OrderService from "../services/order.service";
  
  export default {
    data() {
      return {
        userOrders: [],
        
        
      };
    },
    
    methods: {
      async getUserOrders() {
        const userId = localStorage.getItem("userId");
  
        try {
          this.userOrders = await OrderService.getUserOrders(userId);
        } catch (error) {
          console.error("Lỗi khi lấy đơn hàng:", error.message);
        }
      },
  
      async deleteOrder(orderId) {
        try {
          console.log("Deleting order:", orderId);
          const userId = localStorage.getItem("userId");
          await OrderService.deleteOrder(userId, orderId);
          this.getUserOrders();
        } catch (error) {
          console.error("Lỗi khi xóa đơn hàng:", error.message);
        }
      },
      async deleteOrder(orderId) {
    try {
        console.log("Deleting order:", orderId);
        const userId = localStorage.getItem("userId");
        await OrderService.deleteOrder(userId, orderId);
        
        // Lấy danh sách sản phẩm trong đơn hàng
        const order = this.userOrders.find(order => order._id === orderId);
        if (order) {
            for (const product of order.cart) {
                // Cập nhật số lượng sản phẩm
                await ProductService.updateProductQuantity(product.product._id, product.quantity);
            }
        }

        this.getUserOrders();
    } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error.message);
    }
},

  
      formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      },
  
      formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },

      async reviewOrder(order) {
  try {
    // Lấy userId từ localStorage
    const userId = localStorage.getItem("userId");
    // Lưu thông tin sản phẩm cần đánh giá vào localStorage
    localStorage.setItem("reviewData", JSON.stringify({
      userId: userId,
      productId: order.cart[0].product._id,
      productName: order.cart[0].product.name
    }));
    // Chuyển hướng đến trang review
    this.$router.push("/review");
  } catch (error) {
    console.error("Lỗi khi đánh giá đơn hàng:", error.message);
  }
}

   
    },
    mounted() {
      this.getUserOrders();
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles remain unchanged */
  
  .order-column {
    display: flex;
    flex-direction: column;
    border: 2px solid #121111;
    padding: 10px;
    margin-bottom: 30px;
    background-color: antiquewhite;
  }

  .action-buttons {
  display: flex;
  justify-content: space-between; /* Canh nút sang hai bên */
  align-items: center; /* Canh giữa theo chiều dọc */
  }
  
  .delete-btn-container {
    margin-top: 10px;
    text-align: right;
  }
  
  .delete-btn {
    background-color: #ff0000;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .review-btn-container {
    margin-top: 10px;
    text-align: right;
  }

  .review-btn {
    background-color: green;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: #cc0000;
  }
  
  .product-image {
    max-width: 50px; /* Adjust the size based on your preference */
    margin-right: 10px;
  }
  
  /* Center text horizontally */
  .text-center {
    text-align: center;
  }

  .payment-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.payment-btn:hover {
  background-color: #45a049;
}
  </style>
  