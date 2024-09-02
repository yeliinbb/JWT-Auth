import { create } from 'zustand';

type useAuthStore = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: {} | null;
};

export const useAuthStore = create<useAuthStore>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  //   login: () =>
  //     set({ isAuthenticated: true, accessToken: token, user: userInfo }),
  logout: () => set({ isAuthenticated: false, accessToken: null, user: null })
}));
