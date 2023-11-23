<template>
  <div>
    <h2>Xác nhận đặt hàng</h2>
    <!-- Hiển thị thông tin người dùng đã lưu -->
    <div>
      <p><strong>Tên người dùng:</strong> {{ user.username }}</p>
      <p><strong>Địa chỉ:</strong> {{ user.address }}</p>
      <p><strong>Số điện thoại:</strong> {{ user.phone }}</p>
    </div>
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
            <!-- <p v-if="product.favorite">This product is marked as favorite.</p> -->
            <!-- Thêm nút đặt hàng -->
            <button class="btn btn-primary" @click="goToCheckout">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    <!-- Đường gạch thẳng đứng giữa hai cột -->
    <hr class="my-4">
  </div>
    
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Footer,
  },
  
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
      // Không cần lấy giỏ hàng từ props nữa vì đã nhận từ tham số cart
      product: {},
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
    }
  },
  mounted() {
    this.loadProduct();
  },
};
</script>

<style scoped>
/* CSS styles cho component checkout */
</style>
