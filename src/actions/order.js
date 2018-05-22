import types from '../ultils/constants/actionType';
import * as freedoAPI from '../services/freddoAPI';
import socket from '../services/socket';
import { SOCKET_EVENT } from '../ultils/constants/String';

/* eslint no-underscore-dangle: 0 */

const getOrderSuccess = item => ({ type: types.GET_ORDER, payload: item });

const updateSuccess = item => ({ type: types.UPDATE_ORDER, payload: item });

const postOrderSuccess = item => ({ type: types.ADD_ORDER, payload: item });

const deleteOrderSuccess = item => ({
  type: types.DELETE_ORDER,
  payload: item
});
const addHistory = item => ({ type: types.ADD_HISTORY, payload: item });
const addHistoryPersonal = item => ({
  type: types.ADD_HISTORY_PERSONAL,
  payload: item
});
const getHistorySuccess = item => ({ type: types.GET_HISTORY, payload: item });
const getHistoryPersonal = item => ({
  type: types.GET_HISTORY_PERSONAL,
  payload: item
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
  const orderObject = {
    ...order,
    amount: order.amount.toString(),
    listitems: JSON.stringify(order.listitems)
  };
  console.log('orderObject', orderObject);
  const result = await freedoAPI.postOrder(orderObject);
  if (result.status === 200) {
    result.data.tablename = order.tablename;
    console.log('postOrder', result.data);
    socket.emit(SOCKET_EVENT.INVOICE_UPDATE, result.data);
    dispatch(postOrderSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const getHistory = (page, perPage) => async dispatch => {
  const result = await freedoAPI.getOldOrders(page, perPage);
  console.log('getHistories', result);

  if (result.status === 200) {
    dispatch(
      getHistorySuccess(
        result.data.sort((a, b) => (a.billdate > b.billdate ? -1 : 1))
      )
    );
  } else {
    dispatch(error(result.response.data || result));
  }
};
const getHistoryByUser = (page, perPage, userId) => async dispatch => {
  const result = await freedoAPI.getOldOrders(page, perPage, userId);
  console.log('getHistories', result);

  if (result.status === 200) {
    dispatch(
      getHistoryPersonal(
        result.data.sort((a, b) => (a.billdate > b.billdate ? -1 : 1))
      )
    );
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
  const orderObject = {
    ...order,
    id: order._id,
    listitems: JSON.stringify(order.listitems),
    amount: order.amount.toString(),
    discount: order.discount.toString(),
    total: order.total.toString(),
    custpaid: order.custpaid.toString(),
    payback: order.payback.toString()
  };
  console.log('orderObject', orderObject);

  const result = await freedoAPI.updateOrder(orderObject);
  if (result.status === 200) {
    console.log('updateOrder', result.data);
    socket.emit(SOCKET_EVENT.INVOICE_UPDATE, result.data);
    result.data.tablename = order.tablename;
    dispatch(updateSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const deleteOrder = order => async dispatch => {
  console.log('deleteOrder', order);
  const result = await freedoAPI.deleteOrder(order._id);
  if (result.status === 200) {
    console.log('deleteOrder', result);
    dispatch(deleteOrderSuccess(order));
  } else {
    dispatch(error(result.response.data || result));
  }
};
export {
  getOrders,
  updateOrder,
  postOrderSuccess,
  addOrderItem,
  postOrder,
  deleteItemOrder,
  resetOrder,
  getHistory,
  changeQuantity,
  deleteOrderSuccess,
  deleteOrder,
  addHistory,
  updateSuccess,
  getHistoryByUser,
  addHistoryPersonal
};
