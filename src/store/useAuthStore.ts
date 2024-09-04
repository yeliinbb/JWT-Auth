import { create } from 'zustand';

interface AuthUserStoreProps {
  isAuthenticated: boolean;
  user: {} | null;
  isLogin: () => void;
  isLogout: () => void;
  // updateUser: (userInfo: {}) => void;
}

export const useAuthStore = create<AuthUserStoreProps>((set) => ({
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: null,
  isLogin: () => set({ isAuthenticated: true }),
  isLogout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem('accessToken');
  }
  // updateUser: (userInfo) => {
  //   set((state) => ({
  //     user: state.user ? { ...state.user, ...userInfo } : null
  //   }));
  // }
}));
