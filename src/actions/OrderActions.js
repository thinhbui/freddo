import types from '../ultils/constants/actionType';
import url from '../ultils/constants/api';
/*eslint-disable*/
const getOrderSuccess = item => ({ type: types.ADD_ORDER, payload: item });

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
const resetOrder = () => ({ type: types.RESET_ORDER });
const error = err => {
  console.log('Order Error', err);
  return { type: types.ITEM_HAS_ERROR };
};
const deleteItemOrder = index => ({
  type: types.DELETE_ORDER_ITEM,
  payload: index
});
const addOrder = order => dispatch => {
  const api = url.postOrder;
  fetch(api, {
    method: 'POST',
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then(res => dispatch())
    .catch(err => dispatch(error(err)));
};
const postOrder = order => dispatch => {
  const api = url.postOrder;
  // console.log('postOrder', order);
  const result = fetch(api, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });
  result
    .then(res => res.json())
    .then(res => {
      dispatch(postOrderSuccess(res));
    })
    .catch(err => dispatch(error(err)));
  return result;
};

const getHistories = (username, min, max) => dispatch => {
  const api = url.getHistory(username, min, max);
  // console.log(api);
  // 
  const result = fetch(api, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      // console.log(res);
      dispatch(getHistorySuccess(res));
    });
};
const getOrder = id => dispatch => {
  const api = url.getOrder(id);
  console.log('getOrder', api);
  fetch(api, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(res => {
      dispatch(getOrderSuccess(res));
    })
    .catch(err => dispatch(error(err)));
};
const updateOrder = order => dispatch => {
  const apiUpdate = url.updateOrder(order.id);
  console.log('apiUpdate', apiUpdate);
  console.log('updateOrder', JSON.stringify(order));
  fetch(apiUpdate, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(response => response.json())
    .then(res => {
      console.log('getOrder', res);
      dispatch(updateSuccess(res));
    })
    .catch(err => dispatch(error(err)));
};
export {
  getOrder,
  updateOrder,
  addNewOrder,
  addOrderItem,
  addOrder,
  postOrder,
  deleteItemOrder,
  resetOrder,
  getHistories
};
