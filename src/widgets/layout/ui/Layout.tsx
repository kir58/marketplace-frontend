import React from 'react';
import { Container, Stack } from '@mui/material';
import { AppCustomBar } from './AppBar/AppBar';
import { Copyright } from '@shared/shared/ui/Copyright';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Stack gap={4}>
    <AppCustomBar />
    <Container sx={{ marginTop: '64px', minHeight: '80vh' }} maxWidth={false}>
      {children}
    </Container>
    <Copyright sx={{ mt: 'auto' }} />
  </Stack>
);
