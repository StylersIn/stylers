import * as constants from '../constants/ActionTypes';

let initialState = {

}

export default function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case constants.CURRENT_LOCATION:
            return {
                ...state,
                location: action.payload,
            }
        case constants.GET_CURRENT_ADDRESS:
            return {
                ...state,
                currentAddress: null,
            }
        case constants.GET_CURRENT_ADDRESS_SUCCESS:
            return {
                ...state,
                currentAddress: action.payload,
            }
        case constants.GET_INPUT:
            return Object.assign({}, state, {
                searching: true,
                inputData: action.payload.value,
            })
        case constants.GET_ADDRESS_PREDICTIONS:
            return Object.assign({}, state, {
                predictions: action.payload,
                searching: false,
            })
        case constants.GET_ADDRESS_PREDICTIONS_ERROR:
            return Object.assign({}, state, {
                addresses: undefined,
                error: action.payload,
            })
        case constants.GET_SELECTED_ADDRESS:
            return Object.assign({}, state, {
                inputData: undefined,
                selectedAddress: action.payload,
                predictions: {},
            })
        case constants.GET_SELECTED_ADDRESS_ERROR:
            return Object.assign({}, state, {
                selectedAddress: undefined,
                error: action.payload,
            })
        default:
            return state;
    }
}