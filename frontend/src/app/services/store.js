import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useAuthStore = create(
        persist(
            (set) => ({
                user: null,
                orders: [],
                login: (userData) => set({user: {...userData, userId: userData.userId || null}}),
                register: (userData) => set({user: {...userData, userId: userData.userId || null}}),
                logout: () => (set({user: null, orders: []})),
                addToOrder: (item) => set((state) => ({orders: [...state.orders, item]})),
                clearOrders:
                    () => set({orders: []}),
            }),
            {
                name: 'auth-storage',
                getStorage:
                    () => localStorage,
            }
        )
    )
;

export default useAuthStore;
