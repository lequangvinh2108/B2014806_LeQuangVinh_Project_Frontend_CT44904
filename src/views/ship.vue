<template>
  <div>
    
    
    <h3 style="text-align: center; color:blueviolet;">Đơn hàng đã nhận</h3>
    <p><strong>Tổng tiền kiếm được:</strong> {{ formatCurrency(totalEarnings) }}</p>
    
    <div v-if="shipperOrders.length > 0">
      <div v-for="order in shipperOrders" :key="order._id" class="order-container">
        <div class="order-info">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Mã đơn hàng:</strong> {{ order.orderId }}</p>
              <p><strong>Tên người nhận:</strong> {{ order.name }}</p>
              <p><strong>Địa chỉ nhận hàng:</strong> {{ order.address }}</p>
              <p><strong>Số điện thoại:</strong> {{ order.phone }}</p>

              <h3>Sản phẩm</h3>
              <ul>
                <li v-for="product in order.cart" :key="product._id">
                  <!-- <span>
                      <img :src="product.product.imgUrl" alt="Product Image" class="product-image" />
                  </span> -->
                  <span>
                      {{ product.product.name }} - {{ formatCurrency(product.product.price) }} (Số lượng: {{ product.quantity }})
                  </span>
                </li>
              </ul>
            </div>

            <div class="col-md-6">
              <h3>Thông tin giao hàng</h3>
              <p><strong>Hướng dẫn giao hàng:</strong> {{ order.deliveryInstructions }}</p>
              <p><strong>Phương thức giao hàng:</strong> {{ order.deliveryMethods }}</p>
              <p><strong>Phương thức thanh toán:</strong> {{ order.paymentMethods }}</p>
              <p><strong>Tổng tiền:</strong> {{ formatCurrency(order.totalMoney) }}</p>

              <div class="earnings-info">
                <p><strong>Tiền kiếm được (10%):</strong> {{ formatCurrency(calculateEarnings(order.totalMoney)) }}</p>
              </div>

              <button
                @click="confirmOrder(order)"
                :class="{ 'completed': orderCompleted }"
                :disabled="orderCompleted"
              >
                {{ orderCompleted ? 'Hoàn thành' : 'Xác nhận' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Không có đơn hàng nào cho shipper này.</p>
    </div>
  </div>
</template>

<script>
import ShipService from "../services/ship.service";
import OrderService from "../services/order.service";

export default {
  data() {
    return {
      shipperOrders: [],
      userId: localStorage.getItem("userId"),
      shipperName: '', // Thêm thuộc tính shipperName
      totalEarnings: 0, // Thêm thuộc tính totalEarnings
      orderCompleted: false,
    };
  },
  methods: {
    async receiveOrder() {
      try {
        const shipperOrders = await ShipService.getAllOrdersForShipper(this.userId);
        this.shipperOrders = shipperOrders;

        // Tính tổng tiền kiếm được (10% tổng tiền của từng đơn hàng)
        this.totalEarnings = shipperOrders.reduce((total, order) => total + (order.totalMoney * 0.1), 0);

        // Lấy tên shipper từ localStorage hoặc từ API nếu có
        this.shipperName = localStorage.getItem("shipperName") || ''; // Thay '' bằng API lấy tên shipper nếu có
      } catch (error) {
        console.error("Lỗi khi nhận đơn hàng của shipper:", error.message);
      }
    },

    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },

    calculateEarnings(totalMoney) {
      return (totalMoney * 0.1).toFixed(2);
    },

    async confirmOrder(order) {
      try {
        if (!this.orderCompleted) {
          await OrderService.updateDeliveryStatus(order.orderId, "Hoàn thành");
          this.orderCompleted = true;

          // Lưu trạng thái đã xác nhận vào localStorage
          localStorage.setItem("confirmedOrder", order.orderId);
        } else {
          console.log("Đơn hàng đã được hoàn thành.");
        }
      } catch (error) {
        console.error("Lỗi khi xác nhận đơn hàng:", error.message);
      }
    },
  },

  mounted() {
    this.receiveOrder();

    // Kiểm tra nếu đơn hàng đã được xác nhận, thì cập nhật trạng thái nút
    const confirmedOrder = localStorage.getItem("confirmedOrder");
    const selectedOrderId = localStorage.getItem("selectedOrderId");
    if (confirmedOrder === selectedOrderId) {
      this.orderCompleted = true;
    }
  },
};
</script>

<style scoped>
.order-container {
  border: solid #4f2891;
  padding: 1px;
  /* border-radius: 5px; */
  margin-bottom: 20px;
}

.order-info {
  /* margin-bottom: 20px;  */
  background-color: antiquewhite;
}

.earnings-info {
  margin-top: 10px;
}

.completed {
  background-color: #ccc;
  cursor: not-allowed;
}

.product-image {
    max-width: 50px; /* Adjust the size based on your preference */
    margin-right: 10px;
}


</style>
