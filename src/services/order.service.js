import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    async createOrder(userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods, orderStatus) {
        // Thêm thông tin vận chuyển
        const data = { userId, cart, address, name, phone, totalMoney, deliveryInstructions, deliveryMethods, paymentMethods, orderStatus };
        return (await this.api.post("/createOrder", data)).data;
    }

    async updateDeliveryStatus(orderId, newStatus) {
        try {
            const result = await this.api.put(`/updateDeliveryStatus/${orderId}`, { orderStatus: newStatus });
            console.log("API Response:", result);
            return result.data;
        } catch (error) {
            console.error("Error in updateDeliveryStatus:", error.message);
            throw error;
        }
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const result = await this.api.put(`/updateOrderStatus/${orderId}`, { orderStatus: newStatus });
            console.log("API Response:", result);
            return result.data;
        } catch (error) {
            console.error("Error in updateOrderStatus:", error.message);
            throw error;
        }
    }

    async getOrder(userId, orderId) {
        try {
            const result = await this.api.get(`/getOrder/${userId}/${orderId}`);
            console.log("API Response:", result);
            return result.data;
        } catch (error) {
            console.error("Error in getOrder:", error.message);
            throw error;
        }
    }

    async getUserOrders(userId) {
        return (await this.api.get(`/getUserOrders/${userId}`)).data;
    }

    async getAllOrders() {
        return (await this.api.get("/getAllOrders")).data;
    }

    async deleteOrder(userId, orderId) {
        return (await this.api.delete(`/deleteOrder/${userId}/${orderId}`)).data;
    }

    async deleteOrderById(orderId) {
        return (await this.api.delete(`/deleteOrder/${orderId}`)).data;
    }

    async getOrderByDeliveryStatus(deliveryStatus) {
        try {
            const result = await this.api.get(`/getOrderByDeliveryStatus/${deliveryStatus}`);
            console.log("API Response:", result);
            return result.data;
        } catch (error) {
            console.error("Error in getOrderByDeliveryStatus:", error.message);
            throw error;
        }
    }

    async getorderId(orderId) {
        try {
            const result = await this.api.get(`/getorderId/${orderId}`);
            console.log("API Response:", result);
            return result.data;
        } catch (error) {
            console.error("Error in getorderId:", error.message);
            throw error;
        }
    }

}

export default new OrderService();