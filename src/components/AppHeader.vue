<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-header">
      

      <!-- Icon menu -->
      <router-link to="#" class="navbar-brand menu-icon" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </router-link>

      <!-- Menu items -->
      <div class="menu-items" :class="{ 'show-menu': isMenuOpen }">
        
        <router-link to="/contact" class="navbar-brand">Liên hệ</router-link>
        <router-link to="/introduce" class="navbar-brand">Giới thiệu</router-link>
        <router-link to="/order" class="navbar-brand">Đơn hàng</router-link>
        <router-link to="/useredit" class="navbar-brand"><i class="fas fa-cogs"></i></router-link>
      </div>
    </div>
    <!-- Logo -->
    <div class="logo">
      <router-link to="/">
        <img src="../views/image/logo.png" alt="Logo" /> 
      </router-link>
      <p>V-Food ~ Vị ngon đến nao lòng</p>
    </div>

    

    <div class="navbar-nav ml-auto"> <!-- Thêm class ml-auto để đặt nội dung bên phải -->
      
    
      <router-link v-if="isAdmin" to="/adminuser" class="cart-link">
        Users
      </router-link>
      
      <router-link v-if="isAdmin" to="/adminorder" class="cart-link">
        Orders
      </router-link>

      <router-link v-if="isAdmin" to="/admincontact" class="cart-link">
        Liên hệ họp tác
      </router-link>

      <router-link v-if="isAdmin" to="/discount" class="cart-link">
        Giảm giá
      </router-link>

      <router-link v-if="isAdmin" to="/adminedit" class="cart-link">
        Danh sách sản phẩm
      </router-link>

      
      <!-- <router-link  v-if="isAdmin" to="/listproduct" class="cart-link">Xác nhận nhập kho</router-link> -->
      <router-link  v-if="isAdmin" to="/warehouselist" class="cart-link">Xác nhận nhập kho</router-link>
      <router-link  v-if="isAdmin" to="/warehouse" class="cart-link">Kho hàng</router-link>
      <router-link  v-if="isAdmin" to="/admintransport" class="cart-link">Xác nhận đơn hàng</router-link>

      <router-link v-if="isShipper" to="/ship" class="cart-link">
        <i class="fas fa-people-carry"></i>

      </router-link>
      <router-link v-if="isShipper" to="/transport" class="cart-link">
        <i class="fas fa-shipping-fast"></i>
      </router-link>
      

      <router-link to="/order" class="nav-link" >
        <i class="fas fa-box"></i>
      </router-link>
      
      
      <!-- Cart menu item -->
      <router-link to="/cart" class="nav-link">
        <i class="fas fa-shopping-cart"></i>
      </router-link>

      <!-- Login/Logout menu items -->
      <router-link v-if="!isLoggedIn" to="/login" class="nav-link">
        <i class="fas fa-user"></i>
      </router-link>
      
      <router-link v-else to="/" class="nav-link" @click="logout">
        <i class="fas fa-user"></i>
      </router-link>

      
    </div>
  </nav>
</template>

<script>
import router from '../router';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
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

        isShipper() {
            const user = JSON.parse(localStorage.getItem("user"));
            return user && user.isShipper;
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
        toggleMenu() {
          this.isMenuOpen = !this.isMenuOpen;
        },
    },
    components: { router },

    mounted() {
      
    },
};
</script>

<style scoped>
.cart-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: yellow;
  padding: 10px;
  background-color: cadetblue;
  margin-left: 5px;
  border-radius: 5px;
}

.cart-link i {
  margin-left: 5px;
  
}

.nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color:aqua;
  padding: 10px;
  background-color: cadetblue;
  margin-left: 5px;
  border-radius: 5px;
}

.menu-icon {
  cursor: pointer;
}

.menu-items {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #343a40;
  /* width: 100%; Đảm bảo menu items chiếm toàn bộ chiều rộng */
}

.menu-items.show-menu {
  display: flex;
}

.menu-items a {
  color: white;
  text-decoration: none;
  padding: 15px;
}

.menu-items a:hover {
  background-color: #495057;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.logo img {
  width: 50px; /* Điều chỉnh kích thước của logo */
  margin-right: 10px;
}

.logo p {
  color: white;
  margin: 0;
}
</style>
