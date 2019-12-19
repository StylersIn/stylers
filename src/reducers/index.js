import {
    combineReducers
} from 'redux';
import login from './LoginReducer';
import register from './RegisterReducer';
import user from './UserReducer';
import service from './ServiceReducer';
import styler from './StylerReducer';
import appointment from './AppointmentReducer';
import map from './MapReducer';

const rootReducers = combineReducers({
    login,
    register,
    user,
    service,
    styler,
    appointment,
    map,
})

export default rootReducers;