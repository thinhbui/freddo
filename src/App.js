import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import AppNavigatorState from './AppNavigatorState';
import store from './store';

const persistor = persistStore(store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={<View />}>
                    <AppNavigatorState />
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('freddo', () => App);
export default App;
