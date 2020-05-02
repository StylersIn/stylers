import * as constants from '../constants/ActionTypes';

export default function loginReducer(state = {}, action) {
    switch (action.type) {
        case constants.LOGIN:
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined
            })
        case constants.LOGIN_SUCCESS:
            if (action.payload.token) {
                // localStorage.setItem(constants.TOKEN_NAME, action.payload.token);
                return {
                    ...state,
                    isProcessing: false,
                    isAuthenticated: true,
                    current: action.payload.user
                };
            }
        case constants.LOGIN_FAILURE:
            return Object.assign({}, state, {
                error: `Login failed due to ${action.payload.status}`,
                isProcessing: false
            })

        case constants.VERIFY_SOCIAL:
            return Object.assign({}, state, {
                status: undefined,
                isProcessing: true,
                error: undefined,
                socialAccount: undefined,
            })
        case constants.VERIFY_SOCIAL_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                status: action.payload.response.status,
            };
        case constants.VERIFY_SOCIAL_FAILURE:
            return Object.assign({}, state, {
                error: action.payload.response && action.payload.response.message,
                socialAccount: action.payload.response && action.payload.response.socialAccount,
                isProcessing: false,
                status: undefined,
            })
        case constants.LOGOUT:
            return Object.assign({}, state, {})
        default:
            return state;
    }
}