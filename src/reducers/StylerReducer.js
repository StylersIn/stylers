import * as constants from '../constants/ActionTypes';

let initialState = {

}

export default function stylerReducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_STYLER:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.ADD_STYLER_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                styler: action.payload,
            }
        case constants.ADD_STYLER_FAILURE:
            return Object.assign({}, state, {
                isProcessing: false,
                error: `${action.meta.error}`
            })
        case constants.LIST_STYLER:
            return {
                ...state,
                isProcessing: true,
                stylers: action.payload,
            }
        case constants.LIST_SERVICE_STYLER:
            return {
                ...state,
                isProcessing: true,
                service__stylers: action.payload && action.payload.response.data,
            }
        case constants.EDIT_STYLER:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.EDIT_STYLER_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                edited: action.payload,
            }
        case constants.EDIT_STYLER_FAILURE:
            return Object.assign({}, state, {
                isProcessing: false,
                error: `${action.meta.error}`
            })
        case constants.UPDATE_SELECTED_SERVICE:
            return {
                ...state,
                selectedService: action.payload
            }
        default:
            return state;
    }
}