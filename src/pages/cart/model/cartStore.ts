// cartStore.ts
import { createEvent, createStore } from 'effector';
import { SearchProductResponse } from '@shared/shared/model/products';

// Тип для элемента корзины
interface CartItem {
  product: SearchProductResponse;
  quantity: number;
}

// События для управления корзиной
export const addToCart = createEvent<SearchProductResponse>();
export const removeFromCart = createEvent<string>(); // по ID продукта
export const increaseQuantity = createEvent<string>();
export const decreaseQuantity = createEvent<string>();
export const clearCart = createEvent();

// Стор корзины, начальное состояние - пустой массив
export const $cart = createStore<CartItem[]>([])
  .on(addToCart, (state, product) => {
    const existingItem = state.find((item) => item.product.id === product.id);
    if (existingItem) {
      // Увеличиваем количество, если товар уже в корзине
      return state.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    }

    return [...state, { product, quantity: 1 }];
  })
  .on(removeFromCart, (state, productId) => state.filter((item) => item.product.id !== productId))
  .on(increaseQuantity, (state, productId) =>
    state.map((item) =>
      item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
    ),
  )
  .on(decreaseQuantity, (state, productId) =>
    state.map((item) =>
      item.product.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    ),
  )
  .reset(clearCart);
