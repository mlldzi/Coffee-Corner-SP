import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: { ...userData, userId: userData.userId || null } }),
      register: (userData) => set({ user: { ...userData, userId: userData.userId || null } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;