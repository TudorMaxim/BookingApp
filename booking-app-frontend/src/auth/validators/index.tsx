export type Validator = (input: string) => boolean;

export const emailValidator: Validator = (email) => (
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
);

export const usernameValidator: Validator = (username) => (
  username !== ''
);

export const passwordValidator: Validator = (password) => (
  password.length > 7
);
