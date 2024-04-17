<template>
  <h1 style="text-align: center; color: blue;">Kho hàng</h1>
  <div class="admin-edit">
    <div class="row">
      <div class="col-md-2">
        <button class="btn btn-sm btn-success" @click="goToAddProduct">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="text-align: center;">Mã sản phẩm</th>
          <th style="text-align: center;">Sản phẩm</th>
          <th style="text-align: center;">Tổng số lượng</th>
          <th style="text-align: center;">Số lượng</th>
          <!-- <th style="text-align: center;">Khối lượng</th> -->
          <th style="text-align: center;">Đơn giá nhập</th>
          <th style="text-align: center;">Hạn sử dụng</th>
          <th style="text-align: center;">Nhà cung cấp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product._id">
          <td>
            <p><b>{{ product.productId }}</b></p>
          </td>
          <td>
            <div class="product-info">
              <p>{{ product.product }}</p>
            </div>
          </td>
          <td>
            <p style="text-align: center;">{{ product.totalQuantity }}</p>
          </td>
          <td>
            <ul>
              <li v-for="(item, idx) in product.items" :key="idx">
                {{ item.quantity }}
              </li>
            </ul>
          </td>
          <!-- <td>
            <ul>
              <li v-for="(item, idx) in product.items" :key="idx">
                {{ item.mass }}
              </li>
            </ul>
          </td> -->
          <td>
            <ul>
              <li v-for="(item, idx) in product.items" :key="idx">
                {{ formatCurrency(item.unitPrice) }} 
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="(item, idx) in product.items" :key="idx">
                {{ item.expiry }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="(item, idx) in product.items" :key="idx">
                {{ item.supplier }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import WarehouseService from "@/services/warehouse.service";

export default {
  data() {
    return {
      products: [],
      searchText: "",
    };
  },
  computed: {
    filteredProducts() {
      return this.searchText
        ? this.products.filter(product =>
            product.product.toLowerCase().includes(this.searchText.toLowerCase())
          )
        : this.products;
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    async retrieveProducts() {
      try {
        this.products = await WarehouseService.getAllWarehouseItems();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await WarehouseService.deleteProduct(productId);
          this.retrieveProducts();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async deleteAllProducts() {
      if (confirm("Are you sure you want to delete all products?")) {
        try {
          await WarehouseService.deleteAllProducts();
          this.retrieveProducts();
        } catch (error) {
          console.error(error);
        }
      }
    },
    goToAddProduct() {
      this.$router.push({ name: "formadd" });
    },
    editProduct(productId) {
      this.$router.push({ name: "contact.edit", params: { id: productId } });
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
  max-width: 20000px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #230303;
  padding: 8px;
  text-align: left;
}

td {
  background-color: aliceblue;
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

button.edit {
  background-color: #3498db;
  color: #fff;
}

button.delete {
  background-color: #e74c3c;
  color: #fff;
}
</style>
