import React from 'react';
import { StyleSheet, View, AppState, } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/createStore';
import RootContainer from './src/containers/RootContainer';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import config from './src/config';
import { Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import SocketIOClient from 'socket.io-client';

const BASE_URL = config.api.host,
    socket = SocketIOClient(`${BASE_URL}`);

class App extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init(config.one_signal_app_id, {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    if (AppState.currentState != 'active') {
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
    }

    socket.on('appointmentBooked.send', () => console.log('Yesss booked!!'));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    AsyncStorage.setItem('oneSignalUserId', device.userId);
    // if (store.getState().user.authenticated) {
    //   store.dispatch(updateProfile(device));
    // }
    // console.log('Device info: ', device);
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <View style={styles.container}>
            <RootContainer />
          </View>
        </Provider>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow: 1,
    // padding: 20,
    // marginTop: Platform.OS == "ios" ? 50 : 0,
  }
})

export default App;