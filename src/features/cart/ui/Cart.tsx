import React from 'react';
import { Typography, Button, Box, Divider } from '@mui/material';

import { useUnit } from 'effector-react';
import { $cart, clearCart } from '../model/cartStore';
import { CartItem } from './CartItem';

export const Cart: React.FC = () => {
  const cartItems = useUnit($cart);
  const total = cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </>
  );
};
