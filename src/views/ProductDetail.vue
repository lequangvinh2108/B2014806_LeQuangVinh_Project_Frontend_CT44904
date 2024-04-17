<template>
  <div>
    <div class="row">
      <!-- Cột trái (ảnh) và Cột phải (thông tin) trong cùng một khung -->
      <div class="col-md-12 d-flex">
        <!-- Khung chứa cả hai cột -->
        <div class="border p-3 bg-light d-flex" style="width: 100%;">
          <!-- Cột trái (ảnh) -->
          <div class="col-md-4">
            <img :src="product.imgUrl" alt="Product Image" style="width: 300px;" />
          </div>
          <!-- Cột phải (thông tin) -->
          <div class="col-md-8">
            <h1>{{ product.name }}</h1>
            <!-- Hiển thị giá và giá giảm (nếu có) -->
            <p v-if="product.discountedPrice !== undefined">
              <b>Giá:</b>
              <span style="text-decoration: line-through; margin-right: 10px; margin-left: 10px; color:blue;">{{ formatCurrency(product.price) }}</span>
              <span>{{ formatCurrency(product.discountedPrice) }}</span>
            </p>
            <p v-else>
              <b>Giá:</b> {{ formatCurrency(product.price) }}
            </p>
            <p><b>Khối lượng:</b> {{ product.mass }}</p>
            <p><b>Thông tin sản phẩm:</b> {{ product.description }}</p>
            <p><b>Đã bán: </b>{{ 1000 - product.quantity }}</p>
            <!-- Thêm nút đặt hàng -->
            <button class="btn btn-primary" @click="orderProduct" :disabled="!isLoggedIn">Đặt hàng</button>
            <div class="notification" v-show="notificationMessage">{{ notificationMessage }}</div>
          </div>
        </div>
      </div>
    </div>
      
    <!-- Đường gạch thẳng đứng giữa hai cột -->
    <hr class="my-4">
    <!-- Hiển thị số sao đã được đánh giá -->
    <div v-if="reviews.length > 0">
      <div v-if="averageRating > 0">
        <h4 style="font-style: italic; text-align: center;">Đánh giá sản phẩm {{ averageRating.toFixed(1) }}/5.0<i class="fas fa-star" style="color: gold;"></i></h4>
      </div>
      <div v-else>
        <p>Chưa có đánh giá nào cho sản phẩm này.</p>
      </div>
      <div v-for="(review, index) in reviews" :key="index">
        <p> <b>{{ review.userName }}</b> </p>
        <p> 
          <span class="star-rating">
            <!-- Dùng vòng lặp để tạo ra số ngôi sao tương ứng với điểm đánh giá -->
            <i v-for="star in parseInt(review.ratingScale)" :key="star" class="fas fa-star"></i>
          </span>
        </p>
        <p> {{ review.comment }}</p>
        <hr>
      </div>
    </div>
    <div v-else>
      <p>Chưa có đánh giá nào cho sản phẩm này.</p>
    </div>
  </div>
  <Footer />
</template>


<script>
import cartService from '../services/cart.service';
import Footer from "@/components/Footer.vue";
import ReviewService from "../services/review.service";
import UserService from "../services/user.service";
import DiscountService from "../services/discount.service"; // Import DiscountService

export default {
  components: {
    Footer,
  },
  data() {
    return {
      product: {},
      notificationMessage: '',
      reviews: [],
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('userId');
    },
    averageRating() {
      if (this.reviews.length === 0) return 0;
      const totalStars = this.reviews.reduce((acc, review) => acc + parseInt(review.ratingScale), 0);
      return totalStars / this.reviews.length;
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    async loadReviews(productId) {
      try {
        this.reviews = await ReviewService.getReviewsByProductId(productId);
        for (let i = 0; i < this.reviews.length; i++) {
          const userId = this.reviews[i].userId;
          const userData = await this.getUserData(userId);
          this.reviews[i].userName = userData.name;
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    },
    async getUserData(userId) {
      try {
        const response = await UserService.getUserProfile(userId);
        return response.user;
      } catch (error) {
        console.error("Error getting user data:", error);
        return { name: "Unknown" };
      }
    },
    async loadProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        this.product = data;
        this.applyDiscount(this.product.code); // Sử dụng code của sản phẩm để áp dụng giảm giá
      } catch (error) {
        console.error("Error loading product:", error);
      }
    },
    async applyDiscount(productCode) {
  try {
    const productDiscount = await DiscountService.getDiscountByCode(productCode); // Lấy thông tin giảm giá từ code sản phẩm
    console.log("discount: ", productDiscount);
    if (productDiscount && productDiscount.discount) {
      const discountPercent = productDiscount.discount;
      const discountedPrice = this.product.price - (this.product.price * discountPercent / 100);
      this.product.discountedPrice = discountedPrice;
      console.log("discountedPrice: ", discountedPrice);
      this.product.discountPercent = discountPercent; // Lưu phần trăm giảm giá để hiển thị
      console.log("discountPercent: ", discountPercent);
      this.notificationMessage = `Sản phẩm ${this.product.name} được giảm giá ${discountPercent}%`;
      setTimeout(() => {
        this.notificationMessage = '';
      }, 5000);
    }
  } catch (error) {
    console.error("Error applying discount:", error);
  }
},
    
orderProduct() {
  try {
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'login' });
      return;
    }
    const userId = localStorage.getItem('userId');
    const productId = this.product._id;
    const quantity = 1;

    // Kiểm tra xem sản phẩm có giảm giá hay không
    if (this.product.discountPercent) {
      const discountedPrice = this.product.price - (this.product.price * this.product.discountPercent / 100);
      cartService.addToCart(userId, productId, quantity, discountedPrice); // Sử dụng giá đã giảm
    } else {
      // Nếu không có giảm giá, sử dụng giá gốc của sản phẩm
      cartService.addToCart(userId, productId, quantity, this.product.price);
    }

    const updateCart = cartService.getCart(userId);
    localStorage.setItem("cart", JSON.stringify(updateCart));

    this.notificationMessage = `Sản phẩm ${this.product.name} đã được đặt hàng.`;
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
    const productId = this.$route.params.id;
    this.loadReviews(productId);
  },
};
</script>

<style scoped>
.notification {
  background-color: #2ecc71;
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  display: none;
  text-align: center;
}
.star-rating {
  color: gold;
}
</style>
