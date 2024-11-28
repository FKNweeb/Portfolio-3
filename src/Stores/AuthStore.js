import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  toggleIsLoggedIn: (value) => set((state) => ({ isLoggedIn: value ? value : !state.isLoggedIn })),
}));

export default useAuthStore;
