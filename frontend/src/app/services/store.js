// services/store.js
import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
    user: null,
    orders: [],
    login: (userData) => set({ user: { ...userData, userId: userData.userId || null } }),
    register: (userData) => set({ user: { ...userData, userId: userData.userId || null } }),
    logout: () => {
        set({ user: null, orders: [] });
        Cookies.remove('csrf_access_token');
        Cookies.remove('csrf_refresh_token');
    },
    addToOrder: (item) => set((state) => ({ orders: [...state.orders, item] })),
    clearOrders: () => set({ orders: [] }),
    removeOrder: (index) => set((state) => ({
        orders: state.orders.filter((_, i) => i !== index)
    })),
}));

export default useAuthStore;
