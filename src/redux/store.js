import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import combineReducers from '../redux/root-reducer';


const middleWares = [];

if(process.env.NODE_ENV === 'development'){
    middleWares.push(logger);
}

export const store = createStore(combineReducers, applyMiddleware(...middleWares));

export const persistor = persistStore(store);

export default {store , persistor};