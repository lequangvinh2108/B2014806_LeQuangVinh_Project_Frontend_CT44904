<template>
  <div>
    <h1 style="text-align: center; color: blue;">Danh sách hóa đơn nhập kho</h1>
    <div class="invoice-container" style="background-color: beige;" v-for="(group, index) in warehouseGroups" :key="index">
      <div class="invoice">
        <button v-if="!group.confirmed" @click="confirmInvoice(group)" class="confirm-button btn btn-warning">Xác nhận</button>
        <button v-else class="confirm-button btn btn-success" disabled>Đã xác nhận</button>
        <h4>Số hóa đơn nhập kho: {{ group.number }}</h4> <!-- Hiển thị số hóa đơn của nhóm -->
        <p>Ngày nhập kho: {{ group.date }}</p> <!-- Hiển thị ngày nhập kho của nhóm -->
        <p>Nhà cung cấp: {{ group.supplier }}</p> <!-- Hiển thị nhà cung cấp của nhóm -->
        <table>
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Khối lượng</th>
              <th>Giá Nhập</th>
              <th>Hạn sử dụng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in group.items" :key="idx" style="background-color: aliceblue;">
              <td>{{ group.productId }}</td>
              <td>{{ group.product }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.mass }}</td>
              <td>{{ formatCurrency(item.unitPrice) }}</td>
              <td>{{ item.expiry }}</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
// Import các modules cần thiết
import warehouseService from '../services/warehouse.service';
import productService from "../services/product.service";

export default {
  data() {
    return {
      warehouseGroups: [],
    };
  },
  mounted() {
    // Gọi hàm lấy danh sách sản phẩm từ backend khi component được render
    this.fetchWarehouseItems();
    // Khôi phục trạng thái đã xác nhận từ Local Storage khi tải lại trang
    // this.restoreConfirmedStatus();
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
    // Hàm lấy danh sách sản phẩm từ backend
    async fetchWarehouseItems() {
      try {
        // Gọi hàm getWarehouseItems từ WarehouseService để lấy danh sách sản phẩm
        const warehouseItems = await warehouseService.getWarehouseItems();
        // Nhóm lại dữ liệu theo number
        const groupedItems = this.groupWarehouseItems(warehouseItems);
        // Gán dữ liệu đã nhóm vào warehouseGroups và khởi tạo confirmed cho mỗi nhóm
        this.warehouseGroups = groupedItems.map(group => ({ ...group, confirmed: false }));

        const confirmedGroups = JSON.parse(localStorage.getItem('confirmedGroups') || '[]');
        // Duyệt qua mỗi nhóm và kiểm tra xem số hóa đơn của nhóm có trong danh sách đã xác nhận không
        this.warehouseGroups.forEach(group => {
          if (confirmedGroups.includes(group.number)) {
            group.confirmed = true;
          } else {
            group.confirmed = false;
          }
        });
      
      } catch (error) {
        console.error('Error fetching warehouse items:', error);
      }
    },
    groupWarehouseItems(items) {
  const groupedItems = [];
  items.forEach(item => {
    item.items.forEach(subItem => {
      const existingGroup = groupedItems.find(group => group.number === subItem.number);
      if (existingGroup) {
        existingGroup.items.push(subItem);
      } else {
        // Trích xuất thông tin productId và product từ item ngoài mảng items
        const { productId, product, totalQuantity, } = item;
        groupedItems.push({
          number: subItem.number,
          date: subItem.date,
          supplier: subItem.supplier,
          productId, // Sử dụng productId từ item
          product,
          totalQuantity,   // Sử dụng product từ item
          items: [subItem]
        });
      }
    });
  });
  return groupedItems;
},


async confirmInvoice(group) {
  try {
    // Kiểm tra xem sản phẩm đã tồn tại trong collection "products" chưa
    const existingProduct = (await productService.getAll()).find(p => p.code === group.productId);
    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      const updatedQuantity = existingProduct.quantity + group.items[0].quantity; // Sử dụng totalQuantity từ group
      await productService.updateCode(existingProduct.code, { ...existingProduct, quantity: updatedQuantity });
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới
      await productService.create({
        code: group.productId,
        name: group.product,
        quantity: group.items[0].quantity,
        importprice: group.items[0].unitPrice,
      });
    }
    // Cập nhật trạng thái đã xác nhận của nhóm
    group.confirmed = true;
    // Lưu trạng thái đã xác nhận vào Local Storage
    this.saveConfirmedStatus();
    // Hiển thị thông báo hoặc cập nhật giao diện sau khi xác nhận thành công
    console.log('Invoice confirmed successfully');
  } catch (error) {
    console.error('Error confirming invoice:', error);
    // Hiển thị thông báo hoặc xử lý lỗi nếu cần
  }
},


    saveConfirmedStatus() {
      try {
        const confirmedGroups = this.warehouseGroups.filter(group => group.confirmed).map(group => group.number);
        localStorage.setItem('confirmedGroups', JSON.stringify(confirmedGroups));
      } catch (error) {
        console.error('Error saving confirmed status:', error);
      }
    },
    
  },
};
</script>

<style scoped>
.invoice-container {
  margin-bottom: 20px;
  border: 2px solid #ccc;
  padding: 10px;
  position: relative; /* Để các phần tử con có thể sử dụng vị trí tương đối */
}
.invoice {
  margin-bottom: 10px;
}
.confirm-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
}
</style>