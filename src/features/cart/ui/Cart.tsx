import React from 'react';
import { Typography, Button, Box, Card, CardContent, Stack, CardActions } from '@mui/material';

import { useUnit } from 'effector-react/effector-react.umd';
import { $cart } from '../model/cartStore';
import { CartItem } from './CartItem';

export const Cart: React.FC = () => {
  const cartItems = useUnit($cart);
  const total = cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const goodsCount = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length > 0 ? (
        <>
          <Stack direction="row" spacing={2}>
            <Box flexGrow={1}>
              <Card sx={{ padding: 2 }}>
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </Card>
            </Box>

            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your cart: Goods({goodsCount})
                </Typography>
                <Typography variant="h5" color="primary">
                  Total: ${total.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" fullWidth>
                  Go to purchase
                </Button>
              </CardActions>
            </Card>
          </Stack>

          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          ></Box>
        </>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </>
  );
};
