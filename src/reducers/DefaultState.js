import SocketIOClient from 'socket.io-client';
import config from '../config';

const BASE_URL = config.api.host,
    socket = SocketIOClient(`${BASE_URL}`);

export default {
    user: {
        error: '',
    },
    styler: {
        selectedService: [],
    },
    socket
}