import * as constants from '../constants/ActionTypes';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case constants.LOGIN:
            return Object.assign({}, state, {
                user: action.payload
            })

        default:
            return state;
    }
}