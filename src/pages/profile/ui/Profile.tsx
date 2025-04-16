import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Layout } from '@shared/widgets/layout';
import { User } from '@shared/shared/model/user';

interface ProfilePageProps {
  user: User | null;
  error: string | null;
}

export const Profile: React.FC<ProfilePageProps> = ({ user, error }) => {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4">Profile Information</Typography>
        <Typography variant="h6">Username: {user.username}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Box>
    </Layout>
  );
};
