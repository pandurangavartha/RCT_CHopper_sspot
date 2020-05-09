// import {createStore, applyMiddleware} from 'redux';
// import rootReducer from './reducers/index';
// import { createLogger } from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// import thunk from 'redux-thunk';
// const loggerMiddleware = createLogger();

// console.log('-------------6-----------StoreCreate.js------')

// export default function configureStore() {
//     return createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware
//     ))
// }


// // import { createStore } from 'redux'
// // import { persistStore, persistReducer } from 'redux-persist'
// // import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
// // import rootReducer from './reducers'
 
// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // }
 
// // const persistedReducer = persistReducer(persistConfig, rootReducer)
 
// // export default function configureStore(){
// //   let store = createStore(persistedReducer)
// //   let persistor = persistStore(store)
// //   return { store, persistor }
// // }

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';
const persistConfig = {
  key: 'root',
  storage: storage,
//   whitelist: ['login','loader'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };