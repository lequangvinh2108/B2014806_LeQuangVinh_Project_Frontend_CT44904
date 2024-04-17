import createApiClient from "./api.service";

class ContactService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }

    async createContact(contactData) {
        return (await this.api.post("/createContact", contactData)).data;
    }

    async getAll() {
        return (await this.api.get("/getAll")).data;
    }

}

export default new ContactService();