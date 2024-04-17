// user.service.js

import axios from "axios";

const API_URL = "/api/auth"; // Update with your API endpoint

class UserService {
    async register(user) {
        try {
            const response = await axios.post(`${API_URL}/register`, user);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async login(credentials) {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async getUserProfile(userId) {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
    async getUserProfile(userId) {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }


    async getAllUsers() {
        try {
            const response = await axios.get(`${API_URL}/`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async deleteUser(userId) {
        try {
            const response = await axios.delete(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async logout() {
        try {
            const response = await axios.post(`${API_URL}/logout`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}

export default new UserService();