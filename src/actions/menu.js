import { AsyncStorage } from 'react-native';
import types from '../ultils/constants/actionType';

// import url from '../ultils/constants/api';
import { getMenus } from '../services/freddoAPI';
import { STORAGE } from '../ultils/constants/String';
/*eslint-disable*/
const getItemSuccess = item => {
  // console.log(item);
  return { type: types.GET_MENU, payload: item };
};

const error = err => {
  console.log('Login Error', err);
  return { type: types.ITEM_HAS_ERROR };
};

const getMenu = () => async dispatch => {
  const result = await getMenus();
  console.log(result);
  if (result.status === 200) {
    AsyncStorage.setItem(STORAGE.MENU, JSON.stringify(result.data));
    dispatch(getItemSuccess(result.data));
    As;
  } else {
    dispatch(error(result.response.data || result));
  }
};

export { getMenu, getItemSuccess };
