interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartItem = ({ item }: { item: CartProduct }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <span>{item.price} USD</span>
      <span>Quantity: {item.quantity}</span>
    </div>
  );
};

export default CartItem;
