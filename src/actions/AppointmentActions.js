import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/appointment`;

export const listAppointments = (pageNumber = 1, pageSize = 10) => ({
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

export const listStylerRequests = (pageNumber = 1, pageSize = 10) => ({
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

export const listStylerAppointments = (pageNumber = 1, pageSize = 10) => ({
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

export const updateAppointmentStatus = (data, status) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/appointment/status/${status}`,
        method: 'PUT',
        types: [
            constants.UPDATE_APPOINTMENT_STATUS,
            {
                type: constants.UPDATE_APPOINTMENT_STATUS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                    status,
                }))
            },
            {
                type: constants.UPDATE_APPOINTMENT_STATUS_FAILURE,
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

export const seenNotification = (data) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/appointment`,
        method: 'PUT',
        types: [
            constants.UPDATE_USER_APPOINTMENT,
            {
                type: constants.UPDATE_USER_APPOINTMENT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.UPDATE_USER_APPOINTMENT_FAILURE,
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

export const initTransaction = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/payment/init`,
        method: 'POST',
        types: [
            constants.INIT_TRANSACTION,
            {
                type: constants.INIT_TRANSACTION_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.INIT_TRANSACTION_FAILURE,
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

export const completeTransaction = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/payment/transaction/complete`,
        method: 'POST',
        types: [
            constants.COMPLETE_TRANSACTION,
            {
                type: constants.COMPLETE_TRANSACTION_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.COMPLETE_TRANSACTION_FAILURE,
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

export const chargeAuthorization = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/payment/authorization/charge`,
        method: 'POST',
        types: [
            constants.CHARGE_AUTHORIZATION,
            {
                type: constants.CHARGE_AUTHORIZATION_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.CHARGE_AUTHORIZATION_FAILURE,
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

export const addStylerData = data => {
    return {
        type: constants.STYLER_DATA,
        payload: data,
    }
};

export const addRating = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/appointment/rating`,
        method: 'PUT',
        types: [
            constants.ADD_RATING,
            {
                type: constants.ADD_RATING_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.ADD_RATING_FAILURE,
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