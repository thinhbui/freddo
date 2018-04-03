// import { createStore, applyMiddleware, compose } from 'redux';
// // import { AsyncStorage } from 'react-native';

// // import { REHYDRATE, PURGE, persistCombineReducers, autoRehydrate } from 'redux-persist';

// import thunkMiddleWare from 'redux-thunk';
// import reducers from './reducers';

// // const config = {
// //     key: 'primary',
// //     storage: AsyncStorage
// // };

// // const reducer = persistCombineReducers(config, reducers);
// const middleWare = [thunkMiddleWare];
// const store = createStore(
//     reducers,
//     {},
//     compose(
//         applyMiddleware(...middleWare),
//     )
// );
// export default store;
