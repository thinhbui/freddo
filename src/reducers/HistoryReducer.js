import types from '../ultils/constants/actionType';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_HISTORY:
       return [...action.payload];
    default:
      return state;
  }
};