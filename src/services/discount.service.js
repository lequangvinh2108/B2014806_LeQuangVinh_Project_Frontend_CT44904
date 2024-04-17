import createApiClient from "./api.service";

class DiscountService {
    constructor(baseUrl = "/api/discounts") {
        this.api = createApiClient(baseUrl);
    }

    async createDiscount(data) {
        return (await this.api.post("/createDiscount", data)).data;
    }

    async getAll() {
        return (await this.api.get("/getAll")).data;
    }

    async getDiscountByCode(code) {
        const response = await this.api.get(`/getDiscountByCode/${code}`);
        return response.data;
    }

    async deleteDiscount(code) {
        const response = await this.api.delete(`/deleteDiscount/${code}`);
        return response.data;
    }
}

export default new DiscountService();