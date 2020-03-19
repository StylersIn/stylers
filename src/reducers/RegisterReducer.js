import * as constants from '../constants/ActionTypes';

export default function registerReducer(state = {}, action) {
    switch (action.type) {
        case constants.REGISTER:
            return Object.assign({}, state, {
                isProcessing: true,
                message: undefined,
                created: undefined,
            })
        case constants.REGISTER_SUCCESS:
            if (action.payload.response.success == false) {
                return {
                    ...state,
                    message: action.payload.response.message,
                    created: false,
                }
            }
            return {
                ...state,
                isProcessing: false,
                created: true
            };
        case constants.REGISTER_FAILURE:
            return Object.assign({}, state, {
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
                isProcessing: false,
                created: false,
            })
        default:
            return state;
    }
}
