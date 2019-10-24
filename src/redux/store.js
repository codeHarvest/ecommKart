import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import combineReducers from '../redux/root-reducer';


const middleWares = [logger];

const store = createStore(combineReducers, applyMiddleware(...middleWares));

export default store;