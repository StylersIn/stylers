import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

let initialState = {
    servicePrice: undefined,
}

function filterServicePrice(state, action) {
    if (state.servicePrice) {
        let f = state.servicePrice.findIndex(e => e.subServiceId == action.payload.subServiceId);
        let obj = [];
        if (f == -1) {
            if (!action.payload.adult && !action.payload.child) {
                return state.servicePrice;
            }
            return state.servicePrice.concat(action.payload);
        }
        obj = Object.assign(state.servicePrice[f], action.payload);
        if (!obj.adult && !obj.child) {
            state.servicePrice.splice(f, 1);
            return state.servicePrice;
        }
        state.servicePrice.splice(f, 1);
        return state.servicePrice.concat(obj);
    }
    return [action.payload];
}

export default function stylerReducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_STYLER:
            return {
                ...state,
                isProcessing: true,
            }
        case constants.ADD_STYLER_SUCCESS:
            if (!action.payload.response.success) {
                return {
                    ...state,
                    created: false,
                    message: action.payload.response.message,
                }
            }
            if (action.payload.response.data && action.payload.response.data.token) {
                // AsyncStorage.setItem(constants.TOKEN, action.payload.response.data.token);
                return {
                    ...state,
                    authenticated: true,
                    error: undefined,
                    styler: action.payload.response,
                };
            }
        case constants.ADD_STYLER_FAILURE:
            return Object.assign({}, state, {
                isProcessing: false,
                error: action.meta
            })
        case constants.STYLER_REG_STATUS:
            return {
                ...state,
                status: undefined,
                error: undefined,
            }
        case constants.STYLER_REG_STATUS_SUCCESS:
            return {
                ...state,
                isVerified: action.payload.response.isVerified,
                status: action.payload.response.success,
            }
        case constants.STYLER_REG_STATUS_FAILURE:
            return {
                ...state,
                status: false,
                error: action.meta.error,
            }
        case constants.UPDATE_AVATAR:
            return {
                ...state,
                avatar: undefined,
                error: undefined,
            }
        case constants.UPDATE_AVATAR_SUCCESS:
            return {
                ...state,
                avatar: true,
                error: undefined,
            }
        case constants.UPDATE_AVATAR_FAILURE:
            return {
                ...state,
                avatar: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
            }
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
                serviceStylers: undefined,
            }
        case constants.LIST_SERVICE_STYLER_SUCCESS:
            return {
                ...state,
                isProcessing: undefined,
                message: action.payload && action.payload.response.message,
                serviceStylers: action.payload && action.payload.response.data,
            }
        case constants.LIST_SERVICE_STYLER_FAILURE:
            return {
                ...state,
                isProcessing: undefined,
                serviceStylers: undefined,
                error: `${action.meta.error}`
            }
        case constants.STYLER_DETAILS:
            return {
                ...state,
                isProcessing: true,
                stylerDetails: undefined,
            }
        case constants.STYLER_DETAILS_SUCCESS:
            return {
                ...state,
                isProcessing: undefined,
                stylerDetails: action.payload && action.payload.response.data,
            }
        case constants.STYLER_DETAILS_FAILURE:
            return {
                ...state,
                isProcessing: undefined,
                stylerDetails: undefined,
                error: `${action.meta.error}`
            }
        case constants.GET_STYLER_SERVICES:
            return {
                ...state,
                isProcessing: true,
                error: undefined,
                stylerServices: undefined,
            }
        case constants.GET_STYLER_SERVICES_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                stylerServices: action.payload && action.payload.response.data,
            }
        case constants.GET_STYLER_SERVICES_FAILURE:
            return {
                ...state,
                isProcessing: undefined,
                error: `${(action.payload.response && action.payload.response.message) || (action.payload.message)}`,
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
        case constants.UPDATE_STYLER_SERVICE:
            return {
                ...state,
                stylerService: action.payload
            }
        case constants.REMOVE_STYLER_SERVICE:
            return {
                ...state,
                stylerService: action.payload
            }
        case constants.UPDATE_STYLER:
            return {
                ...state,
                error: undefined,
                updatedStyler: undefined,
            }
        case constants.UPDATE_STYLER_SUCCESS:
            return {
                ...state,
                updatedStyler: action.payload && action.payload.response.data,
            }
        case constants.UPDATE_STYLER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                updatedStyler: undefined,
            }
        case constants.UPDATE_STYLER_PRICE:
            return {
                ...state,
                error: undefined,
            }
        case constants.UPDATE_STYLER_PRICE_SUCCESS:
            return {
                ...state,
                updated: action.payload && action.payload.response.data,
            }
        case constants.UPDATE_STYLER_PRICE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            }
        case constants.SORT_STYLER_SERVICE:
            return {
                ...state,
                isProcessing: true,
                serviceStylers: undefined,
                error: undefined,
            }
        case constants.SORT_STYLER_SERVICE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                serviceStylers: action.payload.response.data,
            }
        case constants.SORT_STYLER_SERVICE_FAILURE:
            return {
                ...state,
                isProcessing: false,
                error: action.payload.error,
            }
        case constants.STYLER_STATS:
            return {
                ...state,
                stats: undefined,
                error: undefined,
            }
        case constants.STYLER_STATS_SUCCESS:
            return {
                ...state,
                stats: action.payload.response && action.payload.response.data,
            }
        case constants.STYLER_STATS_FAILURE:
            return {
                ...state,
                stats: undefined,
                error: action.payload.error,
            }
        case constants.SERVICE_PRICE:
            return {
                ...state,
                servicePrice: filterServicePrice(state, action),
            }
        case constants.TOTAL_DUE:
            return {
                ...state,
                totalDue: undefined,
            }
        case constants.TOTAL_DUE_SUCCESS:
            return {
                ...state,
                totalDue: action.payload,
            }
        default:
            return state;
    }
}