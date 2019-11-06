import * as constants from '../constants/ActionTypes';

let initialState = {
    date: new Date(Date.now()),
}

export default function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_BOOKING:
            return {
                ...state,
                error: undefined,
                booked: undefined,
            }
        case constants.LIST_BOOKING:
            return {
                ...state,
                // isProcessing: 
                bookings: action.payload
                    && action.payload.response
                    && action.payload.response.data,
            }
        case constants.ADD_BOOKING_SUCCESS:
            return {
                ...state,
                booked: action.payload,
            }
        case constants.ADD_BOOKING_FAILURE:
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
        default:
            return state;
    }
}