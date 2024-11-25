import { createEffect, createEvent, createStore } from 'effector';
import { products } from '@shared/shared/api';
import { SearchProductResponse } from '@shared/shared/model';

// Создаем событие для запуска поиска
export const searchProductsTriggered = createEvent<string>();

// Создаем эффект для выполнения запроса на сервер
export const searchProductsFx = createEffect(async (keyword: string) => {
  return await products.searchProducts(keyword);
});

// Создаем store для хранения состояния продуктов
export const $products = createStore<SearchProductResponse[]>([])
  .on(searchProductsFx.doneData, (_, products) => products)
  .reset(searchProductsTriggered); // Сброс store при новом поисковом запросе

// Store для статуса загрузки
export const $isLoading = searchProductsFx.pending;

// Store для сообщения об ошибке
export const $error = createStore<string | null>(null)
  .on(searchProductsFx.failData, (_, error) => error.message)
  .reset(searchProductsTriggered);

// Связываем событие `searchProductsTriggered` с запуском эффекта `searchProductsFx`
searchProductsTriggered.watch((keyword) => {
  searchProductsFx(keyword);
});
