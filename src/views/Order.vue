<!-- Order.vue -->
<template>
  <div>
    <h2>Chi Tiết Đơn Hàng</h2>

    <div v-if="order">
      <div>
        <h3>Thông Tin Đơn Hàng</h3>
        <p><strong>Mã Đơn Hàng:</strong> {{ order._id }}</p>
        <p><strong>Ngày:</strong> {{ formatOrderDate(order.orderDate) }}</p>
        <p><strong>Tổng Tiền:</strong> {{ formatCurrency(order.totalMoney) }}</p>
      </div>

      <div>
        <h3>Thông Tin Giao Hàng</h3>
        <p><strong>Tên:</strong> {{ order.name }}</p>
        <p><strong>Địa Chỉ:</strong> {{ order.address }}</p>
        <p><strong>Điện Thoại:</strong> {{ order.phone }}</p>
      </div>

      <div>
        <h3>Sản Phẩm Đã Đặt</h3>
        <ul>
          <li v-for="(item, index) in order.cart" :key="index">
            {{ item.product.name }} - {{ item.quantity }} x {{ formatCurrency(item.product.price) }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <p>Không tìm thấy đơn hàng.</p>
    </div>
  </div>
</template>

<script>
import OrderService from "../services/order.service";

export default {
  data() {
    return {
      order: null,
    };
  },
  methods: {
    async getOrderDetails() {
      const userId = localStorage.getItem("userId");
      const orderId = this.$route.params.orderId;

      try {
  const orderData = await OrderService.getOrder(userId, orderId);
  console.log("API Response:", orderData);
  if (orderData) {
    this.order = orderData;
  } else {
    console.error("Không tìm thấy dữ liệu đơn hàng.");
  }
} catch (error) {
  console.error("Lỗi khi lấy chi tiết đơn hàng:", error.message);
}

    },
    formatCurrency(value) {
      // Hàm formatCurrency giữ nguyên như bạn đã định nghĩa trong file Cart.vue
    },
    formatOrderDate(date) {
      // Bổ sung hàm formatOrderDate nếu cần thiết để định dạng ngày
    },
  },
  created() {
    this.getOrderDetails();
  },
};
</script>

<style scoped>
/* Thêm kiểu dáng theo ý bạn */
</style>
