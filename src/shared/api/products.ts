import axios, { AxiosResponse } from 'axios';
import { SearchProductResponse } from '@shared/shared/model';

const API_URL = 'http://localhost:8080/api/products'; // Замените на URL вашего API

const getAllProducts = async () => await axios.get<SearchProductResponse[]>(API_URL);

const getProductById = async (productId: string) =>
  await axios.get<SearchProductResponse>(`${API_URL}/${productId}`);

const searchProducts = async (keyword: string | string[]): Promise<SearchProductResponse[]> => {
  const response: AxiosResponse<SearchProductResponse[]> = await axios.get(`${API_URL}/search`, {
    params: { keyword },
  });

  // Возвращаем только данные (массив продуктов)
  return response.data;
};

export const products = {
  getAllProducts,
  getProductById,
  searchProducts,
};
