import axios from 'axios';

import { RegistrationPayload } from '@shared/shared/model/user';

const API_URL = 'http://localhost:9090/api/auth/register';

const registration = async (payload: RegistrationPayload) => await axios.post(API_URL, payload);

export const user = {
  registration,
};
