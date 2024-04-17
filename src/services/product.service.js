import createApiClient from "./api.service";
class ContactService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async updateCode(code, data) {
        return (await this.api.put(`/updateCode/${code}`, data)).data;
    }

    async getProductByCode(code) {
        return (await this.api.get(`/findByCode/${code}`)).data;
    }

    async updateDiscount(code, data) {
        return (await this.api.put(`/updateDiscount/${code}`, data)).data;
    }


}
export default new ContactService();