import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/services`;

export const addService = credentials => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}`,
        method: 'POST',
        types: [
            constants.ADD_SERVICE,
            {
                type: constants.ADD_SERVICE_SUCCESS,
                payload: (action, state, response) => response.json().then(credentials => ({
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
        endpoint: `${BASE_URL()}/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_SERVICE,
            {
                type: constants.LIST_SERVICE_SUCCESS,
                payload: (action, state, response) => response.json().then(credentials => ({
                    credentials,
                }))
            },
            {
                type: constants.LIST_SERVICE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res && res.status
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

export const getSubServices = (serviceId) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/sub/${serviceId}`,
        method: 'GET',
        types: [
            constants.LIST_SUB_SERVICE,
            {
                type: constants.LIST_SUB_SERVICE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.LIST_SUB_SERVICE_FAILURE,
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

export const filterService = (queryParam) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/search?service=${queryParam}`,
        method: 'GET',
        types: [
            constants.FILTER_SERVICE,
            {
                type: constants.FILTER_SERVICE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.FILTER_SERVICE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export function resetFilter() {
    return (dispatch, store) => {
        dispatch({
            type: constants.RESET_SEARCH,
        })
    }
}