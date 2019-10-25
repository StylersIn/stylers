import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/StylerAuth`;

export const addStyler = credentials => (console.log(credentials), {
    [RSAA]: {
        endpoint: `${BASE_URL()}/register`,
        method: 'POST',
        types: [
            constants.ADD_STYLER,
            {
                type: constants.ADD_STYLER_SUCCESS,
                payload: (action, state, response) => response.json().then(credentials => ({
                    credentials,
                }))
            },
            {
                type: constants.ADD_STYLER_FAILURE,
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

export const listStylers = (pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/stylers/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_STYLER,
            {
                type: constants.LIST_STYLER,
                payload: (action, state, response) => response.json().then(credentials => ({
                    credentials,
                }))
            },
            {
                type: constants.LIST_STYLER,
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

export const getServiceStylers = (service, pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/${service}/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_SERVICE_STYLER,
            {
                type: constants.LIST_SERVICE_STYLER,
                payload: (action, state, response) => response.json().then(response => {
                    return { response }
                })
            },
            {
                type: constants.LIST_SERVICE_STYLER,
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