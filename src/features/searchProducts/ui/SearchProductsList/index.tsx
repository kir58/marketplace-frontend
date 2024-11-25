import { useUnit } from 'effector-react';
import { $error, $isLoading, $products } from '@shared/features/appBar/model/searchModel';

import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ProductItem } from '@shared/features/searchProducts/ui/SearchProductsList/ProductItem';

export const SearchProductsList = () => {
  const products = useUnit($products);
  const isLoading = useUnit($isLoading);
  const error = useUnit($error);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      {products && products.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Box>
      ) : (
        !isLoading && <Typography>No products found.</Typography>
      )}
    </>
  );
};
