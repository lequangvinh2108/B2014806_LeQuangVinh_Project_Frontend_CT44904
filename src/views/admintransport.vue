<template>
    <div class="admin-transport">
      <h1 style="text-align: center;">Xác nhận đơn hàng</h1>
      <div class="order-list" >
        <div v-for="order in orders" :key="order._id" class="order-item">
            <div class="order-details" style="background-color: bisque;">
                <h2>Mã đơn hàng: {{ order._id }}</h2>
                <p><b>Người Đặt:</b> {{ order.name }}</p>
                <p><b>Địa chỉ:</b> {{ order.address }}</p>
                <p><b>Số điện thoại:</b> {{ order.phone }}</p>
                <div>
                    <strong>Ngày Đặt Hàng:</strong> {{ formatDate(order.orderDate) }}
                </div>
                <Strong>Danh sách đơn hàng
                    <ul>
                    <li v-for="product in order.cart" :key="product._id">
                        {{ product.product.name }} - (Số lượng: {{ product.quantity }})

                    </li>
                    </ul>
                </Strong>
                <div>
                    <strong>Tổng Tiền:</strong> {{ formatCurrency(order.totalMoney) }}
                </div>
            </div>
            <button v-if="!order.confirmed" class="confirm-button btn btn-warning" @click="confirmOrder(order._id)">Xác nhận</button>
            <button v-else class="confirm-button btn btn-success" disabled>Đã xác nhận</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import OrderService from '@/services/order.service';

export default {
    name: 'AdminTransport',
    props: ['orders'],
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        this.getAllOrders();
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

        async getAllOrders() {
            try {
                this.orders = await OrderService.getAllOrders();
                // Kiểm tra và cập nhật trạng thái đã xác nhận của từng đơn hàng
                this.orders.forEach(order => {
                    order.confirmed = this.isOrderConfirmed(order._id);
                });
            } catch (error) {
                console.error('Error fetching orders:', error.message);
                // Xử lý lỗi
            }
        },

        async confirmOrder(orderId) {
            try {
                // Thực hiện logic xác nhận đơn hàng ở đây

                // Gọi API để cập nhật trạng thái của đơn hàng
                await OrderService.updateDeliveryStatus(orderId, "Đã xác nhận");

                // Cập nhật trạng thái xác nhận của đơn hàng trong danh sách
                const order = this.orders.find(order => order._id === orderId);
                if (order) {
                    order.confirmed = true;
                }

                // Lưu trạng thái xác nhận vào localStorage
                this.saveConfirmedOrder(orderId);

            } catch (error) {
                console.error('Error confirming order:', error.message);
                // Xử lý lỗi nếu cần
            }
        },

        isOrderConfirmed(orderId) {
            try {
                const confirmedOrderIds = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
                return confirmedOrderIds.includes(orderId);
            } catch (error) {
                console.error('Error checking confirmed order:', error);
                return false;
            }
        },

        saveConfirmedOrder(orderId) {
            try {
                const confirmedOrderIds = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
                if (!confirmedOrderIds.includes(orderId)) {
                    confirmedOrderIds.push(orderId);
                    localStorage.setItem('confirmedOrders', JSON.stringify(confirmedOrderIds));
                }
            } catch (error) {
                console.error('Error saving confirmed order:', error);
            }
        }
    },
};
</script>


  
  <style scoped>
  /* Add your CSS styles here */

  .order-item {
    /* Styles for each individual order item */
    border: 1px solid #0f0e0e;
    margin-bottom: 30px;
    padding: 1px;
    position: relative;
    margin-bottom: 20px;
  }
 
  .confirm-button {
    /* Styles for the confirm button */
    position: absolute;
    bottom: 10px;
    right: 10px;
    margin-top: 10px;
  }
  
  .admin-transport {
    margin: 20px auto;
    max-width: 800px;
  }
  
  
  
  .order-details {
    padding: 20px;
    background-color: bisque;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  

  </style>
  