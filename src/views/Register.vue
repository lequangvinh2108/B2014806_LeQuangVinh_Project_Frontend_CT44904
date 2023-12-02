<template>
  <div class="container d-flex justify-content-center">
    <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
      <div class="w-75">
        <h2 class="p-3 text-center">ĐĂNG KÝ</h2>
        <form @submit.prevent="register">
          <!-- Các trường đăng ký -->
          <label for="name-register">Họ và tên:</label>
          <input id="name-register" class="form-control" v-model="name" type="text" required />
          <br />
          <label for="email-register">Email:</label>
          <input id="email-register" class="form-control" v-model="email" type="email" required />
          <br />
          <label for="password-register">Mật khẩu:</label>
          <input id="password-register" class="form-control" v-model="password" type="password" required />
          <br />
          <!-- Thêm một lần nữa trường password để xác nhận -->
          <label for="confirm-password-register">Xác nhận Mật khẩu:</label>
          <input id="confirm-password-register" class="form-control" v-model="confirmPassword" type="password" required />
          <br />
          <!-- Hiển thị thông báo lỗi kiểm tra -->
          <div v-if="password !== confirmPassword" class="text-danger">
            Mật khẩu và xác nhận mật khẩu không khớp.
          </div>
          <br />
          <button class="btn btn-secondary" type="submit" :disabled="isRegistering">Đăng ký</button>
          <!-- Hiển thị biểu tượng loading trong quá trình đăng ký -->
          <div v-if="isRegistering" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRegistering: false, // Thêm để theo dõi trạng thái đăng ký
    };
  },
  methods: {
    async register() {
      try {
        // Đặt lại thông báo lỗi và đặt trạng thái đăng ký thành true
        this.isRegistering = true;

        // Kiểm tra xác nhận mật khẩu
        if (this.password !== this.confirmPassword) {
          console.error("Mật khẩu và xác nhận mật khẩu không khớp.");
          // Đặt lại trạng thái đăng ký
          this.isRegistering = false;
          return;
        }

        // Gửi yêu cầu đăng ký
        const user = { name: this.name, email: this.email, password: this.password };
        const response = await UserService.register(user);

        // Xử lý đăng ký thành công
        
        this.$router.push({ name: 'login' });
        
        // Đặt lại trạng thái đăng ký
        this.isRegistering = false;
      } catch (error) {
        console.error(error);
        // Đặt lại trạng thái đăng ký
        this.isRegistering = false;
      }
    },
  },
};
</script>
