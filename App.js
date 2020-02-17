/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { updateProfile } from './src/actions/UserActions';
import * as actionAcreators from './src/actions';
import { connect } from 'react-redux';
import { StyleSheet, View, } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/createStore';
import RootContainer from './src/containers/RootContainer';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

class App extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("a3fc8c03-722d-4260-a759-a31c24f44010", { kOSSettingsKeyAutoPrompt: true });// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    // store.dispatch(updateProfile(device));
    console.log('Device info: ', device);
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