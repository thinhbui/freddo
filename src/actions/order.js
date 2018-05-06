import types from '../ultils/constants/actionType';
import * as freedoAPI from '../services/freddoAPI';
import { updateTable } from '.';

const getOrderSuccess = item => ({ type: types.GET_ORDER, payload: item });

const updateSuccess = item => ({ type: types.UPDATE_ORDER, payload: item });

const postOrderSuccess = item => ({ type: types.ADD_ORDER, payload: item });

const getHistorySuccess = item => ({ type: types.GET_HISTORY, payload: item });

const addNewOrder = () => ({
  type: types.ADD_NEW_ORDER
});
const addOrderItem = payload => ({
  type: types.ADD_NEW_ITEM_ORDER,
  payload
});
const changeQuantity = item => ({
  type: types.CHANGE_ORDER_QUANTITY,
  payload: item
});
const resetOrder = () => ({ type: types.RESET_ORDER });
const error = err => {
  console.log('Order Error', err);
  return { type: types.ITEM_HAS_ERROR };
};
const deleteItemOrder = index => ({
  type: types.DELETE_ORDER_ITEM,
  payload: index
});

const postOrder = (order, table) => async dispatch => {
  const result = await freedoAPI.postOrder(order);
  console.log('postOrder', result);

  if (result.status === 200) {
    const orderResult = result.data;
    const tableUpdate = { ...table, orderid: orderResult.id, status: true };
    dispatch(postOrderSuccess(orderResult));
    dispatch(updateTable(tableUpdate));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const getHistories = (username, min, max) => async dispatch => {
  const result = await freedoAPI.getOldOrders(min, max);
  console.log('getHistories', result);

  if (result.status === 200) {
    dispatch(getHistorySuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const getOrders = () => async dispatch => {
  const result = await freedoAPI.getOrders();
  console.log('getOrders', result);

  if (result.status === 200) {
    dispatch(getOrderSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const updateOrder = order => async dispatch => {
  console.log('updateOrder', order);
  const result = await freedoAPI.updateOrder(order);
  if (result.status === 200) {
    dispatch(updateSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
export {
  getOrders,
  updateOrder,
  addNewOrder,
  addOrderItem,
  postOrder,
  deleteItemOrder,
  resetOrder,
  getHistories,
  changeQuantity
};
