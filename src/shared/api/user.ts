import api from './axios';

import { LoginPayload, RegistrationPayload, User } from '@shared/shared/model/user';
import { AxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:9090/api/auth';

const registration = async (payload: RegistrationPayload) =>
  await api.post(`${API_URL}/register`, payload);

const login = async (payload: LoginPayload) => await api.post(`${API_URL}/login`, payload);

const getUserByNameOrEmail = async (usernameOrEmail: string) =>
  await api.get<User>(`${API_URL}/user/${usernameOrEmail}`);

const getUserProfile = async (config?: AxiosRequestConfig) => {
  const response = await api.get('/users/profile', config);
  return response.data;
};

const logout = () => api.post('/auth/logout');

export const userApi = {
  registration,
  login,
  getUserByNameOrEmail,
  getUserProfile,
  logout,
};
