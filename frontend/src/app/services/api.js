import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:2500/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
    },
});

const refreshToken = async () => {
    try {
        const response = await apiClient.post('/refresh', {
            headers: {
                'X-CSRF-TOKEN': Cookies.get('csrf_refresh_token')
            }
        });
        if (response.data.access_token) {
            Cookies.set('csrf_access_token', response.data.access_token);
            return response.data.access_token;
        }
        return null;
    } catch (error) {
        handleApiError(error);
    }
};

const checkAndRefreshToken = async () => {
    const accessToken = Cookies.get('csrf_access_token');
    if (!accessToken) {
        const newAccessToken = await refreshToken();
        if (!newAccessToken) {
            throw new Error('Ошибка обновления access token, скорее всего нет refresh token');
        }
        return newAccessToken;
    }
    return accessToken;
};


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

const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/login', credentials);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/register', userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const logout = async () => {
    try {
        const response = await apiClient.post('/logout');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const getUserProfile = async (accessToken) => {
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

const getOrders = async (flag = 'asc') => {
    try {
        const response = await apiClient.get(`/orders/get_orders?flag=${flag}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post(`/orders/create_order`, orderData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const editOrder = async (orderId, orderData) => {
    try {
        const response = await apiClient.put(`/orders/update_order/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

const getUserOrders = async (accessToken) => {
    try {
        const response = await apiClient.get('/orders/history', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export {
    apiClient,
    refreshToken,
    checkAndRefreshToken,
    loginUser,
    registerUser,
    logout,
    getUserProfile,
    getOrders,
    createOrder,
    editOrder,
    getUserOrders,
    handleApiError,
};