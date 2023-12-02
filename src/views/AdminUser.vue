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
                <th>ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th> <!-- Thêm cột cho nút xóa -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user._id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ user._id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.password }}</td>
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
        const response = await axios.get('http://localhost:3002/api/auth');
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
        const response = await axios.delete(`http://localhost:3002/api/auth/${userId}`);
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
<style>

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
  