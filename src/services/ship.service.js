import createApiClient from "./api.service";

class ShipService {
    constructor(baseUrl = "/api/ship") {
        this.api = createApiClient(baseUrl);
    }

    async saveOrderToShip(order) {
        return (await this.api.post("/saveOrder", order)).data;
    }

    async getShip(orderId) {
        return (await this.api.get(`/getShip/${orderId}`)).data;
    }

    async getUserShip(userId) {
        return (await this.api.get(`/getUserShip/${userId}`)).data;
    }

    async getOrderByOrderId(orderId) {
        return (await this.api.get(`/getOrderByOrderId/${orderId}`)).data;
    }

    async getOrdersByUserId(userId) {
        try {
            return (await this.api.get(`/getOrdersByUserId/${userId}`)).data;
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
            throw error;
        }
    }

    async getAllOrdersForShipper(userId) {
        return (await this.api.get(`/getAllOrdersForShipper/${userId}`)).data;
    }

}

export default new ShipService();