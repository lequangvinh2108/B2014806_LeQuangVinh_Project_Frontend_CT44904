<template>
    <div class="order-column" style="background-color:bisque;">
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
      <!-- Thêm các thông tin khác cần hiển thị từ order.vue -->
      <div>
        <strong>Ngày Đặt Hàng:</strong> {{ formatDate(order.orderDate) }}
      </div>
      
      <div>
        <strong>Địa chỉ:</strong> {{ order.address }}
      </div>
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
        <strong>Tổng Tiền:</strong> {{ formatCurrency(order.totalMoney) }}
      </div>
      <!-- <div>
        <strong>Trạng thái giao hàng:</strong> {{ order.deliveryStatus }}
      </div> -->
      <!-- <div class="delete-btn-container">
        <button class="delete-btn" @click="submitOrder(order._id)">
          Nhận đơn
        </button>
      </div> -->
      <div class="delete-btn-container">
      <button 
        class="delete-btn" 
        :class="{ 'received-btn': order.isOrderReceived }"
        @click="submitOrder(order._id)"
        :disabled="order.isOrderReceived"
      >
        {{ order.isOrderReceived ? 'Đã nhận đơn' : 'Nhận đơn' }}
      </button>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      order: Object,
      submitOrder: Function,
    },
    methods: {
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
    // Kiểm tra trạng thái đã nhận đơn từ localStorage khi tải lại trang
    const receivedOrders = JSON.parse(localStorage.getItem("receivedOrders")) || [];
    this.order.isOrderReceived = receivedOrders.includes(this.order._id);
  },
  };
  </script>
  
  <style scoped>
  /* Your existing styles remain unchanged */
  
  .order-column {
    display: flex;
    flex-direction: column;
    border: 3px solid #1c0850;
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

  .received-btn {
  background-color: #888888; /* Màu xám cho nút đã nhận đơn */
  cursor: not-allowed;
}

.received-btn:hover {
  background-color: #888888;
}
  </style>
  