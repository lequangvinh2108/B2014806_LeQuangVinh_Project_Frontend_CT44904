<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link v-if="!isLoginPage && !isRegisterPage" to="/contactbook" class="navbar-brand">Trang chủ</router-link>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <!-- Các liên kết khác nếu cần -->
      </li>
    </div>

    <!-- Hiển thị nút đăng nhập hoặc chữ đăng xuất tùy thuộc vào trạng thái đăng nhập -->

    <!-- Nút Admin (ví dụ) -->
    <router-link v-if="$root.isAdmin" to="/adminedit" class="nav-link">
      Admin
    </router-link>

    <!-- Nút Người dùng/Login -->
    <router-link  to="/" class="nav-link">
      <i class="fas fa-user"></i>
    </router-link>

    <!-- Nút Giỏ hàng -->
    <router-link v-if="!isLoginPage && !isRegisterPage" to="/cart" class="nav-link cart-link">
      <i class="fas fa-shopping-cart"></i>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: false,
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'login';
    },
    isRegisterPage() {
      return this.$route.name === 'register';
    },
    
  },
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
