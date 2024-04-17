<template>
  <div>
    <h2 style="text-align: center;">Danh sách vận chuyển</h2>

    <!-- <OrderDetail
      v-for="order in orders"
      :key="order._id"
      :order="order"
      :submitOrder="() => submitOrder(order)"
    /> -->
    <OrderDetail
      v-for="order in orders"
      :key="order._id"
      :order="order"
      :submitOrder="submitOrder"
    />
  </div>
</template>

<script>
import OrderDetail from "../views/OrderDetail.vue";
import OrderService from "../services/order.service";
import ShipService from "../services/ship.service";

export default {
  components: {
    OrderDetail,
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async getOrders() {
  try {
    // Lấy tất cả đơn hàng
    const allOrders = await OrderService.getAllOrders();

    // Lọc ra các đơn hàng có orderStatus là "orderConfirmed"
    this.orders = allOrders.filter(order => order.orderStatus === "Đã xác nhận");
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error.message);
  }
},


    async submitOrder(orderId) {
      try {
        console.log("Processing order:", orderId);

        // Lấy đối tượng order từ danh sách orders
        const order = this.orders.find(o => o._id === orderId);

        // Cập nhật trạng thái giao hàng từ "Đã đặt" thành "Đang giao"
        console.log("orderId...........", orderId);
        const newDeliveryStatus = "Đang giao";
        await OrderService.updateDeliveryStatus(orderId, newDeliveryStatus);

        // Đánh dấu đơn hàng đã nhận
        order.isOrderReceived = true;

        

        // Lưu trạng thái đã nhận đơn vào localStorage
        const receivedOrders = JSON.parse(localStorage.getItem("receivedOrders")) || [];
        receivedOrders.push(order._id);
        localStorage.setItem("receivedOrders", JSON.stringify(receivedOrders));

        // Lấy thông tin người dùng từ local storage
        const userId = localStorage.getItem("userId");

        // Tạo đối tượng đơn hàng để lưu vào collection 'ship'
        const orderToSave = {
          orderId: order._id,
          userId: userId,
          cart: order.cart,
          address: order.address,
          name: order.name,
          phone: order.phone,
          totalMoney: order.totalMoney,
          deliveryInstructions: order.deliveryInstructions,
          deliveryMethods: order.deliveryMethods,
          paymentMethods: order.paymentMethods,
        };

        // Gọi API để lưu thông tin đơn hàng vào collection 'ship'
        await ShipService.saveOrderToShip(orderToSave);

        // Lưu thông tin đơn hàng vào localStorage để sử dụng trong ship.vue
        // localStorage.setItem("selectedUserId", userId);
        localStorage.setItem("selectedOrderId", order._id);
        console.log("order:", order._id);

        // Chuyển hướng đến trang ship.vue
        // this.$router.push({ name: "ship" });
      } catch (error) {
        console.error("Lỗi khi xử lý đơn hàng:", error.message);
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
