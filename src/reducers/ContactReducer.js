import * as constants from '../constants/ActionTypes';

export default function contactReducer(state = {}, action) {
    switch (action.type) {
        case constants.CONTACT:
            return Object.assign({}, state, {
                isProcessing: true,
                created: undefined,
                error: undefined,
            })
        case constants.CONTACT_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                created: true,
                error: undefined,
            };
        case constants.CONTACT_FAILURE:
            return Object.assign({}, state, {
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
                created: undefined,
                isProcessing: false
            })
        default:
            return state;
    }
}
