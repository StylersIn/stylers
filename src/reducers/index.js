import {
    combineReducers
} from 'redux';
import login from './LoginReducer';
import register from './RegisterReducer';
import user from './UserReducer';
import service from './ServiceReducer';
import styler from './StylerReducer';
import booking from './BookingReducer';

const rootReducers = combineReducers({
    login,
    register,
    user,
    service,
    styler,
    booking,
})

export default rootReducers;