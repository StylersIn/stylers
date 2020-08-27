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
import Screen1 from './src/screens/Ochoko/Screen1';
import Screen2 from './src/screens/Ochoko/Screen2';

class App extends React.Component {
  constructor(properties) {
    super(properties);
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <View style={styles.container}>
            {/* <View style={{ position: 'absolute', width: '100%', top: '5%', paddingHorizontal: 20, }}>
              {notify ? this.showNotification() : undefined}
            </View> */}
            <RootContainer />
            {/* <Screen2 /> */}
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