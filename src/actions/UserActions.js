import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/auth`;

export const InitializeApp = (token) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}/verify/token`,
        method: 'POST',
        types: [
            constants.INITIALIZE_APP,
            {
                type: constants.INITIALIZE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => {
                    return {
                        response
                    }
                })
            },
            {
                type: constants.INITIALIZE_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
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
                    console.log(users)
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

// export const logout = _ => ({
//     [RSAA]: {
//         endpoint: `${API_URL}/api/logout`,
//         method: 'GET',
//         types: [
//             constants.REQUEST(constants.LOGOUT),
//             {
//                 type: constants.REQUEST_SUCCESS(constants.LOGOUT),
//                 payload: (action, state, response) => response.json().then(result => {
//                     alert("Logged Out")
//                 })
//             }
//         ],
//         options: { timeout: 60000 },
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//     }
// })

export const logout = _ => {
    return (dispatch) => {
        dispatch({ type: constants.LOGOUT })
        AsyncStorage.clear((err) => {
            if (!err) {
                dispatch({ type: constants.LOGOUT, payload: 'loggedOut' })
            }
        })
    }
}