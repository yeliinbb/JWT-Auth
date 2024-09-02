import { create } from 'zustand';

interface useAuthStoreProps {
  isAuthenticated: boolean;
  isLogin: (userInfo: {}) => void;
  isLogout: () => void;
}

export const useAuthStore = create<useAuthStoreProps>((set) => ({
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isLogin: () => set({ isAuthenticated: true }),
  isLogout: () => {
    set({ isAuthenticated: false });
    localStorage.clear();
  }
}));
