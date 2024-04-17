import createApiClient from "./api.service";

class ListProductService {
    constructor(baseUrl = "/api/listproduct") {
        this.api = createApiClient(baseUrl);
    }

    async createProduct(productData) {
        return (await this.api.post("/createProduct", productData)).data;
    }

    async getProduct(productId) {
        return (await this.api.get(`/getProduct/${productId}`)).data;
    }

    async updateProduct(code, productData) {
        return (await this.api.put(`/updateProduct/${code}`, productData)).data;
    }

    async deleteProduct(productId) {
        return (await this.api.delete(`/deleteProduct/${productId}`)).data;
    }

    async deleteAllProducts() {
        return (await this.api.delete("/deleteAllProducts")).data;
    }

    async getAll() {
        return (await this.api.get("/getAll")).data;
    }

    async updateId(productId, productData) {
        return (await this.api.put(`/updateId/${productId}`, productData)).data;
    }


}

export default new ListProductService();