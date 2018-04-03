import { combineReducers } from 'redux';

import RootNavigator from '../RootNavigator';
// import StatusReducer from './StatusReducer';

const nav = (state, action) => {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
};
export default ({
    nav,
    // StatusReducer
});
