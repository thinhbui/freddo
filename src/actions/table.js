import types from '../ultils/constants/actionType';
import { getTables, updateTables } from '../services/freddoAPI';
import socket from '../services/socket';
import { SOCKET_EVENT, STATUS_TABLE } from '../ultils/constants/String';

const getTableSuccess = item => ({ type: types.GET_TABLE, payload: item });
const updateTableSuccess = item => ({
  type: types.UPDATE_TABLE,
  payload: item
});

const error = err => ({ type: types.ITEM_HAS_ERROR, payload: err });

const getTable = () => async dispatch => {
  const result = await getTables();
  console.log('getTable', result);
  if (result.status === 200) {
    dispatch(getTableSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};
const updateTable = table => async dispatch => {
  console.log(table);
  const result = await updateTables(table);
  console.log('updateTable', result);

  if (result.status === 200) {
    if (result.data.status === STATUS_TABLE.REQUEST)
      socket.emit(SOCKET_EVENT.INVOICE_REQUEST, table);
    dispatch(updateTableSuccess(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};

export { getTable, updateTable, updateTableSuccess };
