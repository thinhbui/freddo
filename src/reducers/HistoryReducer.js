import types from '../ultils/constants/actionType';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NEW_HISTORY: {
      return [...action.payload];
    }
    case types.ADD_HISTORY: {
      console.log('ADD_HISTORY', action.payload);

      return [action.payload, ...state];
    }
    case types.GET_HISTORY:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
