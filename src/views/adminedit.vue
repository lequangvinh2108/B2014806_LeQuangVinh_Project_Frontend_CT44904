<template>
  <div class="admin-edit">
    <h2 style="text-align: center;">Danh sách sản phẩm</h2>
    <div class="row">
      <!-- <div class="col-md-2">
        <button class="btn btn-sm btn-success" @click="goToAddProduct">
          <i class="fas fa-plus"></i> Add New
        </button>
      </div>
      <div class="col-md-2 text-right">
        <button class="btn btn-sm btn-danger" @click="deleteAllProducts">
          <i class="fas fa-trash"></i> Delete All
        </button>
      </div> -->
    </div>
    <table>
      <thead>
        <tr>
          <th style="text-align: center;">Mã sản phẩm</th>
          <th style="text-align: center;">Sản phẩm</th>
          <th style="text-align: center;">Số lượng</th>
          <th style="text-align: center;">Giá bán</th>
          <th style="text-align: center;">Giá nhập</th>
          <th style="text-align: center;">Hành dộng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product._id">
          <td>
            <p style="text-align: center;">{{ product.code }}</p>
          </td>
          <td>
            <div class="product-info">
              <img :src="product.imgUrl" alt="Product Image" />
              <p>{{ product.name }}</p>
            </div>
          </td>
          <td>
            <p style="text-align: center;">{{ product.quantity }}</p>
          </td>
          <td>
            <p style="text-align: center;">{{ formatCurrency(product.price) }}</p>
          </td>
          <td>
            <p style="text-align: center;">{{ formatCurrency(product.importprice) }}</p>
          </td>
          <td>
            <div class="button-container">
              <router-link :to="{ name: 'admin.edit', params: { id: product._id } }">
                <button class="btn btn-warning">Sửa</button>
              </router-link>
              <button @click="deleteProduct(product._id)" class="btn btn-danger">Xóa</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductService from "@/services/product.service";
import AdminEditForm from "@/components/AdminEditForm.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    AdminEditForm,
    Footer,
  },
  data() {
    return {
      products: [],
      searchText: "",
    };
  },
  computed: {
    filteredProducts() {
      return this.searchText
        ? this.products.filter(
            (product) =>
              product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
              product.code.toLowerCase().includes(this.searchText.toLowerCase())
          )
        : this.products;
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },

    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await ProductService.delete(productId);
          this.retrieveProducts();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async deleteAllProducts() {
      if (confirm("Are you sure you want to delete all products?")) {
        try {
          await ProductService.deleteAll();
          this.retrieveProducts();
        } catch (error) {
          console.error(error);
        }
      }
    },
    goToAddProduct() {
      this.$router.push({ name: "admin.add" });
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style scoped>
.admin-edit {
  text-align: left;
  max-width: 750px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-info img {
  max-width: 50px;
  height: auto;
}

 .button-container {
  display: flex;
  justify-content: space-around;
}

button {
  padding: 8px;
  cursor: pointer;
}

/*
button.edit {
  background-color: #3498db;
  
  color: #fff;
}


button.delete {
  background-color: #e74c3c;
  
  color: #fff;
} */
</style>
