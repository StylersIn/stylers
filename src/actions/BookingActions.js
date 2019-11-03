import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/auth`;

export const updatePrice = price => {
    return {
        type: constants.UPDATE_PRICE,
        payload: price,
    }
};