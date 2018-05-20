import types from '../ultils/constants/actionType';

const initialState = {
  history: [],
  personal: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NEW_HISTORY: {
      return { ...state, history: [...action.payload] };
    }
    case types.ADD_HISTORY: {
      console.log('ADD_HISTORY', action.payload);
      return {
        personal: [action.payload, ...state.personal],
        history: [action.payload, ...state.history]
      };
    }
    case types.GET_HISTORY_PERSONAL:
      return {
        ...state,
        personal: [...state.personal, ...action.payload]
      };
    case types.GET_HISTORY:
      return {
        ...state,
        history: [...state.history, ...action.payload]
      };
    default:
      return state;
  }
};
