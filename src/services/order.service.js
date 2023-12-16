import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    async createOrder(userId, cart, address, name, phone, totalMoney, deliveryInstructions) {
        const data = { userId, cart, address, name, phone, totalMoney, deliveryInstructions };
        return (await this.api.post("/createOrder", data)).data;

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
}

export default new OrderService();