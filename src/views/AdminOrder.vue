<!-- src/views/AdminOrder.vue -->

<template>
    <div class="container mt-5">
      <h2 class="text-center">Danh sách đơn hàng</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID Đơn hàng</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Người đặt hàng</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>{{ order._id }}</td>
            <td>{{ formatOrderDate(order.orderDate) }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.phone }}</td>
            <td>{{ order.totalMoney }}đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          // Gọi API để lấy danh sách đơn hàng từ backend
          const response = await axios.get('http://localhost:3002/api/orders/getAllOrders');
  
          // Kiểm tra và xử lý phản hồi từ server
          if (response.data && Array.isArray(response.data)) {
            this.orders = response.data;
          } else {
            console.error('Lỗi khi lấy danh sách đơn hàng:', response.data.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Lỗi khi lấy danh sách đơn hàng:', error.message || 'Unknown error');
        }
      },
      formatOrderDate(orderDate) {
        // Format ngày đặt hàng theo ý muốn của bạn
        return new Date(orderDate).toLocaleString();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Thêm các quy tắc CSS cho style của component nếu cần */
  </style>
  