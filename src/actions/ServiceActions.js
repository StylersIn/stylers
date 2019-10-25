import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';

export const addService = credentials => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/service`,
        method: 'POST',
        types: [
            constants.ADD_SERVICE,
            {
                type: constants.ADD_SERVICE_SUCCESS,
                payload: (action, state, response) => response.json().then(credentials => (console.log(credentials), {
                    credentials,
                }))
            },
            {
                type: constants.ADD_SERVICE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
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

export const listService = (pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/services/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_SERVICE,
            {
                type: constants.LIST_SERVICE,
                payload: (action, state, response) => response.json().then(credentials => (console.log(credentials), {
                    credentials,
                }))
            },
            {
                type: constants.LIST_SERVICE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});