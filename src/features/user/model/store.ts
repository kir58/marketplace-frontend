import { create } from 'zustand';
import { userApi } from '@shared/shared/api/user';
import { User } from '@shared/shared/model/user';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<User | null>;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logoutUser: () => set({ user: null }),

  fetchUser: async () => {
    try {
      const user = await userApi.getUserProfile();
      set({ user });
      return user;
    } catch (e) {
      set({ user: null });
      return null;
    }
  },
}));
