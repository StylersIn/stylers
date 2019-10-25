import * as constants from '../constants/ActionTypes';

export default function registerReducer(state = {}, action) {
    switch (action.type) {
        case constants.REGISTER:
            return Object.assign({}, state, {
                isProcessing: true,
            })
        case constants.REGISTER_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                created: true
            };
        // case constants.REGISTE:
        //     return Object.assign({}, state, {
        //         error: `network error: ${action.payload.error}`,
        //         isProcessing: false
        //     })
        default:
            return state;
    }
}
