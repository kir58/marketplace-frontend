import React from 'react';
import { Container, Stack } from '@mui/material';
import { AppCustomBar } from './AppBar/AppBar';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Stack gap={4}>
    <AppCustomBar />
    <Container maxWidth={false}>{children}</Container>
  </Stack>
);
