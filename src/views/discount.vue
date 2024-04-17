<template>
  <div>
    <h2 style="text-align: center; color: blue;">Thêm mã giảm giá</h2>
    <table>
      <tr>
        <th>Mã sản phẩm</th>
        <th>Sản phẩm</th>
        <th>Giảm giá</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày kết thúc</th>
      </tr>
      <tr v-for="(item, index) in formData" :key="index">
        <td>
          <select v-model="item.code">
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
          </select>
        </td>
        <td>{{ getProductByName(item.code) }}</td>
        <td><input type="number" v-model.number="item.discount">%</td>
        <td><input type="date" v-model="item.startDay"></td>
        <td><input type="date" v-model="item.finishedDay"></td>
      </tr>
      <tr>
        <td colspan="5">
          <button @click="addRow" style="margin-top: 10px;" class="btn btn-primary">+</button>
        </td>
      </tr>
    </table>
    <button @click="submitDiscount" style="margin-top: 10px;" class="btn btn-success">Gửi</button>
    <hr>
    <!-- Bảng hiển thị danh sách sản phẩm giảm giá -->
    <h2 style="text-align: center; color: chocolate;">Danh sách sản phẩm giảm giá</h2>
    <table>
      <tr>
        <th>Mã sản phẩm</th>
        <th>Sản phẩm</th>
        <th>Giảm giá</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày kết thúc</th>
        <th>Xóa</th> <!-- Thêm cột mới cho nút xóa -->
      </tr>
      <tr v-for="(discount, index) in discounts" :key="discount._id">
        <td>{{ discount.code }}</td>
        <td>{{ discount.product }}</td>
        <td>{{ discount.discount }}%</td>
        <td>{{ discount.startDay }}</td>
        <td>{{ discount.finishedDay }}</td>
        <td><button @click="deleteDiscount(discount.code)" class="btn btn-danger">Xóa</button></td> 
      </tr>
    </table>
  </div>
</template>

<script>
import DiscountService from '../services/discount.service';

export default {
  data() {
    return {
      formData: [
        {
          code: '',
          product: '',
          discount: '',
          startDay: '',
          finishedDay: ''
        }
      ],
      discounts: [], // Danh sách giảm giá
    };
  },
  methods: {
    async submitDiscount() {
      try {
        for (let item of this.formData) {
          item.product = this.getProductByName(item.code);
          await DiscountService.createDiscount(item);
        }
        console.log('Discounts created successfully');
        alert("Gửi thành công!!!")
        this.formData = [{
          code: '',
          product: '',
          discount: '',
          startDay: '',
          finishedDay: ''
        }];
        // Sau khi thêm giảm giá thành công, cập nhật lại danh sách giảm giá
        await this.fetchDiscounts();
      } catch (error) {
        console.error('Error creating discounts:', error);
      }
    },
    addRow() {
      this.formData.push({
        code: '',
        product: '',
        discount: '',
        startDay: '',
        finishedDay: ''
      });
    },
    getProductByName(code) {
      switch (code) {
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
        default:
          return '';
      }
    },
    async fetchDiscounts() {
      try {
        // Lấy danh sách giảm giá từ server và cập nhật vào biến discounts
        this.discounts = await DiscountService.getAll();
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    },

    async deleteDiscount(code) {
      try {
        await DiscountService.deleteDiscount(code);
        console.log('Discount deleted successfully');
        // Sau khi xóa sản phẩm thành công, cập nhật lại danh sách giảm giá
        await this.fetchDiscounts();
      } catch (error) {
        console.error('Error deleting discount:', error);
      }
    },
  },
  mounted() {
    // Khi component được mount, gọi phương thức fetchDiscounts để lấy danh sách giảm giá
    this.fetchDiscounts();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
