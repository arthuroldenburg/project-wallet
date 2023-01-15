// Coloque aqui suas actions

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';
export const SPENDINGS_SAVE = 'SPENDINGS_SAVE';
export const SPENDING_DELETE = 'SPENDING_DELETE';

export const actionLogin = (email) => ({
  type: LOGIN_ACTION,
  email,
});

export const actionCurrencies = (currency) => ({
  type: CURRENCIES_ACTION,
  payload: currency,
});

export const spendingsSave = (state) => ({
  type: SPENDINGS_SAVE,
  payload: state,
});

export const spendingDelete = (expense) => ({
  type: SPENDING_DELETE,
  payload: expense,
});
