import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers.js';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
		promiseMiddleware,
        createLogger(),
    )
);
persistStore(store);
export default store;
