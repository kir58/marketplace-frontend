// pages/profile.tsx
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { userApi } from '@shared/shared/api/user';
import { Profile } from '@shared/pages/profile';
import { useUserStore } from '@shared/features/user/model/store';
import { User } from '@shared/shared/model/user';

interface ProfilePageProps {
  user: User | null;
  error: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, error }) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user); // Обновляем состояние в сторе
    }
  }, [user, setUser]);

  return <Profile user={user} error={error} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie || '';

  try {
    const user = await userApi.getUserProfile({
      headers: { cookie },
    });
    return { props: { user, error: null } };
  } catch (e) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
};

export default ProfilePage;
