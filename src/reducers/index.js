// import { combineReducers } from 'redux';

import RootNavigator from '../RootNavigator';
import LoginReducer from './LoginReducer';
import TableReducer from './TableReducer';
import OrderReducer from './OrderReducer';
import MenuReducer from './MenuReducer';

const nav = (state, action) => {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
};
export default ({
    nav,
    LoginReducer,
    TableReducer,
    OrderReducer,
    MenuReducer
});
