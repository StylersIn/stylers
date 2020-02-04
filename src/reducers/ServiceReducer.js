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
                services: undefined,
                error: undefined,
            }
        case constants.LIST_SERVICE_SUCCESS:
            return {
                ...state,
                error: undefined,
                services: action.payload.credentials && action.payload.credentials.message,
            }
        case constants.LIST_SERVICE_FAILURE:
            return {
                ...state,
                services: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
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
        case constants.LIST_SUB_SERVICE:
            return {
                ...state,
                subService: undefined,
            }
        case constants.LIST_SUB_SERVICE_SUCCESS:
            return {
                ...state,
                subService: action.payload,
            }
        case constants.LIST_SUB_SERVICE_FAILURE:
            return {
                ...state,
                subService: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            }
        case constants.FILTER_SERVICE:
            return {
                ...state,
                resetFilter: undefined,
                searching: true,
                message: undefined,
                // filteredServices: undefined,
            }
        case constants.FILTER_SERVICE_SUCCESS:
            if (action.payload.response && action.payload.response.data.data.length) {
                return {
                    ...state,
                    searching: false,
                    filteredServices: action.payload.response && action.payload.response.data.data,
                }
            } else {
                return {
                    ...state,
                    searching: false,
                    filteredServices: undefined,
                    message: action.payload.response && action.payload.response.data.message,
                }
            }

        case constants.FILTER_SERVICE_FAILURE:
            return {
                ...state,
                searching: false,
                filteredServices: undefined,
                message: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            }
        case constants.RESET_SEARCH:
            return {
                ...state,
                resetFilter: true,
            }
        default:
            return state;
    }
}