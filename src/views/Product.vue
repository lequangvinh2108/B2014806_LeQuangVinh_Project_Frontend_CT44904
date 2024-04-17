<template>
 
  
  <div class="row">
    
    <!-- Carousel Section -->
    <div class="mt-3">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    
  </ol>
  <div class="carousel-inner">
    
    <div class="carousel-item active">
      <img class="d-block w-100" src="./image/img_1.jpg" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="./image/img_1.jpg" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="./image/img_1.jpg" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

      <hr>
      <div class="col-md-12 d-flex align-items-center justify-content-center">
        <InputSearch v-model="searchText" class="small-search-bar" />
      </div>
      <hr />
      <ProductList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
        @addToCart="addToCart"
      />
      <hr>
      <Footer />
    </div>
    
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ContactService from "@/services/product.service";
import Footer from "@/components/Footer.vue";
import Cart from "../views/Cart.vue"; 

export default {
  components: {
    ProductCard,
    InputSearch,
    ProductList,
    Footer,
    Cart, 
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
      cart: [],
      showCart: false,
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.contacts.map(({ name, price, mass, description, imgUrl }) =>
        [name, price, mass, description, imgUrl].join("")
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
    addToCart(product) {
      this.cart.push(product);
      console.log("Đã thêm vào giỏ hàng:", product);
    },
    viewCart() {
      this.showCart = true;
    },
    closeCart() {
      this.showCart = false;
    },
  },
  mounted() {
    this.refreshList();
  },

};
</script>

<style scoped>

</style>
