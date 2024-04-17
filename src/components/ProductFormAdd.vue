<template>
    <div class="product-form">
      <h4 style="text-align: center;">{{ isNewProduct ? 'Thêm sản phẩm mới' : 'Cập nhật thông tin sản phẩm' }}</h4>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="code">Mã sản phẩm:</label>
          <input type="text" id="code" v-model="formData.code" required />
        </div>
        <div class="form-group">
          <label for="name">Tên sản phẩm:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="price">Giá:</label>
          <input type="number" id="price" v-model="formData.price" required />
        </div>
        <div class="form-group">
          <label for="quantity">Số lượng:</label>
          <input type="number" id="quantity" v-model="formData.quantity" required />
        </div>
        <div class="form-group">
          <label for="mass">Khối lượng:</label>
          <input type="text" id="mass" v-model="formData.mass" required />
        </div>
        <div class="form-group">
          <label for="imgUrl">URL hình ảnh:</label>
          <input type="text" id="imgUrl" v-model="formData.imgUrl" required />
        </div>
        <div class="form-group">
          <label for="description">Mô tả:</label>
          <textarea id="description" v-model="formData.description"></textarea>
        </div>
        <div class="form-group">
          <label for="expiry">Hạn sử dụng:</label>
          <input type="date" id="expiry" v-model="formData.expiry" required />
        </div>
        <div class="form-group">
          <label for="importday">Ngày nhập hàng:</label>
          <input type="date" id="importday" v-model="formData.importday" required />
        </div>
        <div class="form-group">
          <label for="placeproduction">Nơi sản xuất:</label>
          <input type="text" id="placeproduction" v-model="formData.placeproduction" required />
        </div>
        <button type="submit" class="btn btn-sm btn-success">Lưu</button>
        <button v-if="!isNewProduct" @click="deleteProduct" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i> Xóa sản phẩm</button>
      </form>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import ListProductService from "@/services/listproduct.service";
  
  export default {
    props: {
      contact: Object,
    },
    data() {
      return {
        formData: {
          code: this.contact ? this.contact.code : '',
          name: this.contact ? this.contact.name : '',
          price: this.contact ? this.contact.price : '',
          quantity: this.contact ? this.contact.quantity : '',
          mass: this.contact ? this.contact.mass : '',
          imgUrl: this.contact ? this.contact.imgUrl : '',
          description: this.contact ? this.contact.description : '',
          expiry: this.contact ? this.contact.expiry : '',
          importday: this.contact ? this.contact.importday : '',
          placeproduction: this.contact ? this.contact.placeproduction : '',
        },
        message: '',
      };
    },
    computed: {
      isNewProduct() {
        return this.contact;
      },
    },
    methods: {
      async submitForm() {
            try {
                if (this.isNewProduct) {
                    // Thêm sản phẩm mới nếu là trường hợp sản phẩm mới
                    await ListProductService.createProduct(this.formData);
                    this.message = 'Sản phẩm được thêm thành công.';
                } else  {
                    // Cập nhật thông tin sản phẩm nếu là trường hợp cập nhật
                    await ListProductService.updateId(this.contact._id, this.formData);
                    this.message = 'Thông tin sản phẩm được cập nhật thành công.';
                }
            } catch (error) {
                console.error(error);
                this.message = 'Đã xảy ra lỗi khi lưu sản phẩm.';
            }
        },
      async deleteProduct() {
        if (confirm("Bạn muốn xóa sản phẩm này?")) {
          try {
            await ListProductService.deleteProduct(this.contact._id);
            this.message = 'Sản phẩm đã được xóa thành công.';
          } catch (error) {
            console.error(error);
            this.message = 'Đã xảy ra lỗi khi xóa sản phẩm.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
.product-form {
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
input[type="number"],
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

/* Nút cập nhật */
button[type="submit"] {
  background-color: #2ecc71; /* Màu xanh */
  color: #fff;
}

/* Nút xóa sản phẩm */
.delete {
  background-color: #e74c3c; /* Màu đỏ */
  color: #fffffff0;
}

/* Khoảng chắn giữa hai nút */
button + button {
  margin-left: 10px;
}

button:hover {
  opacity: 0.8; /* Hiệu ứng khi di chuột qua nút */
}


</style>
