import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/auth`;

export const doLogin = credentials => (console.log(config.api),{
    [RSAA]: {
        endpoint: `${BASE_URL()}/authenticate`,
        method: 'POST',
        types: [
            constants.AUTH_USER,
            {
                type: constants.AUTH_USER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.AUTH_USER_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res
                    };
                }
            }
        ],
        body: JSON.stringify(credentials),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const verifySocialMediaLogin = email => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/verify/social`,
        method: 'POST',
        types: [
            constants.VERIFY_SOCIAL,
            {
                type: constants.VERIFY_SOCIAL_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.VERIFY_SOCIAL_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res
                    };
                }
            }
        ],
        body: JSON.stringify(email),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});