import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/styler`;

export const addStyler = credentials => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/register`,
        method: 'POST',
        types: [
            constants.ADD_STYLER,
            {
                type: constants.AUTH_USER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.ADD_STYLER_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res
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

export const updateStylerProfile = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/update`,
        method: 'PUT',
        types: [
            constants.UPDATE_PROFILE,
            {
                type: constants.UPDATE_PROFILE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.UPDATE_PROFILE_FAILURE,
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

export const getStylerDetails = payload => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/getStylerDetails`,
        method: 'GET',
        types: [
            constants.STYLER_DETAILS,
            {
                type: constants.STYLER_DETAILS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.STYLER_DETAILS_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res
                    };
                }
            }
        ],
        body: JSON.stringify(payload),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const checkStylerRegStatus = payload => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/register/status`,
        method: 'GET',
        types: [
            constants.STYLER_REG_STATUS,
            {
                type: constants.STYLER_REG_STATUS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.STYLER_REG_STATUS_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res
                    };
                }
            }
        ],
        body: JSON.stringify(payload),
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

export const getServiceStylers = (service, coordinates, pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/${service}/${pageSize}/${pageNumber}?coordinates=${coordinates}`,
        method: 'GET',
        types: [
            constants.LIST_SERVICE_STYLER,
            {
                type: constants.LIST_SERVICE_STYLER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => {
                    return { response }
                })
            },
            {
                type: constants.LIST_SERVICE_STYLER_FAILURE,
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

export const getStylerWithException = (service, styler, coordinates, pageSize = 10, pageNumber = 1) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/${service}/exception/${styler}/${pageSize}/${pageNumber}?coordinates=${coordinates}`,
        method: 'GET',
        types: [
            constants.LIST_SERVICE_STYLER,
            {
                type: constants.LIST_SERVICE_STYLER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => {
                    return { response }
                })
            },
            {
                type: constants.LIST_SERVICE_STYLER_FAILURE,
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

export const updateSelectedOption = (subServiceId, type, option, min = 0, max = 5) => {
    return (dispatch, store) => {
        let service = store().styler.selectedService || [];
        let prev = service.find(e => e.subServiceId === subServiceId);
        let prevCount = prev && prev[type] || 0;
        let added = prevCount < max ? prevCount + 1 : max,
            subtracted = prevCount > min ? prevCount - 1 : 0 || 0;
        if (service.findIndex(e => e.subServiceId === subServiceId) === -1) {
            dispatch({
                type: constants.UPDATE_SELECTED_SERVICE,
                payload: service.concat({ subServiceId, [type]: option === 'add' ? added : subtracted, })
            })
        } else {
            let temp = service.filter(c => c.subServiceId !== subServiceId);
            dispatch({
                type: constants.UPDATE_SELECTED_SERVICE,
                payload: temp.concat(Object.assign(prev, { subServiceId, [type]: option === 'add' ? added : subtracted, }))
            })
        }
    }
}

export const updateSelectedService = (subServiceId) => {
    return (dispatch, store) => {
        let service = store().styler.selectedService || [];
        if (service.findIndex(e => e.subServiceId === subServiceId) === -1) {
            dispatch({
                type: constants.UPDATE_SELECTED_SERVICE,
                payload: service.concat({ subServiceId })
            })
        } else {
            let temp = service.filter(c => c.subServiceId !== subServiceId);
            dispatch({
                type: constants.UPDATE_SELECTED_SERVICE,
                payload: temp
            })
        }
    }
}

export const updateStylerService = (services) => {
    return (dispatch, store) => {
        let service = store().styler.stylerService || [];
        if (service.findIndex(e => e.subServiceId === services.subServiceId) === -1) {
            dispatch({
                type: constants.UPDATE_STYLER_SERVICE,
                payload: service.concat(services)
            })
        }
    }
}

export const removeStylerService = (subServiceId) => {
    return (dispatch, store) => {
        let service = store().styler.stylerService || [];
        let temp = service.filter(c => c.subServiceId !== subServiceId);
        dispatch({
            type: constants.REMOVE_STYLER_SERVICE,
            payload: temp
        })
    }
}

export const scheduleAppointment = (totalDue) => {
    return (dispatch) => {
        dispatch({
            type: constants.TOTAL_DUE,
        })
        setTimeout(() => {
            dispatch({
                type: constants.TOTAL_DUE_SUCCESS,
                payload: totalDue,
            })
        }, 0);
    }
}

export const updateStylerPrice = payload => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/update/services`,
        method: 'PUT',
        types: [
            constants.UPDATE_STYLER_PRICE,
            {
                type: constants.UPDATE_STYLER_PRICE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.UPDATE_STYLER_PRICE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res
                    };
                }
            }
        ],
        body: JSON.stringify(payload),
        options: { timeout: 10000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const sortStylersService = (queryString, serviceId, coordinates) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/sort/${queryString}/${serviceId}?coordinates=${coordinates}`,
        method: 'GET',
        types: [
            constants.SORT_STYLER_SERVICE,
            {
                type: constants.SORT_STYLER_SERVICE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.SORT_STYLER_SERVICE_FAILURE,
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

export const getStats = _ => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/stats`,
        method: 'GET',
        types: [
            constants.STYLER_STATS,
            {
                type: constants.STYLER_STATS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.STYLER_STATS_FAILURE,
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

export const listStylerServices = _ => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/services`,
        method: 'GET',
        types: [
            constants.GET_STYLER_SERVICES,
            {
                type: constants.GET_STYLER_SERVICES_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.GET_STYLER_SERVICES_FAILURE,
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

export const servicePrice = (servicePrice) => {
    return dispatch => {
        dispatch({
            type: constants.SERVICE_PRICE,
            payload: servicePrice,
        })
    }
}

export const updateAvatar = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/update`,
        method: 'PUT',
        types: [
            constants.UPDATE_AVATAR,
            {
                type: constants.UPDATE_AVATAR_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.UPDATE_AVATAR_FAILURE,
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

export const updateStyler = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/update`,
        method: 'PUT',
        types: [
            constants.UPDATE_STYLER,
            {
                type: constants.UPDATE_STYLER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.UPDATE_STYLER_FAILURE,
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