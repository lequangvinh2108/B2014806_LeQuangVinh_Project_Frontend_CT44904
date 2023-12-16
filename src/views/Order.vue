<template>
  <div>
    <h2 class="text-center">Đơn Hàng của Bạn</h2>

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
        <div class="delete-btn-container">
          <button class="delete-btn" @click="deleteOrder(order._id)">
            Hủy đơn hàng
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
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
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
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
  </style>
  