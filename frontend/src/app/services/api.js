import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:2500/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleApiError = async (error) => {
    if (error.response) {
        if (error.response.status === 401 && error.response.data.msg === 'Токен истек') {
            try {
                await refreshToken();
                const originalRequest = error.config;
                const newAccessToken = Cookies.get('csrf_access_token');
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Ошибка обновления токена:', refreshError);
                window.location.href = '/login';
            }
        }
        throw error.response.data;
    } else {
        console.error('API Error:', error.message);
        throw error.message;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/login', credentials);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/register', userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const refreshToken = async () => {
    try {
        const response = await apiClient.post('/refresh');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.post('/logout');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getUserProfile = async (accessToken) => {
    try {
        const response = await apiClient.get('/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getOrders = async (userId) => {
    try {
        const response = await apiClient.get(`/orders/get_orders`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post(`/orders/create_order`, orderData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const editOrder = async (orderId, orderData) => {
    try {
        const response = await apiClient.put(`/orders/update_order/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};