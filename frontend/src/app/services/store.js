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
    addToOrder: (item) => set((state) => {
        const existingOrder = state.orders.find(order => order.name === item.name);
        if (existingOrder) {
            return {
                orders: state.orders.map(order => 
                    order.name === item.name ? { ...order, quantity: order.quantity + 1 } : order
                )
            };
        } else {
            return { orders: [...state.orders, { ...item, quantity: 1 }] };
        }
    }),
    updateOrderQuantity: (itemName, quantity) => set((state) => ({
        orders: state.orders.map(order => 
            order.name === itemName ? { ...order, quantity: Math.max(0, order.quantity + quantity) } : order
        ).filter(order => order.quantity > 0)
    })),
    clearOrders: () => set({ orders: [] }),
    removeOrder: (itemName) => set((state) => ({
        orders: state.orders.filter(order => order.name !== itemName)
    })),
}));

export default useAuthStore;