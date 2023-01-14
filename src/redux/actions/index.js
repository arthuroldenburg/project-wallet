// Coloque aqui suas actions

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';

export const actionLogin = (email) => ({
  type: LOGIN_ACTION,
  email,
});

export const actionCurrencies = (currency) => ({
  type: CURRENCIES_ACTION,
  payload: currency,
});
