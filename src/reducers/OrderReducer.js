import types from '../ultils/constants/actionType';

// const initialState = [];

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_ORDER: {
      console.log('ADD_ORDER', action.payload);
      return [...state, action.payload];
    }
    case types.UPDATE_ORDER: {
      console.log('UPDATE_ORDER', state);
      const index = state.findIndex(item => item.id === action.payload.id);
      state.splice(index, 1, action.payload);
      return [...state];
    }
    case types.GET_ORDER: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
