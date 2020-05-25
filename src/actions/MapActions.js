// import update from "react-addons-update";
import * as constants from "../constants/ActionTypes";
import { Dimensions } from "react-native"
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";
import { MAP_API_KEY } from "../constants/DefaultProps";
import Axios from 'axios';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/styler`;

export function getCurrentLocation() {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: constants.GET_CURRENT_ADDRESS,
                });
                const region = position.coords;
                Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${MAP_API_KEY}`)
                    .then((response) => {
                        const result = response.data.results[0];
                        const data = {
                            priceLevel: 0,
                            viewport: {
                                longitudeSW: result.geometry.viewport.southwest.lng,
                                latitudeSW: result.geometry.viewport.southwest.lat,
                                longitudeNE: result.geometry.viewport.northeast.lng,
                                latitudeNE: result.geometry.viewport.northeast.lat
                            },
                            address: result.formatted_address,
                            location: {
                                longitude: result.geometry.location.lng,
                                latitude: result.geometry.location.lat
                            },
                            plusCode: result.plus_code,
                            types: result.types,
                            placeID: result.place_id,
                            name: result.formatted_address,
                        }
                        dispatch({
                            type: constants.GET_CURRENT_ADDRESS_SUCCESS,
                            payload: data
                        });
                    })
                    .catch((err) => console.log(err))
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: false, timeout: 20000, }
        );
    }
}

export function getInputData(input) {
    return (dispatch) => {
        dispatch({
            type: constants.GET_INPUT,
            payload: input
        });
    }
}

export function getAddressPredictions() {
    return (dispatch, store) => {
        let userInput = store().map.inputData;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
                // country: "NG",
                type: "political",
            }
        )
            .then((results) =>
                setTimeout(() => {
                    dispatch({
                        type: constants.GET_ADDRESS_PREDICTIONS,
                        payload: results
                    })
                }, 2000)
            )
            .catch((error) =>
                setTimeout(() => {
                    dispatch({
                        type: constants.GET_ADDRESS_PREDICTIONS_ERROR,
                        payload: error.message
                    })
                }, 2000)
            );
    };
}


//get selected address
export function getSelectedAddress(payload) {
    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
            .then((results) => {
                dispatch({
                    type: constants.GET_SELECTED_ADDRESS,
                    payload: results
                })
            })
            .catch((error) =>
                setTimeout(() => {
                    dispatch({
                        type: constants.GET_SELECTED_ADDRESS_ERROR,
                        payload: error.message
                    })
                }, 2000)
            );
    }
}


export const updateStylerCurrentLocation = (location) => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}`,
        method: 'PUT',
        types: [
            constants.UPDATE_STYLER_LOCATION,
            {
                type: constants.UPDATE_STYLER_LOCATION_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.UPDATE_STYLER_LOCATION_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: 'Poor Internet connection'
                    };
                }
            }
        ],
        body: JSON.stringify(location),
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
})

export function updateUserStylerLocation(location) {
    return (dispatch, store) => {
        dispatch({
            type: constants.UPDATE_USER_STYLER_LOCATION,
            payload: location,
        })
    }
}

export function clearInputData(payload) {
    return {
        type: constants.CLEAR_INPUT,
        payload
    }
}