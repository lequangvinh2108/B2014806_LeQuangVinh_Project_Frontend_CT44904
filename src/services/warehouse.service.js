import createApiClient from "./api.service";

class WarehouseService {
    constructor(baseUrl = "/api/warehouse") {
        this.api = createApiClient(baseUrl);
    }

    async addProductsToWarehouse(invoice) {
        return (await this.api.post("/addProductsToWarehouse", invoice)).data;
    }

    async getWarehouse(number) {
        const response = await this.api.get(`/getWarehouse/${number}`);
        return response.data;
    }

    async getProductInWarehouse(productId) {
        const response = await this.api.get(`/getProductInWarehouse/${productId}`);
        return response.data;
    }

    async getWarehouseItems() {
        const response = await this.api.get("/getWarehouseItems");
        return response.data;
    }

    async getAllWarehouseItems() {
        const response = await this.api.get("/getAllWarehouseItems");
        return response.data;
    }


}

export default new WarehouseService();