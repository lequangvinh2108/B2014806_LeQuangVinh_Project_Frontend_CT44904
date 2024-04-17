<template>
  <div class="invoice">
    <h2 style="text-align: center; color: blueviolet;">Hóa đơn nhập kho hàng</h2>
    <div class="input-fields">
      <div class="input-row">
        <label for="invoiceNumber">Số hóa đơn nhập kho:</label>
        <input type="text" id="invoiceNumber" v-model="invoice.number">
      </div>
      <div class="input-row">
        <label for="invoiceDate">Ngày nhập kho:</label>
        <input type="date" id="invoiceDate" v-model="invoice.date">
      </div>
      <div class="input-row">
        <label for="supplier">Nhà cung cấp:</label>
        <input type="text" id="supplier" v-model="invoice.supplier">
      </div>
    </div>
    
    <table class="invoice-table">
      <thead>
        <tr>
          <th>Mã sản phẩm</th>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá (VNĐ)</th>
          <th>Khối lượng</th>
          <th>Hạn sử dụng</th>
          <th>Thành tiền (VNĐ)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in invoice.items" :key="index">
          <td>
            <select v-model="item.productId">
              <option value="CC1">CC1</option>
              <option value="CC2">CC2</option>
              <option value="CC3">CC3</option>
              <option value="CC4">CC4</option>

              <option value="CCV1">CCV1</option>
              <option value="CCV2">CCV2</option>
              <option value="CCV3">CCV3</option>
              <option value="CCV4">CCV4</option>

              <option value="M1">M1</option>
              <option value="M2">M2</option>
              <option value="M3">M3</option>
              <option value="M4">M4</option>

              <option value="V1">V1</option>

            </select>
          </td>
          <td>
            <!-- Hiển thị tên sản phẩm tương ứng với mã sản phẩm -->
            <input type="text" :value="productName(item.productId)" readonly>
          </td>
          <td><input type="number" v-model="item.quantity"></td>
          <td><input type="number" v-model="item.unitPrice"></td>
          <td><input type="text" v-model="item.mass"></td>
          <td><input type="date" v-model="item.expiry"></td>
          <td>{{ formatCurrency(item.quantity * item.unitPrice) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-right"><strong>Tổng cộng:</strong></td>
          <td>{{ formatCurrency(totalAmount) }}</td>
        </tr>
        <!-- Nút Thêm dòng -->
        <button @click="addRow" class="btn btn-secondary fas fa-plus"></button>
      </tfoot>
    </table>
    <br>
    <!-- Nút Gửi -->
    <button @click="submitForm" class="btn btn-success">Gửi</button>
    
    <Notification ref="notification" />
  </div>
</template>

<script>
import warehouseService from '../services/warehouse.service';
import Notification from './Notification.vue';

export default {
  components: {
    Notification
  },
  data() {
    return {
      invoice: {
        number: '',
        date: '',
        supplier: '',
        items: [
          { productId: '', product: '', quantity: '', unitPrice: '', mass: '80g', expiry: '' },
          // { productId: '', product: '', quantity: '', unitPrice: '', mass: '80g', expiry: '' },
          // { productId: '', product: '', quantity: '', unitPrice: '', mass: '80g', expiry: '' }
        ]
      }
    };
  },
  computed: {
    totalAmount() {
      return this.invoice.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    },
    productName() {
      return (productId) => {
        switch (productId) {
          case 'CC1':
            return 'Cá Cơm rim Me';
          case 'CC2':
            return 'Cá Cơm rim Tiêu';
          case 'CC3':
            return 'Cá Cơm rim Tỏi Ớt';
          case 'CC4':
            return 'Cá Cơm sấy Lá Chúc';
          case 'CCV1':
            return 'Cá Chỉ Vàng rim Me';
          case 'CCV2':
            return 'Cá Chỉ Vàng rim Tiêu';
          case 'CCV3':
            return 'Cá Chỉ Vàng rim Tỏi Ớt';
          case 'CCV4':
            return 'Cá Chỉ Vàng sấy Lá Chúc';
          case 'M1':
            return 'Mực khô rim Me';
          case 'M2':
            return 'Mực khô rim Tiêu';
          case 'M3':
            return 'Mực khô rim Tỏi Ớt';
          case 'M4':
            return 'Mực khô sấy Lá Chúc';
          case 'V1':
            return 'Khô Gà';
          default:
            return '';
        }
      };
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    async submitForm() {
      try {
        await warehouseService.addProductsToWarehouse(this.invoice);
        this.resetForm(); // Đặt lại form sau khi gửi thành công
        this.$refs.notification.showMessage('Gửi thành công!');
      } catch (error) {
        console.error('Error submitting warehouse entry:', error);
      }
    },
    resetForm() {
      // Reset dữ liệu trong form ở đây
      this.invoice = {
        number: '',
        date: '',
        supplier: '',
        items: [
          { productId: '', product: '', quantity: '', unitPrice: '', mass: '80g', expiry: '' },
          // { productId: '', product: '', quantity: '', unitPrice: '', mass: '80g', expiry: '' },
          // { productId: '', product: '', quantity: '', unitPrice: '', mass: '80g', expiry: '' }
        ]
      };
    },
    addRow() {
      this.invoice.items.push({ productId: '', product: '', quantity: '', unitPrice: '', mass: '', expiry: '' });
    },
  },
  watch: {
    'invoice.items': {
      deep: true,
      handler(newVal) {
        // Iterate through items to update product name
        newVal.forEach(item => {
          item.product = this.productName(item.productId);
        });
      }
    }
  }
};
</script>


<style scoped>
/* CSS styles */
</style>
