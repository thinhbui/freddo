import types from '../ultils/constants/actionType';

// const initialState = [];
/* eslint no-underscore-dangle: 0 */
export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_ORDER: {
      console.log('ADD_ORDER', action.payload);
      return [action.payload, ...state];
    }
    case types.UPDATE_ORDER: {
      console.log('UPDATE_ORDER', action.payload);
      const index = state.findIndex(item => item._id === action.payload._id);
      state.splice(index, 1, action.payload);
      return [...state];
    }
    case types.DELETE_ORDER: {
      const index = state.indexOf(action.payload);
      console.log('index', index);
      console.log('DELETE_ORDER', action.payload);
      if (index !== -1) state.splice(index, 1);
      // console.log('DELETE_ORDER', state);

      return [...state];
    }
    case types.GET_ORDER: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
