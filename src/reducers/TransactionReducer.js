import * as constants from '../constants/ActionTypes';

export default function transactionReducer(state = {}, action) {
    switch (action.type) {
        case constants.LIST_BANKS:
            return Object.assign({}, state, {
                isProcessing: true,
                banks: undefined,
            })
        case constants.LIST_BANKS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                banks: action.payload.response && action.payload.response.data,
            };
        case constants.LIST_BANKS_FAILURE:
            return Object.assign({}, state, {
                error: `${action.payload.error}`,
                banks: undefined,
                isProcessing: false
            })
        case constants.REQUEST_WITHDRAWAL:
            return Object.assign({}, state, {
                error: undefined,
                isProcessing: true,
                withdrawal: undefined,
            })
        case constants.REQUEST_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                withdrawal: action.payload.response && action.payload.response.data,
            };
        case constants.REQUEST_WITHDRAWAL_FAILURE:
            return Object.assign({}, state, {
                error: `${action.payload.response && action.payload.response.message}`,
                withdrawal: undefined,
                isProcessing: false
            })
        default:
            return state;
    }
}
