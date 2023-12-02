<template>
  <div class="container mt-5">
    <h2 class="text-center">Danh sách đơn hàng</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID Đơn hàng</th>
          <!-- <th scope="col">ID Khách hàng</th> -->
          <th scope="col">Người đặt hàng</th>
          <th scope="col">Ngày đặt hàng</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <!-- <td>{{ order.userId }}</td> -->
          <td>{{ order.name }}</td>
          <td>{{ formatOrderDate(order.orderDate) }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.phone }}</td>
          <td class="text-right">{{ formatCurrency(order.totalMoney) }}</td>
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
        const response = await axios.get('http://localhost:3002/api/orders/getAllOrders');
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
      return new Date(orderDate).toLocaleString();
    },
    formatCurrency(amount) {
      // Định dạng số tiền theo tiền Việt Nam (VND)
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
  },
};
</script>

<style scoped>

/* Định dạng căn lề phải cho cột totalMoney */
.text-right {
  text-align: right;
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
</style>