<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Trang chủ</router-link>
    <router-link to="/contact" class="navbar-brand">Liên hệ</router-link>
    <router-link to="/introduce" class="navbar-brand">Giới thiệu</router-link>
    <router-link to="/order" class="navbar-brand">Đơn hàng</router-link>
    <router-link to="/useredit" class="navbar-brand"><i class="fas fa-cogs"></i></router-link>
    <div class="mr-auto navbar-nav">
      <!-- Các mục menu khác nếu cần -->
    </div>

    <router-link v-if="isAdmin" to="/adminedit" class="nav-link">
      Edits
    </router-link>
  
    <router-link v-if="isAdmin" to="/adminuser" class="nav-link">
      Users
    </router-link>
    
    <router-link v-if="isAdmin" to="/adminorder" class="nav-link">
      Orders
    </router-link>

    <router-link v-if="!isLoggedIn" to="/login" class="nav-link">
      <i class="fas fa-user"></i>
    </router-link>
    
    <router-link v-else to="/" class="nav-link" @click="logout">
      <i class="fas fa-user"></i>
    </router-link>

    <router-link to="/cart" class="nav-link cart-link">
      <i class="fas fa-shopping-cart"></i>
    </router-link>
  </nav>
</template>

<script>
import router from '../router';

export default {
    computed: {
        // Sử dụng computed property để kiểm tra xem người dùng đã đăng nhập hay chưa
        isLoggedIn() {
            return localStorage.getItem("token") !== null;
        },
        // Sử dụng computed property để kiểm tra xem người dùng là admin hay không
        isAdmin() {
            const user = JSON.parse(localStorage.getItem("user"));
            return user && user.isAdmin;
        },
    },
    methods: {
        // Phương thức xử lý đăng xuất
        logout() {
            // Xóa token và thông tin người dùng từ localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("user");
            // Chuyển hướng về trang login sau khi đăng xuất
            this.$router.push("/login");
        },
    },
    components: { router }
};
</script>

<style scoped>
.cart-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 15px;
}

.cart-link i {
  margin-left: 5px;
}

.nav-link i {
  margin-left: 5px;
}
</style>
