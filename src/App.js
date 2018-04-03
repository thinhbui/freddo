import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import thunkMiddleWare from 'redux-thunk';
import { Provider } from 'react-redux';

import AppNavigatorState from './AppNavigatorState';
// import store from './store';
import reducers from './reducers';

const config = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['navigation']
};

const persistReducer = persistCombineReducers(config, reducers);
const middleWare = [thunkMiddleWare];
const store = createStore(
    persistReducer,
    undefined,
    compose(
        applyMiddleware(...middleWare),
    )
);
const persistor = persistStore(store);
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <AppNavigatorState />
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('freddo', () => App);
export default App;
