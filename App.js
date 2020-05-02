import React from 'react';
import { StyleSheet, View, Vibration, } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/createStore';
import RootContainer from './src/containers/RootContainer';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import config from './src/config';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, CardItem, Icon } from 'native-base';
import Text from './src/config/AppText';
import { colors, fonts } from './src/constants/DefaultProps';

class App extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init(config.one_signal_app_id, {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.inFocusDisplaying(0);
    // OneSignal.enableSound(true);
    // OneSignal.enableVibrate(true);
    OneSignal.setSubscription(true);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    this.state = {
      notify: undefined,
      notification: {
        payload: { body: undefined, }
      },
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    // alert('Notification received: ', notification)
    this.setState({ notify: true, notification, });
    Vibration.vibrate();
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

  showNotification = () => {
    setTimeout(() => {
      this.setState({ notify: undefined, notification: {} })
    }, 5000);
    const { notification } = this.state;
    return (
      <Card style={styles.Input___shadow}>
        <CardItem style={{ borderRadius: 4, backgroundColor: colors.pink, flexDirection: 'row', }}>
          <View>
            <Icon style={{ color: colors.white, }} name='ios-add' />
          </View>
          <View>
            <Text style={{ color: colors.white, fontFamily: fonts.bold, fontSize: 18, }}>{notification.payload.title}</Text>
            <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{notification.payload.body}</Text>
          </View>
        </CardItem>
      </Card>
    )
  }

  render() {
    const { notify } = this.state;
    return (
      <>
        <Provider store={store}>
          <View style={styles.container}>
            <View style={{ position: 'absolute', width: '100%', top: '5%', paddingHorizontal: 20, }}>
              {notify ? this.showNotification() : undefined}
            </View>
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
  },
  Input___shadow: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.pink,
    borderRadius: 5,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.pink,
  },
})

export default App;