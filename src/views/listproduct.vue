<template>
  <h1 style="text-align: center; color: blue;">Danh sách sản phẩm</h1>
    <div class="list-product">
      <div v-for="product in productList" :key="product._id" class="product-card" style="background-color: beige;">
        <div class="product-info">
          <h4>{{ product.name }}</h4>
          <p><b>Mã:</b> {{ product.code }}</p>
          <p><b>Giá:</b> {{ product.price }}</p>
          <p><b>Số lượng:</b> {{ product.quantity }}</p>
          <p><b>Khối lượng:</b> {{ product.mass }}</p>
          <p><b>Hạn sử dụng:</b> {{ product.expiry }}</p>
          <p><b>Ngày nhập:</b> {{ product.importday }}</p>
          <p><b>Nơi sản xuất:</b> {{ product.placeproduction }}</p>
        </div>
        <button v-if="!product.confirmed" @click="confirmProduct(product)" class="confirm-button btn btn-warning">Xác nhận</button>
        <button v-else class="confirm-button btn btn-success" disabled>Đã xác nhận</button>
      </div>
    </div>
  </template>
  
  <script>
import ListProductService from "@/services/listproduct.service";
import ProductService from "@/services/product.service";

export default {
  data() {
    return {
      productList: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        // Lấy danh sách sản phẩm
        this.productList = await ListProductService.getAll();

        // Tải trạng thái đã xác nhận từ Local Storage
        const confirmedProductIds = JSON.parse(localStorage.getItem('confirmedProducts') || '[]');

        // Cập nhật trạng thái đã xác nhận của mỗi sản phẩm
        this.productList.forEach(product => {
          if (confirmedProductIds.includes(product._id)) {
            product.confirmed = true;
          } else {
            product.confirmed = false; // Đảm bảo rằng trạng thái đã xác nhận được xác định cho mỗi sản phẩm
          }
        });
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    async confirmProduct(product) {
      try {
        const confirmedProduct = await ListProductService.getProduct(product._id);
        console.log('Confirmed product:', confirmedProduct);

        const existingProduct = (await ProductService.getAll()).find(p => p.code === confirmedProduct.code);

        if (existingProduct) {
          const newQuantity = existingProduct.quantity + confirmedProduct.quantity;
          await ProductService.updateCode(existingProduct.code, { ...existingProduct, quantity: newQuantity });
          console.log('Product quantity updated successfully!');
        } else {
          await ProductService.create(confirmedProduct);
          console.log('Product added successfully!');
        }

        product.confirmed = true;
        this.saveConfirmedProduct(product._id);
      } catch (error) {
        console.error('Error confirming product:', error);
      }
    },
    saveConfirmedProduct(productId) {
      try {
        const confirmedProductIds = JSON.parse(localStorage.getItem('confirmedProducts') || '[]');
        if (!confirmedProductIds.includes(productId)) {
          confirmedProductIds.push(productId);
          localStorage.setItem('confirmedProducts', JSON.stringify(confirmedProductIds));
        }
      } catch (error) {
        console.error('Error saving confirmed product:', error);
      }
    }
  },
};
</script>

  <style scoped>
  .list-product {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .product-card {
    position: relative;
    width: 30%;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .product-info {
    margin-bottom: 10px;
  }
  
  .confirm-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  </style>
  