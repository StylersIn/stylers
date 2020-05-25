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
import contact from './ContactReducer';
import socket from './SocketReducer';
import transaction from './TransactionReducer';

const rootReducers = combineReducers({
    login,
    register,
    user,
    service,
    styler,
    appointment,
    map,
    contact,
    socket,
    transaction,
})

export default rootReducers;