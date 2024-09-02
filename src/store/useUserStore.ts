import { create } from 'zustand';

interface useUserStoreProps {
  user: {} | null;
  setUser: (userInfo: {}) => void;
}

export const useUserStore = create<useUserStoreProps>((set) => ({
  user: null,
  setUser: (userInfo) => set({ user: userInfo })
}));
