<template>
  <div class="grid-container">
    <div
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
      style="background-color: aliceblue;"
    >
      <div class="item-content" @click="viewProductDetail(contact._id)">
        <img :src="contact.imgUrl" alt="Contact Image" />
      </div>
      
      <div class="button-container">
        <button @click="addToCart(contact)" class="btn btn-danger">Thêm vào giỏ</button>
      </div>
      
    </div>
    
    <div class="notification" v-show="notificationMessage">{{ notificationMessage }}</div>
  </div>
</template>

<script>
import cartService from '../services/cart.service';

export default {
  data() {
    return {
      notificationMessage: '',
      localStorageCleared: false,

    };
  },
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('userId');
    },
  },
  methods: {
    clearLocalStorage() {
    localStorage.removeItem('userId');
    localStorage.removeItem('cart');
    // Thêm bất kỳ lưu trữ cục bộ khác bạn muốn xóa
    },
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    addToCart(contact) {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
          this.$router.push({ name: 'login' });
          return;
        }

        const productId = contact._id;
        const quantity = 1;

        cartService.addToCart(userId, productId, quantity);

        const updateCart = cartService.getCart(userId);
        localStorage.setItem('cart', JSON.stringify(updateCart));

        // Update the notification message
        this.notificationMessage = `Sản phẩm ${contact.name} đã được thêm vào giỏ hàng.`;

        // Clear the notification after a few seconds (e.g., 5 seconds)
        setTimeout(() => {
          this.notificationMessage = '';
        }, 5000);
      } catch (error) {
        console.error(error);
      }
    },
    viewProductDetail(contactId) {
      this.$router.push({ name: 'contact.detail', params: { id: contactId } });
    },
  },
  mounted (){
    const sessionStarted = sessionStorage.getItem('sessionStarted');

  if (!sessionStarted) {
    this.clearLocalStorage();
    sessionStorage.setItem('sessionStarted', 'true');
  }
  },
};
</script>




<style scoped>
.item-content {
  position: relative;
  cursor: pointer; /* Đổi con trỏ chuột khi di chuột vào ảnh */
}
.page {
  text-align: left;
  max-width: 750px;
}
.small-search-bar {
  width: 500px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.list-group-item {
  position: relative;
}

.item-content {
  position: relative;
}

.button-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

button {
  flex: 1;
  padding: 8px;
  cursor: pointer;
  margin-right: px;
}

/* Thêm style cho nút Đặt hàng */
/* button.themvaogiohang {
  background-color: #e74c3c; 
  color: #fff;
  width: 135px;
} */





.notification {
  background-color: #2ecc71; /* Màu xanh lá cây */
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  display: none;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
  border: none;
}
</style> 
