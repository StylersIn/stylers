// import update from "react-addons-update";
import * as constants from "../constants/ActionTypes";
import { Dimensions } from "react-native"
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";
import { MAP_API_KEY } from "../constants/DefaultProps";
import Axios from 'axios';

export function getCurrentLocation() {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: constants.CURRENT_LOCATION,
                    payload: position
                });
                setTimeout(() => {
                    dispatch({
                        type: constants.GET_CURRENT_ADDRESS,
                    });
                    Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${MAP_API_KEY}`)
                        .then((response) => {
                            const result = response.data.results[0];
                            dispatch({
                                type: constants.GET_CURRENT_ADDRESS_SUCCESS,
                                payload: result.formatted_address
                            });
                        })
                        .catch((err) => console.log(err))
                }, 0);
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
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
                country: "NG"
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
    console.log(payload)
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
