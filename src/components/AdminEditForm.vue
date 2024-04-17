<template>
    <div class="admin-edit-form">
      <h2 style="text-align: center; color: blueviolet;">Cập nhật sản phẩm</h2>
      <form @submit.prevent="updateProduct">
        <!-- <div class="form-group">
          <label for="code">Mã sản phẩm:</label>
          <input type="text" id="code" v-model="editedProduct.code" required />
        </div> -->
        <div class="form-group">
          <label for="name">Tên sản phẩm:</label>
          <input type="text" id="name" v-model="editedProduct.name" required>
        </div>
        <div class="form-group">
          <label for="price">Giá bán sản phẩm:</label>
          <input type="number" id="price" v-model="editedProduct.price" required>
        </div>
        <div class="form-group">
          <label for="importprice">Giá nhập sản phẩm:</label>
          <input type="number" id="importprice" v-model="editedProduct.importprice" required>
        </div>
        <!-- <div class="form-group">
          <label for="mass">Khối lượng:</label>
          <input type="text" id="mass" v-model="editedProduct.mass">
        </div> -->
        <div class="form-group">
          <label for="imgUrl">Hình ảnh:</label>
          <input type="text" id="imgUrl" v-model="editedProduct.imgUrl">
        </div>
        <div class="form-group">
          <label for="description">Mô tả:</label>
          <textarea id="description" v-model="editedProduct.description"></textarea>
        </div>
        <!-- <div class="form-group">
          <label for="expiry">Hạn sử dụng:</label>
          <input type="date" id="expiry" v-model="editedProduct.expiry" required />
        </div> -->

        <button type="submit">Cập nhật</button>
      </form>
    </div>
  </template>
  
  <script>
  import ProductService from "@/services/product.service";
  
  export default {
    data() {
      return {
        editedProduct: {
          // code: "",
          name: "",
          price: 0,
          importprice: 0,
          // sellprice: 0,
          // mass: "",
          imgUrl: "",
          description: "",
          // expiry: "",
        },
      };
    },
    methods: {
        async updateProduct() {
            try {
                await ProductService.update(this.$route.params.id, this.editedProduct);
                this.showSuccessMessage(); // Hiển thị thông báo khi cập nhật thành công
                setTimeout(() => {
                    this.$router.push({ name: "adminedit" }); 
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchProduct() {
            try {
                const product = await ProductService.get(this.$route.params.id);
                    this.editedProduct = { ...product };
                } catch (error) {
                    console.error(error);
            }
        },
        showSuccessMessage() {
            alert("Sản phẩm cập nhật thành công!"); // Hiển thị thông báo cập nhật thành công
        },
    },
    created() {
      this.fetchProduct();
    },
  };
  </script>
  
  <style scoped>
  .admin-edit-form {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #1ab13d;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  