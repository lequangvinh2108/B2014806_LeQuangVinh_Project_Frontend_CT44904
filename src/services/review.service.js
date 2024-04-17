import createApiClient from "./api.service";

class ReviewService {
    constructor(baseUrl = "/api/reviews") {
        this.api = createApiClient(baseUrl);
    }

    async createReview(userId, productId, nameProduct, ratingScale, comment) {
        try {
            const data = { userId, productId, nameProduct, ratingScale, comment };
            const response = await this.api.post("/createReview", data);
            return response.data;
        } catch (error) {
            console.error("Error creating review:", error);
            throw error;
        }
    }

    async getReviewsByProductId(productId) {
        try {
            const response = await this.api.get(`/getReviewsByProductId/${productId}`);
            return response.data;
        } catch (error) {
            console.error("Error getting reviews by product ID:", error);
            throw error;
        }
    }
}

export default new ReviewService();