import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

let initialState = {
    authenticated: false,
    message: undefined,
    error: undefined,
    status: undefined,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case constants.INITIALIZE_APP:
            return {
                ...state,
                error: undefined,
                auth__failed: undefined,
            }
        case constants.INITIALIZE_SUCCESS:
            return {
                ...state,
                authenticated: true,
                current: action.payload.response,
            }
        case constants.INITIALIZE_FAILURE:
            return {
                ...state,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
                auth__failed: true
            }
        case constants.AUTH_USER:
            return Object.assign({}, state, {
                authenticated: false,
                error: undefined,
                status: undefined,
                message: undefined,
            })
        case constants.AUTH_USER_SUCCESS:
            if (!action.payload.response.success) {
                return {
                    ...state,
                    status: false,
                    message: action.payload.response.message,
                }
            }
            if (action.payload.response.data && action.payload.response.data.token) {
                AsyncStorage.setItem(constants.TOKEN, action.payload.response.data.token);
                return {
                    ...state,
                    authenticated: true,
                    error: undefined,
                    current: action.payload.response.data.user
                };
            }
        case constants.AUTH_USER_FAILURE:
            return Object.assign({}, state, {
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
                authenticated: false
            })
        case constants.VERIFY_ACCOUNT:
            return {
                ...state,
                ...initialState,
            }
        case constants.VERIFY_ACCOUNT_SUCCESS:
            if (!action.payload.response.success) {
                return {
                    ...state,
                    status: false,
                    message: action.payload.response.message,
                }
            }
            if (action.payload.response.data && action.payload.response.data.token) {
                AsyncStorage.setItem(constants.TOKEN, action.payload.response.data.token);
                return {
                    ...state,
                    authenticated: true,
                    error: undefined,
                    status: true,
                    message: action.payload.response.message,
                    current: action.payload.response.data.user,
                }
            }
        case constants.VERIFY_ACCOUNT_FAILURE:
            return {
                ...state,
                status: false,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            }
        case constants.CURRENT_USER:
            return Object.assign({}, state, {})
        case constants.LIST_USERS:
            return Object.assign({}, state, {})
        case constants.LIST_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users
            }
        case constants.LIST_USERS_FAILURE:
            return Object.assign({}, state, {
                error: `Login failed due to ${action.payload.error}`
            })
        case constants.USER_DATA:
            return Object.assign({}, state, {
                userData: undefined,
            })
        case constants.USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload.response && action.payload.response.data
            }
        case constants.USER_DATA_FAILURE:
            return Object.assign({}, state, {
                userData: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.LOGOUT:
            if (action.payload === 'loggedOut') {
                return {
                    state: {},
                    loggedOut: true,
                }
            }
            return {
                loggingOut: true,
            }

        default:
            return state;
    }
}