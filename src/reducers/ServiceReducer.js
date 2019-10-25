import * as constants from '../constants/ActionTypes';

let initialState = {
    
}

export default function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_SERVICE:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.ADD_SERVICE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                service: action.payload,
            }
        case constants.ADD_SERVICE_FAILURE:
            return Object.assign({}, state, {
                isProcessing: false,
                error: `${action.meta.error}`
            })
        case constants.LIST_SERVICE:
            return {
                ...state,
                services: action.payload,
            }
        case constants.EDIT_SERVICE:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.EDIT_SERVICE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                edited: action.payload,
            }
        case constants.EDIT_SERVICE_FAILURE:
            return Object.assign({}, state, {
                isProcessing: false,
                error: `${action.meta.error}`
            })
        default:
            return state;
    }
}