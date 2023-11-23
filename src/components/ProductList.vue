<template>
  <div class="grid-container">
    <div
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <div class="item-content">
        <img :src="contact.imgUrl" alt="Contact Image" />
      </div>
      <div class="button-container">
        <button @click="addToCart(contact)" class="themvaogiohang">Thêm vào giỏ</button>
        <router-link
          :to="{ name: 'contact.detail', params: { id: contact._id } }"
        >
          <button class="xemchitiet">Xem chi tiết</button>
        </router-link>
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
    };
  },
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    addToCart(contact) {
      try {
        const userId = localStorage.getItem('userId');
        const productId = contact._id;
        const quantity = 1;

        cartService.addToCart(userId, productId, quantity);

        const updateCart = cartService.getCart(userId);
        localStorage.setItem("cart", JSON.stringify(updateCart));

        // Update the notification message
        this.notificationMessage = `Sản phẩm ${contact.name} đã được thêm vào giỏ hàng.`;

        // Clear the notification after a few seconds (e.g., 5 seconds)
        setTimeout(() => {
          this.notificationMessage = '';
        }, 5000);

      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
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
button.themvaogiohang {
  background-color: #e74c3c; /* Màu đỏ */
  color: #fff;
  width: 135px;
}

/* Thêm style cho nút Thanh toán */
button.xemchitiet {
  background-color: #3498db; /* Màu xanh đậm */
  color: #fff;
  width: 135px;
}



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
  border: none; /* Remove the border around the image */
}
</style>
