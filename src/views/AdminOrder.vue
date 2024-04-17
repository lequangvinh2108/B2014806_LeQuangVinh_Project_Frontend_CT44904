<template>
  <div class="container mt-5">
    <h2 class="text-center">Danh sách đơn hàng</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID Đơn hàng</th>
          <th scope="col">Người đặt hàng</th>
          <th scope="col">Ngày đặt hàng</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Hướng dẫn đặt hàng</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ formatOrderDate(order.orderDate) }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.phone }}</td>
          <td>{{ order.deliveryInstructions }}</td>
          <td class="text-right">{{ formatCurrency(order.totalMoney) }}</td>
          <td>
            <button @click="deleteOrder(order._id)" class="btn btn-danger">Xóa</button>
          </td>
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
        const response = await axios.get('http://localhost:3000/api/orders/getAllOrders');
        if (response.data && Array.isArray(response.data)) {
          this.orders = response.data;
        } else {
          console.error('Lỗi khi lấy danh sách đơn hàng:', response.data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error.message || 'Unknown error');
      }
    },
    async deleteOrder(orderId) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/orders/deleteOrder/${orderId}`);
        if (response.data && response.data.success) {
          // Xóa thành công, làm mới trang
          this.fetchOrders();
        } else {
          console.error('Lỗi khi xóa đơn hàng:', response.data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error.message || 'Unknown error');
      }
    },
    formatOrderDate(orderDate) {
      return new Date(orderDate).toLocaleString();
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },
  },
};
</script>

<style scoped>
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
