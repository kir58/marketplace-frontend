import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import * as React from 'react';
import { useUnit } from 'effector-react/effector-react.umd';
import { $cart, CartItem } from '@shared/features/cart';
import Link from 'next/link';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const getCartItemsCount = (cartsItems: CartItem[]) => {
  if (cartsItems.length === 0) {
    return null;
  }

  return cartsItems.reduce((acc, { quantity }) => acc + quantity, 0);
};

export const CartIconButton = () => {
  const cartItems = useUnit($cart);
  const cartCount = getCartItemsCount(cartItems);

  return (
    <IconButton size="large" aria-label="show cart" color="inherit" component={Link} href="/cart">
      <Badge badgeContent={cartCount} color="error">
        <ShoppingBasketIcon />
      </Badge>
    </IconButton>
  );
};
