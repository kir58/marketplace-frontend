import { AppCustomBar } from '@shared/widgets/appBar/ui/AppBar';
import * as React from 'react';
import { Container, Stack } from '@mui/material';

export const Home = () => {
  return (
    <Stack gap={4}>
      <AppCustomBar />
      <Container>
        <div>Здесь могла бы быть ваша реклама</div>
      </Container>
    </Stack>
  );
};
