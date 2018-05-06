import types from '../ultils/constants/actionType';

// import url from '../ultils/constants/api';
import { getMenus } from '../services/freddoAPI';
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
    dispatch(getItemSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};

export { getMenu };
