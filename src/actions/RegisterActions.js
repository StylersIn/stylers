import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';

export const doRegister = details => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/auth/register`,
        method: 'POST',
        types: [
            constants.AUTH_USER,
            {
                type: constants.AUTH_USER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.AUTH_USER_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        body: JSON.stringify(details),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});