<template>
    <div class="admin-edit">
      <div class="row">
        <div class="col-md-2">
          <button class="btn btn-sm btn-success" @click="goToAddContact">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
        </div>
        <div class="col-md-2 text-right">
          <button class="btn btn-sm btn-danger" @click="deleteAllProducts">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredContacts" :key="product._id">
            <td>
              <div class="product-info">
                <img :src="product.imgUrl" alt="Product Image" />
                <p>{{ product.name }}</p>
              </div>
            </td>
            <td>
              <div class="button-container">
                <router-link :to="{ name: 'contact.edit', params: { id: product._id } }">
                  <button class="edit">Edit</button>
                </router-link>
                <button @click="deleteProduct(product._id)" class="delete">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import ProductList from "@/components/ProductList.vue";
  import ContactService from "@/services/product.service";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
      ProductList,
      Footer,
    },
    data() {
      return {
        contacts: [],
        activeIndex: -1,
        searchText: "",
      };
    },
    watch: {
      searchText() {
        this.activeIndex = -1;
      },
    },
    computed: {
      contactStrings() {
        return this.contacts.map(({ name, price, writer, description, imgUrl }) =>
          [name, price, writer, description, imgUrl].join("")
        );
      },
      filteredContacts() {
        return this.searchText
          ? this.contacts.filter((_contact, index) =>
              this.contactStrings[index].includes(this.searchText)
            )
          : this.contacts;
      },
      activeContact() {
        return this.activeIndex >= 0 ? this.filteredContacts[this.activeIndex] : null;
      },
      filteredContactsCount() {
        return this.filteredContacts.length;
      },
    },
    methods: {
      async retrieveContacts() {
        try {
          this.contacts = await ContactService.getAll();
        } catch (error) {
          console.error(error);
        }
      },
      refreshList() {
        this.retrieveContacts();
        this.activeIndex = -1;
      },
      async deleteProduct(productId) {
        if (confirm("Are you sure you want to delete this product?")) {
          try {
            await ContactService.delete(productId);
            this.refreshList();
          } catch (error) {
            console.error(error);
          }
        }
      },
      async deleteAllProducts() {
        if (confirm("Are you sure you want to delete all products?")) {
          try {
            await ContactService.deleteAll();
            this.refreshList();
          } catch (error) {
            console.error(error);
          }
        }
      },
      goToAddContact() {
        this.$router.push({ name: "contact.add" });
      },
      editContact() {
        if (this.activeContact) {
          this.$router.push({ name: "contact.edit", params: { id: this.activeContact._id } });
        }
      },
    },
    mounted() {
      this.refreshList();
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
  
  th, td {
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
  
  /* Thêm style cho nút Edit */
  button.edit {
    background-color: #3498db; /* Màu xanh đậm */
    color: #fff;
  }
  
  /* Thêm style cho nút Delete */
  button.delete {
    background-color: #e74c3c; /* Màu đỏ */
    color: #fff;
  }
  </style>
  