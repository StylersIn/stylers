import {
    RSAA,
} from 'redux-api-middleware'
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../constants/ActionTypes';

export default store => next => action => {
    if (!store.getState().user.authenticated && !store.getState().styler.authenticated) {
        return next(action);
    }

    const rsaa = action[RSAA];
    if (rsaa) {
        return AsyncStorage.getItem(constants.TOKEN)
            .then(token => {
                rsaa.headers = Object.assign({}, rsaa.headers, {
                    'x-access-token': `${token}` || undefined
                });
                return action;
            }).then(next);
    }
    return next(action);

};