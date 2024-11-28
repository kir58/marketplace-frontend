// cartStore.ts
import { createEffect, createEvent, createStore, sample } from 'effector';
import { SearchProductResponse } from '@shared/shared/model';

export interface CartItem {
  product: SearchProductResponse;
  quantity: number;
}

export const addToCart = createEvent<SearchProductResponse>();
export const removeFromCart = createEvent<string>(); // по ID продукта
export const increaseQuantity = createEvent<string>();
export const decreaseQuantity = createEvent<string>();
export const clearCart = createEvent();

export const loadCartFromLocalStorage = createEvent();

export const $cart = createStore<CartItem[]>([], { sid: 'cart' })
  .on(addToCart, (state, product) => {
    const existingItem = state.find((item) => item.product.id === product.id);
    if (existingItem) {
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
  .on(loadCartFromLocalStorage, () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  })
  .reset(clearCart);

export const saveCartFx = createEffect((cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
});

sample({
  clock: $cart,
  target: saveCartFx,
});
