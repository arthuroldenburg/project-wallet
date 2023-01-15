// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_ACTION, SPENDINGS_SAVE, SPENDING_DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.payload,
    };
  case SPENDINGS_SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SPENDING_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload.id),
    };
  default: return state;
  }
};

export default wallet;
