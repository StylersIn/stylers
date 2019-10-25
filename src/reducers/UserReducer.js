import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

let initialState = {
    authenticated: false,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case constants.INITIALIZE_SUCCESS:
            return {
                ...state,
                authenticated: true,
                current: action.payload
            }
        case constants.INITIALIZE_FAILURE:
            return {
                ...state,
                auth__failed: true
            }
        case constants.AUTH_USER:
            return Object.assign({}, state, {
                authenticated: false,
                error: undefined
            })
        case constants.AUTH_USER_SUCCESS:
            if (action.payload.response.data.token) {
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
                error: `${action.payload.error}`,
                authenticated: false
            })
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
        case constants.LOGOUT:
            return { ...state }
        default:
            return state;
    }
}