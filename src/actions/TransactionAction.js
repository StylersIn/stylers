import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/transactions`;

export const listBanks = () => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/banks`,
        method: 'GET',
        types: [
            constants.LIST_BANKS,
            {
                type: constants.LIST_BANKS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.LIST_BANKS_FAILURE,
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

export const requestWithdrawal = (data) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/withdraw`,
        method: 'POST',
        types: [
            constants.REQUEST_WITHDRAWAL,
            {
                type: constants.REQUEST_WITHDRAWAL_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.REQUEST_WITHDRAWAL_FAILURE,
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
        body: JSON.stringify(data),
        credentials: "same-origin"
    }
});