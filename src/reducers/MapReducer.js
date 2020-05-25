import * as constants from '../constants/ActionTypes';

let initialState = {
    location: null,
}

export default function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case constants.CURRENT_LOCATION:
            return {
                ...state,
                location: action.payload,
            }
        case constants.GET_CURRENT_ADDRESS:
            return Object.assign({}, state, {
                currentAddress: true,
            })
        case constants.GET_CURRENT_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                currentAddress: undefined,
                selectedAddress: action.payload || undefined,
            })
        case constants.GET_INPUT:
            return Object.assign({}, state, {
                searching: true,
                selectedAddress: undefined,
                inputData: action.payload.value,
            })
        case constants.CLEAR_INPUT:
            return Object.assign({}, state, {
                searching: false,
                inputData: undefined,
                selectedAddress: undefined,
            })
        case constants.GET_ADDRESS_PREDICTIONS:
            return Object.assign({}, state, {
                error: undefined,
                predictions: action.payload,
                searching: false,
            })
        case constants.GET_ADDRESS_PREDICTIONS_ERROR:
            return Object.assign({}, state, {
                addresses: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.GET_SELECTED_ADDRESS:
            return Object.assign({}, state, {
                inputData: undefined,
                selectedAddress: action.payload,
                predictions: undefined,
            })
        case constants.GET_SELECTED_ADDRESS_ERROR:
            return Object.assign({}, state, {
                selectedAddress: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.UPDATE_STYLER_LOCATION:
            return Object.assign({}, state, {
                updated: undefined,
            })
        case constants.UPDATE_STYLER_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                updated: true,
            })
        case constants.UPDATE_STYLER_LOCATION_FAILURE:
            return Object.assign({}, state, {
                updated: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            })
        case constants.UPDATE_USER_STYLER_LOCATION:
            return Object.assign({}, state, {
                userStylerLocation: action.payload,
            })
        default:
            return state;
    }
}