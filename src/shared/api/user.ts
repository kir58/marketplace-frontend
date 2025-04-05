import axios from 'axios';

import { LoginPayload, RegistrationPayload, User } from '@shared/shared/model/user';

const API_URL = 'http://localhost:9090/api/auth';

const registration = async (payload: RegistrationPayload) =>
  await axios.post(`${API_URL}/register`, payload);

const login = async (payload: LoginPayload) => await axios.post(`${API_URL}/login`, payload);

const getUserByNameOrEmail = async (usernameOrEmail: string) =>
  await axios.get<User>(`${API_URL}/user/${usernameOrEmail}`);

export const userApi = {
  registration,
  login,
  getUserByNameOrEmail,
};
