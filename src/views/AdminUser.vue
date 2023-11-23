<!-- src/views/AdminUser.vue -->

<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center mb-4">Danh sách người dùng</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên tài khoản</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Thao tác</th> <!-- Thêm cột cho nút xóa -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user._id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.address }}</td>
                <td>
                  <button @click="deleteUser(user._id)" class="btn btn-danger">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3002/api/users');
        if (response.data && response.data.users) {
          this.users = response.data.users;
        } else {
          console.error("Không thể lấy danh sách người dùng:", response.data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Không thể lấy danh sách người dùng:", error.message || "Unknown error");
      }
    },
    async deleteUser(userId) {
      try {
        const response = await axios.delete(`http://localhost:3002/api/users/${userId}`);
        if (response.data && response.data.deletedUser) {
          // Xóa người dùng thành công, làm mới trang
          this.$router.go();
        } else {
          console.error("Không thể xóa người dùng:", response.data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Không thể xóa người dùng:", error.message || "Unknown error");
      }
    },
  },
};
</script>
  