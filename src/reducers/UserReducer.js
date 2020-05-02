import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../store/createStore';

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
            if (action.payload.response.status == false) {
                return {
                    ...state,
                    status: false,
                    message: action.payload.response.message,
                }
            }
            if (action.payload.response.success == false) {
                return {
                    ...state,
                    message: action.payload.response.message,
                    authenticated: false,
                }
            }
            if (action.payload.response.data && action.payload.response.data.token) {
                AsyncStorage.setItem(constants.TOKEN, action.payload.response.data.token);
                // store.getState().socket.emit('Authorized', action.payload.response.data.user);
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
        case constants.UPDATE_PROFILE:
            return Object.assign({}, state, {
                profileUpdateError: undefined,
                profileUpdated: undefined,
            })
        case constants.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileUpdated: true,
                oneSignalId: action.payload.oneSignalId,
            }
        case constants.UPDATE_PROFILE_FAILURE:
            return Object.assign({}, state, {
                profileUpdated: undefined,
                profileUpdateError: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.LOGOUT:
            if (action.payload && action.payload.meta === 'loggedOut') {
                return {
                    state: {},
                    loggedOut: true,
                    oneSignalId: action.payload.oneSignalId,
                }
            }
            return {
                loggingOut: true,
            }

        case constants.FETCH_CARDS:
            return Object.assign({}, state, {
                cards: undefined,
            })
        case constants.FETCH_CARDS_SUCCESS:
            return {
                ...state,
                cards: action.payload.response && action.payload.response.data
            }
        case constants.FETCH_CARDS_FAILURE:
            return Object.assign({}, state, {
                cards: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.CHANGE_PASSWORD:
            return Object.assign({}, state, {
                changingPassword: true,
                changePasswordError: undefined,
            })
        case constants.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changingPassword: undefined,
                changedPassword: true,
            }
        case constants.CHANGE_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                cards: undefined,
                changingPassword: undefined,
                changedPassword: undefined,
                changePasswordError: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.SEND_CONFIRMATION_CODE:
            return Object.assign({}, state, {
                error: undefined,
            })
        case constants.SEND_CONFIRMATION_CODE_SUCCESS:
            return {
                ...state,
                error: undefined,
                codeSent: true,
            }
        case constants.SEND_CONFIRMATION_CODE_FAILURE:
            return Object.assign({}, state, {
                cards: undefined,
                codeSent: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.CONFIRM_PASSWORD_CHANGE:
            return Object.assign({}, state, {
                error: undefined,
            })
        case constants.CONFIRM_PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                error: undefined,
                passwordChanged: true,
            }
        case constants.CONFIRM_PASSWORD_CHANGE_FAILURE:
            return Object.assign({}, state, {
                cards: undefined,
                passwordChanged: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        default:
            return state;
    }
}