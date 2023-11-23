<!-- Payment.vue -->

<template>
    <div>
      <h2>Thanh toán</h2>
      <div v-if="selectedProducts.length > 0">
        <ul>
          <li v-for="contact in selectedProducts" :key="contact.id">
            {{ contact.name }} - {{ contact.price }}
          </li>
        </ul>
        <p>Tổng cộng: {{ calculateTotal() }}</p>
        <button @click="processPayment">Thanh toán</button>
      </div>
      <div v-else>
        <p>Không có sản phẩm nào được chọn để thanh toán.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedProducts: [], // Danh sách sản phẩm được chọn để thanh toán
      };
    },
    methods: {
      calculateTotal() {
        // Logic tính tổng số tiền cần thanh toán
        return this.selectedProducts.reduce((total, contact) => total + contact.price, 0);
      },
      processPayment() {
        // Logic xử lý thanh toán (có thể chuyển hướng đến trang thanh toán thực tế)
        console.log("Đã thanh toán:", this.selectedProducts);
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS styles cho component Payment */
  </style>
  