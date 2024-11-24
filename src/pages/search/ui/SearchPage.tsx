import { AppCustomBar } from '@shared/widgets/appBar/ui/AppBar';
import * as React from 'react';
import { Container, Stack } from '@mui/material';
import { SearchProductsList } from '@shared/widgets/searchProducts';

export const SearchPage = () => {
  return (
    <Stack gap={4}>
      <AppCustomBar />
      <Container maxWidth={false}>
        <SearchProductsList />
      </Container>
    </Stack>
  );
};
