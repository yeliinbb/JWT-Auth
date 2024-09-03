import { create } from 'zustand';

interface AuthUserStoreProps {
  isAuthenticated: boolean;
  user: {} | null;
  isLogin: (userInfo: {}) => void;
  isLogout: () => void;
  updateUser: (userInfo: {}) => void;
}

export const useAuthUserStore = create<AuthUserStoreProps>((set) => ({
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: null,
  isLogin: (userInfo) => set({ isAuthenticated: true, user: userInfo }),
  isLogout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem('accessToken');
  },
  updateUser: (userInfo) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userInfo } : null
    }));
  }
}));
