import { SearchProductResponse } from '@shared/shared/model/products';
import { Container, Stack } from '@mui/material';
import { AppCustomBar } from '@shared/widgets/appBar/ui/AppBar';
import * as React from 'react';
import { ProductItem } from './ProductItem';

type Props = { product: SearchProductResponse };

export const Product = ({ product }: Props) => {
  return (
    <Stack gap={4}>
      <AppCustomBar />
      <Container maxWidth={false}>
        <ProductItem product={product} />
      </Container>
    </Stack>
  );
};
