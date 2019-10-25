import env from 'react-native-config';

const config = {
    api: {
        host: env.BASE_URL,
        timeout: 20000
    }
};

const BASE_URL = config.api.host;

export {
    BASE_URL
}

export default config;