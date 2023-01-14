// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  user: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      email: action.email,
    };
  default: return state;
  }
};

export default user;
