import types from '../ultils/constants/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case types.LOGIN: {
      return { ...action.payload };
    }
    case types.LOGIN_ERROR: {
      return {};
    }
    case types.LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};
