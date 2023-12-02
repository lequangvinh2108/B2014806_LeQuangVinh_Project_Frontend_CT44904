<template>
    <div class="container d-flex align-items-center justify-content-center">
      <div>
        <h2 class="mt-4 mb-4">Chỉnh sửa thông tin cá nhân</h2>
        <form @submit.prevent="updateUserProfile">
          <div class="mb-3">
            <label for="name">Username:</label>
            <!-- Sử dụng v-model để liên kết giá trị của ô input với thuộc tính user.name -->
            <input id="name" class="form-control" v-model="user.name" type="text" required />
          </div>
          <div class="mb-3">
            <label for="email">Email:</label>
            <!-- Sử dụng v-model để liên kết giá trị của ô input với thuộc tính user.email -->
            <input id="email" class="form-control" v-model="user.email" type="email" required />
          </div>
          <button class="btn btn-primary" type="submit">Lưu thông tin</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  
  export default {
    data() {
      return {
        user: {
          _id: "",
          name: "",
          email: "",
          isAdmin: false,
        },
      };
    },
    
    async created() {
        console.log("Initial user:", this.user);
      try {
        const userId = localStorage.getItem("userId");
        const userProfile = await UserService.getUserProfile(userId);
        console.log("UserProfile:", userProfile);
        this.user = userProfile;
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      async updateUserProfile() {
        try {
          const userId = localStorage.getItem("userId");
          const updatedUserData = {
            name: this.user.name,
            email: this.user.email,
          };
          await UserService.updateUser(userId, updatedUserData);
          // Refresh lại dữ liệu user sau khi cập nhật
        const userProfile = await UserService.getUserProfile(userId);
        this.user = userProfile;
          alert("Thông tin cá nhân đã được cập nhật!");
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  