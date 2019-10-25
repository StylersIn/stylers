/**
 * @format
 */

import { AppRegistry, YellowBox, } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount',
    'Warning: componentWillReceiveProps',
    'Unrecognized WebSocket connection',
    '-[RCTRootView cancelTouches]'
]);
AppRegistry.registerComponent(appName, () => App);
