<template>
    <div class="review-form">
      <h2 class="text-center">Đánh Giá Sản Phẩm</h2>
      <div v-if="productName">
        <!-- <div>
          <strong>Tên Sản Phẩm:</strong> {{ productName }}
        </div> -->
        <div class="rating-scale">
          <input type="radio" id="star5" v-model="ratingScale" value="5">
          <label for="star5" title="5 stars">&#9733;</label>
          <input type="radio" id="star4" v-model="ratingScale" value="4">
          <label for="star4" title="4 stars">&#9733;</label>
          <input type="radio" id="star3" v-model="ratingScale" value="3">
          <label for="star3" title="3 stars">&#9733;</label>
          <input type="radio" id="star2" v-model="ratingScale" value="2">
          <label for="star2" title="2 stars">&#9733;</label>
          <input type="radio" id="star1" v-model="ratingScale" value="1">
          <label for="star1" title="1 star">&#9733;</label>
        </div>
        <div>
          <strong>Bình Luận:</strong>
          <textarea v-model="comment" rows="4" cols="50"></textarea>
        </div>
        <div class="text-left">
          <button class="payment-btn" @click="submitReviewData">Gửi Đánh Giá</button>
        </div>
      </div>
      <div v-else class="text-center">
        <p>Không có sản phẩm nào để đánh giá.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        userId: null,
        ratingScale: null,
        comment: ""
      };
    },
    methods: {
      submitReviewData() {
        const reviewData = {
          userId: this.userId,
          productId: this.productId,
          productName: this.productName,
          ratingScale: this.ratingScale,
          comment: this.comment
        };
        this.$emit("submitReview", reviewData);
      }
    },
    mounted() {
      // Lấy thông tin sản phẩm cần đánh giá từ localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        this.userId = userData.userId;
      }
    }
  };
  </script>
  
  <style scoped>
  .review-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .text-center {
    text-align: center;
  }
  
  .rating-scale {
    unicode-bidi: bidi-override;
    direction: rtl;
  }
  
  .rating-scale > input {
    display: none;
  }
  
  .rating-scale > label {
    font-size: 2em;
    padding: 0 0.1em;
    display: inline-block;
    color: #ddd; /* Default star color */
    transition: color 0.3s ease; /* Smooth color transition */
  }
  
  .rating-scale > label:hover,
  .rating-scale > label:hover ~ label,
  .rating-scale > input:checked ~ label {
    color: gold; /* Color of selected stars */
  }
  
  .comment-container {
    margin-top: 10px; /* Khoảng cách giữa phần đánh giá và ô bình luận */
  }
  
  .comment-container textarea {
    width: 100%; /* Độ rộng của ô bình luận */
    resize: vertical; /* Cho phép thay đổi chiều cao dọc */
  }
  
  .payment-btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .payment-btn:hover {
    background-color: #45a049;
  }
  
  </style>
  