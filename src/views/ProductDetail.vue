<template>
  <div>
    <div class="row">
      <!-- Cột trái (ảnh) và Cột phải (thông tin) trong cùng một khung -->
      <div class="col-md-12 d-flex">
        <!-- Khung chứa cả hai cột -->
        <div class="border p-3 bg-light d-flex" style="width: 100%;">
          <!-- Cột trái (ảnh) -->
          <div class="col-md-6">
            <img :src="product.imgUrl" alt="Product Image" style="width: 500px;" />
          </div>
          <!-- Cột phải (thông tin) -->
          <div class="col-md-6">
            <h1>{{ product.name }}</h1>
            <p><b>Price:</b> {{ product.price }}đ</p>
            <p><b>Writer:</b> {{ product.writer }}</p>
            <p><b>Description:</b> {{ product.description }}</p>
            <!-- Thêm nút đặt hàng -->
            <button class="btn btn-primary" @click="orderProduct">Đặt hàng</button>
            <div class="notification" v-show="notificationMessage">{{ notificationMessage }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Đường gạch thẳng đứng giữa hai cột -->
    <hr class="my-4">
  </div>
</template>

<script>
import cartService from '../services/cart.service';
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      product: {},
      notificationMessage: '',
    };
  },
  methods: {
    async loadProduct() {
      const productId = this.$route.params.id;
      try {
        // Gọi API để lấy chi tiết sản phẩm từ server
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        this.product = data;
      } catch (error) {
        console.error("Error loading product:", error);
      }
    },
    orderProduct() {
      try {
        const userId = localStorage.getItem('userId');
        const productId = this.product._id;
        const quantity = 1;

        // Call the addToCart method from cartService
        cartService.addToCart(userId, productId, quantity);

        // Get the updated cart and save it to localStorage
        const updateCart = cartService.getCart(userId);
        localStorage.setItem("cart", JSON.stringify(updateCart));

        // Update the notification message
        this.notificationMessage = `Sản phẩm ${this.product.name} đã được đặt hàng.`;

        // Clear the notification after a few seconds (e.g., 5 seconds)
        setTimeout(() => {
          this.notificationMessage = '';
        }, 5000);

      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.loadProduct();
  },
};
</script>

<style scoped>
/* Các style riêng cho component này (nếu cần) */
.notification {
  background-color: #2ecc71; /* Màu xanh lá cây */
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  display: none;
  text-align: center;
}
</style>
