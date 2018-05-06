import types from '../ultils/constants/actionType';
import { getTables, updateTables } from '../services/freddoAPI';

const getTableSuccess = item => ({ type: types.GET_TABLE, payload: item });
const update = item => ({ type: types.UPDATE_TABLE, payload: item });

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
  const result = await updateTables(table);
  console.log('updateTable', result);

  if (result.status === 200) {
    dispatch(update(result.data));
  } else {
    dispatch(error(result.response.data || result));
  }
};

export { getTable, updateTable };
