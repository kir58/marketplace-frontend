export type RegistrationPayload = {
  email: string;
  password: string;
  username: string;
};

export type LoginPayload = {
  password: string;
  username: string;
  remember: boolean;
};

export type User = { username: string; email: string; id: number };
