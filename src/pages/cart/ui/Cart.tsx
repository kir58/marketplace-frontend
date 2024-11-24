import { useState } from 'react';
import CartItem from '@shared/pages/cart/ui/CartItem';
import { AppCustomBar } from '@shared/widgets/appBar/ui/AppBar';
import * as React from 'react';
import { Container } from '@mui/material';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    { id: '1', name: 'Product 1', price: 20.0, quantity: 1 },
    { id: '2', name: 'Product 2', price: 30.0, quantity: 2 },
  ]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <AppCustomBar />
      <Container maxWidth={false}>
        <h1>Your Cart</h1>
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <h2>Total: {total} USD</h2>
        </div>
        <button>Proceed to Checkout</button>
      </Container>
    </div>
  );
};
