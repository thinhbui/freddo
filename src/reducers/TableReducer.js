import types from '../ultils/constants/actionType';
/* eslint no-underscore-dangle: 0 */
export default (state = [], action) => {
  switch (action.type) {
    case types.ITEM_HAS_ERROR: {
      return state || undefined;
    }
    case types.UPDATE_TABLE: {
      const index = state.findIndex(item => item._id === action.payload._id);
      state.splice(index, 1, action.payload);
      return [...state];
    }
    case types.GET_TABLE: {
      // console.log('GET_TABLE', [...action.payload]);
      return [...action.payload];
    }
    default:
      return state;
  }
};
