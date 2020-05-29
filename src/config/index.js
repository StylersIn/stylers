import env from 'react-native-config';
import { Platform } from 'react-native';

const config = {
  api: {
    // host: env.BASE_URL,
    // host: 'https://stylers.herokuapp.com',
    host: Platform.OS == "ios" ? 'http://localhost:8080' : 'http://10.0.2.2:8080',
    // host: 'http://10.0.2.2:8080',
    timeout: 60000,
  },
  paystack: 'pk_test_c7fae17b0fc0dc90a958362549dd64ea8fb43a53',
  one_signal_app_id: 'a3fc8c03-722d-4260-a759-a31c24f44010',
};

const BASE_URL = config.api.host;

export {
  BASE_URL
}

export default config;