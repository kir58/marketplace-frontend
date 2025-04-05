// pages/user/[username].tsx

'use client';

import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { userApi } from '@shared/shared/api/user';
import { User } from '@shared/shared/model/user';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query; // Получаем параметр из URL

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (username) {
      // Делаем запрос для получения данных пользователя по имени
      userApi
        .getUserByNameOrEmail(username as string)
        .then((userData) => {
          setUser(userData.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Username not found');
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">
          Welcome, {user?.username}!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Email: {user?.email}
        </Typography>
      </Box>
    </Container>
  );
};

export default UserPage;
