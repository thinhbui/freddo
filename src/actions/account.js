// import moment from 'moment';
import types from '../ultils/constants/actionType';
import url from '../ultils/constants/api';
import * as freddoAPI from '../services/freddoAPI';

const loginSuccess = item => ({ type: types.LOGIN, payload: item });

// const getTokenSuccess = item => ({ type: types.TOKEN, payload: item });

const loginError = err => {
  console.log('Login Error', err);
  return { type: types.LOGIN_ERROR, payload: null };
};
const logout = () => {
  console.log('Login out');
  return { type: types.LOGOUT, payload: null };
};
const login = (username, password) => async dispatch => {
  const result = await freddoAPI.login(username, password);
  console.log(result);
  if (result.status === 200) {
    dispatch(loginSuccess(result.data));
  } else {
    dispatch(loginError(result.response.data || result));
  }
};

export { login, logout };
