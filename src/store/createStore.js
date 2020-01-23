import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunkMiddleware from "redux-thunk";
import {
    apiMiddleware
} from 'redux-api-middleware';
import appReducer from '../reducers/index';
import sessionValidator from '../middlewares/sessionValidator';
import defaultState from '../reducers/DefaultState';
import * as constants from '../constants/ActionTypes';

function rootReducer(state, action) {
    if (action.type == constants.LOGOUT) {
        if (action.payload === 'loggedOut') {
            state = {};
        }

        // AsyncStorage.clear();
    }
    return appReducer(state, action)
}

const enhancers = compose(applyMiddleware(thunkMiddleware, sessionValidator, apiMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;