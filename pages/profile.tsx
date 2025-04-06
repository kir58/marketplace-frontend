import React from 'react';
import { GetServerSideProps } from 'next';
import { userApi } from '@shared/shared/api/user';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

interface User {
  username: string;
  email: string;
}

interface ProfilePageProps {
  user: User | null;
  error: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, error }) => {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Profile Information</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      {/* Можно добавить другие данные пользователя */}
    </Box>
  );
};

// Получаем данные пользователя на сервере
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Делаем запрос для получения данных текущего пользователя
    const response = await userApi.getUserProfile(); // Запрос для получения данных текущего пользователя
    return {
      props: {
        user: response.data,
        error: null,
      },
    };
  } catch (err: any) {
    return {
      props: {
        user: null,
        error: `Failed to load user data ${err?.message}`,
      },
    };
  }
};

export default ProfilePage;
