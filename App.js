/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation';
import store from './src/store/createStore';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
    </>
  );
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
