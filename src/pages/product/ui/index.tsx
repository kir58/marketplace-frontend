import { SearchProductResponse } from '@shared/shared/model';
import * as React from 'react';
import { ProductItem } from './ProductItem';
import { Layout } from '@shared/widgets/layout';

type Props = { product: SearchProductResponse };

export const Product = ({ product }: Props) => (
  <Layout>
    <ProductItem product={product} />
  </Layout>
);
