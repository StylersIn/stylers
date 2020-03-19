import * as constants from '../constants/ActionTypes';

let initialState = {
    date: new Date(Date.now()),
}

export default function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_APPOINTMENT:
            return {
                ...state,
                error: undefined,
                accepted: undefined,
            }
        case constants.ADD_APPOINTMENT_SUCCESS:
            return {
                ...state,
                booked: action.payload,
            }
        case constants.ADD_APPOINTMENT_FAILURE:
            return {
                ...state,
                error: action.payload.message,
            }
        case constants.LIST_APPOINTMENT:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.LIST_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                appointments: action.payload
                    && action.payload.response
                    && action.payload.response.data.sort().reverse(),
            }
        case constants.LIST_APPOINTMENT_ERROR:
            return {
                ...state,
                isProcessing: false,
                error: action.payload.meta
            }
        case constants.LIST_REQUESTS:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.LIST_REQUESTS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                requests: action.payload
                    && action.payload.response
                    && action.payload.response.data,
            }
        case constants.LIST_REQUESTS_FAILURE:
            return {
                ...state,
                isProcessing: false,
                error: action.payload.meta
            }
        // case constants.LIST_APPOINTMENT_STYLER:
        //     return {
        //         ...state,
        //         appointments: action.payload
        //             && action.payload.response
        //             && action.payload.response.data,
        //     }
        case constants.UPDATE_DATE:
            return {
                ...state,
                date: action.payload,
            }
        case constants.UPDATE_LOCATION:
            return {
                ...state,
                location: action.payload,
            }
        case constants.UPDATE_APPOINTMENT_STATUS:
            return {
                ...state,
                updated: undefined,
            }
        case constants.UPDATE_APPOINTMENT_STATUS_SUCCESS:
            return {
                ...state,
                updated: action.payload.response.success,
            }
        case constants.UPDATE_APPOINTMENT_STATUS_FAILURE:
            return {
                ...state,
                updated: undefined,
            }
        case constants.COMPLETE_APPOINTMENT:
            return {
                ...state,
                completed: undefined,
                error: undefined,
            }
        case constants.COMPLETE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                completed: action.payload.response.success,
            }
        case constants.COMPLETE_APPOINTMENT_FAILURE:
            return {
                ...state,
                completed: undefined,
                error: action.payload
            }
        case constants.INIT_TRANSACTION:
            return {
                ...state,
                transactionDetails: undefined,
                error: undefined,
            }
        case constants.INIT_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactionDetails: action.payload.response.data,
            }
        case constants.INIT_TRANSACTION_FAILURE:
            return {
                ...state,
                transactionDetails: undefined,
                error: action.payload
            }
        case constants.COMPLETE_TRANSACTION:
            return {
                ...state,
                tranx: undefined,
                error: undefined,
            }
        case constants.COMPLETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                tranx: true,
            }
        case constants.COMPLETE_TRANSACTION_FAILURE:
            return {
                ...state,
                tranx: undefined,
                error: action.payload
            }
        case constants.CHARGE_AUTHORIZATION:
            return {
                ...state,
                tranx: undefined,
                error: undefined,
            }
        case constants.CHARGE_AUTHORIZATION_SUCCESS:
            return {
                ...state,
                tranx: true,
            }
        case constants.CHARGE_AUTHORIZATION_FAILURE:
            return {
                ...state,
                tranx: undefined,
                error: action.payload
            }
        case constants.STYLER_DATA:
            return {
                ...state,
                stylerData: action.payload,
            }
        case constants.ADD_RATING:
            return {
                ...state,
                rating: undefined,
                error: undefined,
            }
        case constants.ADD_RATING_SUCCESS:
            return {
                ...state,
                rating: true,
                error: undefined,
            }
        case constants.ADD_RATING_FAILURE:
            return {
                ...state,
                rating: undefined,
                error: action.payload.message
            }
        default:
            return state;
    }
}