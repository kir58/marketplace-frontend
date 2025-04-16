// features/user/model/logout.ts

import { useUserStore } from './store';
import { userApi } from '@shared/shared/api/user';
import { useRouter } from 'next/router';

export const useLogout = () => {
  const logoutUser = useUserStore((state) => state.logoutUser);
  const router = useRouter();

  return async () => {
    try {
      await userApi.logout();
      logoutUser();
      router.push('/sign-in');
    } catch (err) {
      console.error('Ошибка при logout:', err);
    }
  };
};
