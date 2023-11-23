<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Đăng ký</h2>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">Tên tài khoản:</label>
            <input type="text" id="username" v-model="username" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Số điện thoại:</label>
            <input type="tel" id="phone" v-model="phone" class="form-control" required pattern="[0-9]{10}" />
            <small class="text-muted">Vui lòng nhập 10 chữ số.</small>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">Địa chỉ:</label>
            <input type="text" id="address" v-model="address" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu:</label>
            <input type="password" id="password" v-model="password" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác nhận mật khẩu:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>

        <div v-if="registrationSuccess" class="mt-3 alert alert-success">
          Đăng ký thành công!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      registrationSuccess: false,
    };
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.confirmPassword) {
          console.error("Mật khẩu và xác nhận mật khẩu không khớp.");
          return;
        }

        // Gửi thông tin đăng ký lên server
        const response = await axios.post('http://localhost:3002/api/users/register', {
          username: this.username,
          email: this.email,
          phone: this.phone,
          address: this.address,
          password: this.password,
        });

        // Kiểm tra và xử lý phản hồi từ server
        if (response.data && response.data.user) {
          this.registrationSuccess = true;
        } else {
          console.error("Đăng ký thất bại:", response.data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Đăng ký thất bại:", error.message || "Unknown error");
      }
    },
  },
};
</script>
