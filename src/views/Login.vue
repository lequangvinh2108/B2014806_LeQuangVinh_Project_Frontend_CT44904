<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Đăng nhập</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model="email" class="form-control" required autocomplete="off" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu:</label>
            <input type="password" id="password" v-model="password" class="form-control" required autocomplete="off" />
          </div>

          <button type="submit" class="btn btn-primary">Đăng nhập</button>
          
          <!-- Hiển thị thông báo lỗi -->
          <div v-if="error" class="alert alert-danger mt-3">
            {{ error }}
          </div>

          <!-- Chữ Đăng Ký và chuyển hướng đến trang Register.vue -->
          <p class="mt-3">
            Nếu chưa có tài khoản, <router-link to="/register">Đăng ký</router-link> ngay!
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      console.log("Login method is called!");

      try {
        const response = await axios.post('http://localhost:3002/api/users/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data && response.data.user) {
          console.log("Đăng nhập thành công!");
          
          const user = response.data.user;

          // Lưu thông tin người dùng vào Local Storage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userId', user._id);

          // Xác định xem người dùng có phải là admin không
          this.$root.isAdmin = user.email === 'admin@gmail.com';

        if (this.$root.isAdmin) {
          // Chuyển hướng đến trang Product.vue nếu là admin
          this.$router.push({ name: 'adminedit' });
        } else {
          // Chuyển hướng đến trang ContactBook.vue nếu không phải là admin
          this.$router.push({ name: 'contactbook' });
        }
 // Emit event to update header
 this.$root.$emit('login-success', { message: 'Đăng nhập thành công!' });
      } else {
        this.error = response.data.message || "Unknown error";
      }
      } catch (error) {
        console.error("Đăng nhập thất bại:", error.message || "Unknown error");
        this.error = "Đăng nhập thất bại. Vui lòng thử lại.";
      }
    },
  },
};
</script>
