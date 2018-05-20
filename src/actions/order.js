import types from '../ultils/constants/actionType';
import * as freedoAPI from '../services/freddoAPI';

// this.socket = io('http://192.168.13.103:3000', { jsonp: false });

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

const postOrder = (order, socket) => async dispatch => {
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
    socket.emit('change_order', 'hihi');
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

const getOrders = () => async dispatch => {
  const result = await freedoAPI.getOrders();
  console.log('getOrders', result);

  if (result.status === 200) {
    dispatch(getOrderSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const updateOrder = (order, socket) => async dispatch => {
  console.log('updateOrder', order);
  const orderObject = {
    ...order,
    table: order.table.toString(),
    listitems: JSON.stringify(order.listitems),
    amount: order.amount.toString(),
    discount: order.discount.toString(),
    total: order.total.toString(),
    custpaid: order.custpaid.toString(),
    payback: order.payback.toString()
  };
  const result = await freedoAPI.updateOrder(orderObject);
  if (result.status === 200) {
    if (socket) {
      console.log('thanhtoan', socket);
      socket.emit('thanhtoan', 'ahihi');
    }
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
  deleteOrder,
  addHistory
};
