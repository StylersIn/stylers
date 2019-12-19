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
                booked: undefined,
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
                    && action.payload.response.data,
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
        case constants.ADD_APPOINTMENT_SUCCESS:
            return {
                ...state,
                booked: action.payload,
            }
        case constants.ADD_APPOINTMENT_FAILURE:
            return {
                ...state,
                error: action.meta.error,
            }
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
        case constants.ACCEPT_APPOINTMENT:
            return {
                ...state,
                accepted: undefined,
            }
        case constants.ACCEPT_APPOINTMENT_SUCCESS:
            return {
                ...state,
                accepted: action.payload.response.success,
            }
        case constants.ACCEPT_APPOINTMENT_FAILURE:
            return {
                ...state,
                accepted: undefined,
            }
        default:
            return state;
    }
}