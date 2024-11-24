import { useState } from 'react';
import CartItem from '../components/CartItem';
import styles from '../styles/Cart.module.css';
import { ResponsiveAppBar } from "@shared/widgets/appBar/ui/AppBar";

interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    { id: '1', name: 'Product 1', price: 20.0, quantity: 1 },
    { id: '2', name: 'Product 2', price: 30.0, quantity: 2 },
  ]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.cart}>
      <ResponsiveAppBar />
      <h1>Your Cart</h1>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.total}>
        <h2>Total: {total} USD</h2>
      </div>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
