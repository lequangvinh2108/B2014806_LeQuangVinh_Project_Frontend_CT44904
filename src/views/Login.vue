<template>
  <div class="container d-flex justify-content-center">
    <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
      <div class="w-75">
        <h2 class="p-3 text-center">Đăng nhập</h2>
        <form @submit.prevent="login">
          <label for="email-login">Email:</label>
          <input id="email-login" class="form-control" v-model="email" type="email" required />
          <br />
          <label for="password-login">Password:</label>
          <input id="password-login" class="form-control" v-model="password" type="password" required />
          <span class="text-danger mt-1 mb-2" v-if="loginError">Thông tin đăng nhập sai</span>
          <br />
          <div class="d-flex align-items-end">
            <button class="btn btn-secondary mt-2" type="submit">Login</button>&nbsp;&nbsp;&nbsp;
            <p>Nếu chưa có tài khoản, <router-link to="/register">Đăng ký!</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import UserService from "../services/user.service";

export default {
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
    };
  },
  methods: {
    async login() {
      try {
        this.loginError = false;
        const credentials = { email: this.email, password: this.password };
        const response = await UserService.login(credentials);

        const token = response.token;
        const user = response.user;
        localStorage.setItem("userId", user._id);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.user));

        console.log(response);

        if (user.isAdmin) {
          this.$router.push("/adminedit");
        } else {
          this.$router.push("/");
          this.$root.$emit("userLoggedIn"); // Gửi sự kiện khi đăng nhập thành công
        }
      } catch (error) {
        this.loginError = true;
        console.error(error, "Sai");
      }
    },
  },
  components: { RouterLink },
};
</script>
