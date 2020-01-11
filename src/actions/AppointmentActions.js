import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/appointment`;

export const listAppointments = (pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/user/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_APPOINTMENT,
            {
                type: constants.LIST_APPOINTMENT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.LIST_APPOINTMENT_ERROR,
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

export const listStylerRequests = (pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/styler/requests/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_REQUESTS,
            {
                type: constants.LIST_REQUESTS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.LIST_REQUESTS_ERROR,
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

export const listStylerAppointments = (pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/styler/${pageSize}/${pageNumber}`,
        method: 'GET',
        types: [
            constants.LIST_APPOINTMENT,
            {
                type: constants.LIST_APPOINTMENT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.LIST_APPOINTMENT_ERROR,
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

export const saveAppointment = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}`,
        method: 'POST',
        types: [
            constants.ADD_APPOINTMENT,
            {
                type: constants.ADD_APPOINTMENT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.ADD_APPOINTMENT_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        body: JSON.stringify(data),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const updateDate = date => {
    return {
        type: constants.UPDATE_DATE,
        payload: date,
    }
};

export const updateLocation = location => {
    return {
        type: constants.UPDATE_LOCATION,
        payload: location,
    }
};

export const acceptAppointment = appointmentId => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/appointment/accept`,
        method: 'PUT',
        types: [
            constants.ACCEPT_APPOINTMENT,
            {
                type: constants.ACCEPT_APPOINTMENT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.ACCEPT_APPOINTMENT_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        body: JSON.stringify({ appointmentId }),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const completeService = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/appointment/complete`,
        method: 'PUT',
        types: [
            constants.COMPLETE_APPOINTMENT,
            {
                type: constants.COMPLETE_APPOINTMENT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.COMPLETE_APPOINTMENT_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        body: JSON.stringify(data),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});