// import update from "react-addons-update";
import * as constants from "../constants/ActionTypes";
import { Dimensions } from "react-native"
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";

export function getCurrentLocation() {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type: constants.CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
