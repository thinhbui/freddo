import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import types from '../ultils/constants/actionType';
import * as freddoAPI from '../services/freddoAPI';
import { CONSTANST } from '../ultils/constants/String';

const loginSuccess = item => ({ type: types.LOGIN, payload: item });
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
    const decode = jwtDecode(result.data.token);
    decode.token = result.data.token;
    AsyncStorage.setItem(CONSTANST.USER, JSON.stringify(decode), (err, res) => {
      if (err) console.log(err);
      else console.log(res);
    });
    dispatch(loginSuccess(decode));
  } else {
    dispatch(loginError(result.response.data || result));
  }
};

export { login, logout, loginSuccess };
