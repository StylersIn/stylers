import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/user`;
import store from '../store/createStore';

export const InitializeApp = (token) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/verify/token`,
        method: 'POST',
        types: [
            constants.INITIALIZE_APP,
            {
                type: constants.INITIALIZE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => {
                    // if (response) {
                    //     store.getState().socket.emit('auth', response);
                    // }
                    return {
                        response
                    }
                })
            },
            {
                type: constants.INITIALIZE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res,
                        // message: res.message
                    };
                }
            }
        ],
        body: JSON.stringify(token),
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
})

export const verify = (credentials) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/verify`,
        method: 'POST',
        types: [
            constants.VERIFY_ACCOUNT,
            {
                type: constants.VERIFY_ACCOUNT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.VERIFY_ACCOUNT_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
                    };
                }
            }
        ],
        body: JSON.stringify(credentials),
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
})

export const loggedInUser = _ => ({
    [RSAA]: {
        endpoint: `${API_URL}/api/loggedinuser`,
        method: 'GET',
        types: [
            constants.REQUEST(constants.CURRENT_USER),
            {
                type: constants.REQUEST_SUCCESS(constants.CURRENT_USER),
                payload: (action, state, response) => response.json().then(response => {
                    return {
                        response
                    }
                })
            },
            {
                type: constants.REQUEST_FAILURE(constants.CURRENT_USER),
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
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

export const fetchUsers = _ => ({
    [RSAA]: {
        endpoint: `${API_URL}/api/users`,
        method: 'GET',
        types: [
            constants.REQUEST(constants.LIST_USERS),
            {
                type: constants.REQUEST_SUCCESS(constants.LIST_USERS),
                payload: (action, state, response) => response.json().then(users => {
                    return {
                        users
                    }
                })
            },
            {
                type: constants.REQUEST_FAILURE(constants.LIST_USERS),
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
                    };
                }
            }
        ],
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }
});

export const fetchUser = publicId => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/${publicId}`,
        method: 'GET',
        types: [
            constants.USER_DATA,
            {
                type: constants.USER_DATA_SUCCESS,
                payload: (action, state, response) => response.json().then(response => {
                    return {
                        response
                    }
                })
            },
            {
                type: constants.USER_DATA_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
                    };
                }
            }
        ],
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }
});

export const updateProfile = data => ({
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

export const updateOneSignal = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/update/onesignal`,
        method: 'PUT',
        types: [
            constants.UPDATE_PROFILE,
            {
                type: constants.UPDATE_PROFILE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                    oneSignalId: data.oneSignalUserId,
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

export const removeID = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/remove/onesignal`,
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

export const fetchCards = _ => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/cards`,
        method: 'GET',
        types: [
            constants.FETCH_CARDS,
            {
                type: constants.FETCH_CARDS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.FETCH_CARDS_FAILURE,
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

export const changePassword = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/changePassword`,
        method: 'POST',
        types: [
            constants.CHANGE_PASSWORD,
            {
                type: constants.CHANGE_PASSWORD_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.CHANGE_PASSWORD_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        options: { timeout: 10000 },
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const sendConfirmationCode = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/forgotPasswordToken`,
        method: 'PUT',
        types: [
            constants.SEND_CONFIRMATION_CODE,
            {
                type: constants.SEND_CONFIRMATION_CODE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.SEND_CONFIRMATION_CODE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        options: { timeout: 10000 },
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const confirmPasswordChange = data => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/forgotPassword`,
        method: 'POST',
        types: [
            constants.CONFIRM_PASSWORD_CHANGE,
            {
                type: constants.CONFIRM_PASSWORD_CHANGE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.CONFIRM_PASSWORD_CHANGE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status
                    };
                }
            }
        ],
        options: { timeout: 10000 },
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export function userLocation(location) {
    return (dispatch) => {
        dispatch({
            type: constants.USER_LOCATION,
            payload: location
        });
    }
}

export const logout = data => {
    return (dispatch, store) => {
        var location = store().user.location || {};
        dispatch({ type: constants.LOGOUT })
        AsyncStorage.clear((err) => {
            if (!err) {
                dispatch({
                    type: constants.LOGOUT, payload: {
                        meta: 'loggedOut',
                        oneSignalId: data,
                        location,
                    }
                })
            }
        })
    }
}