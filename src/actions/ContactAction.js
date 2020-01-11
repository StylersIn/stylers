import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = () => `${config.api.host}/api/help`;

export const contact = credentials => ({
    [RSAA]: {
        endpoint: `${BASE_URL()}`,
        method: 'POST',
        types: [
            constants.CONTACT,
            {
                type: constants.CONTACT_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response,
                }))
            },
            {
                type: constants.CONTACT_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: 'Poor Internet connection'
                    };
                }
            }
        ],
        body: JSON.stringify(credentials),
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});