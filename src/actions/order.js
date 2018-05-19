import types from '../ultils/constants/actionType';
import * as freedoAPI from '../services/freddoAPI';

const getOrderSuccess = item => ({ type: types.GET_ORDER, payload: item });

const updateSuccess = item => ({ type: types.UPDATE_ORDER, payload: item });

const postOrderSuccess = item => ({ type: types.ADD_ORDER, payload: item });

const deleteOrderSuccess = item => ({
  type: types.DELETE_ORDER,
  payload: item
});
const addHistory = item => ({ type: types.ADD_HISTORY, payload: item });
const getHistorySuccess = item => ({ type: types.GET_HISTORY, payload: item });
const getNewHistorySuccess = item => ({
  type: types.GET_NEW_HISTORY,
  payload: item
});
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

const postOrder = order => async dispatch => {
  console.log('order', order);
  // const orderPost = {
  //   user: order.user,
  //   table: order.table,
  //   listitems: JSON.stringify(order.listitems),
  //   amount: order.amount
  // };
  // console.log('orderPost', orderPost);
  const result = await freedoAPI.postOrder(order);
  if (result.status === 200) {
    console.log('postOrder', result.data);
    dispatch(postOrderSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const getHistory = (min, max) => async dispatch => {
  const result = await freedoAPI.getOldOrders(min, max);
  console.log('getHistories', result);

  if (result.status === 200) {
    dispatch(getHistorySuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const getNewHistory = (min, max) => async dispatch => {
  const result = await freedoAPI.getOldOrders(min, max);
  console.log('getHistories', result);

  if (result.status === 200) {
    dispatch(getNewHistorySuccess(result.data));
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
const deleteOrder = id => async dispatch => {
  console.log('deleteOrder', id);
  const result = await freedoAPI.deleteOrder(id);
  if (result.status === 200) {
    dispatch(deleteOrderSuccess(result.data));
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
  getHistory,
  changeQuantity,
  getNewHistory,
  deleteOrder,
  addHistory
};
