import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import AppNavigator from '../navigation';
import { NavigationActions } from 'react-navigation';
import NavigationService from '../navigation/NavigationService';
import { Card, CardItem, Icon } from 'native-base';
import { View, StyleSheet, Vibration } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { colors, fonts } from '../constants/DefaultProps';
import config from '../config';
import store from '../../src/store/createStore';
import { updateProfile, updateOneSignal } from '../actions/UserActions';
import AsyncStorage from '@react-native-community/async-storage';

class Root extends React.Component {
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
            isProcessing: true,
        }
    }
    UNSAFE_componentWillUpdate(nextProps) {
        if (nextProps.user.loggingOut) {
        }
        if (nextProps.user.loggedOut && nextProps.user.loggedOut !== this.props.user.loggedOut) {
            // NavigationActions.navigate({
            //     routeName: 'Login'
            // });
            // NavigationService.resetAction('Auth');
            // NavigationService.navigate('Login');
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
        if (store.getState().user.authenticated) {
            // store.dispatch(updateOneSignal({ oneSignalUserId: device.userId }));
            console.log('Device info: ', device);
        }
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
        return <>
            <View style={{ position: 'absolute', width: '100%', top: '5%', paddingHorizontal: 20, }}>
                {notify ? this.showNotification() : undefined}
            </View>
            <AppNavigator
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        </>
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    Input___shadow: {
        position: "absolute",
        left: 20,
        right: 20,
        zIndex: 1000,
        paddingRight: 30,
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
});

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Root);