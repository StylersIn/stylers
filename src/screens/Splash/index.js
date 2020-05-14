import React, { Component } from "react";
import {
    View, StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from "../../navigation/NavigationService";
import { SplashLogo } from "../Assets";
import { colors, fonts } from "../../constants/DefaultProps";
import Text from '../../config/AppText';
import * as constants from '../../constants/ActionTypes';
import Button from '../../components/Button';
import Geolocation from "@react-native-community/geolocation";

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
            showErr: false,
            error: undefined,
        }
    }

    getCurrentPosition() {
        try {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.props.userLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                },
                (error) => {
                    //TODO: better design
                    switch (error.code) {
                        case 1:
                            if (Platform.OS === "ios") {
                                Alert.alert("", error.code);
                            } else {
                                Alert.alert("", error.code);
                            }
                            break;
                        default:
                            Alert.alert("", error.code);
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    distanceFilter: 10
                }
            );
        } catch (e) {
            alert(e.message || "");
        }
    };

    init = () => {
        setTimeout(() => {
            AsyncStorage.getItem(constants.TOKEN)
                .then((token) => {
                    if (!token) return this.props.navigation.navigate('Auth');
                    this.props.InitializeApp({ token });
                })
        }, 1000);
    }

    componentDidMount() {
        this.init();
        this.getCurrentPosition();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.props.socket.emit('auth', nextProps.user.current.publicId)
            if (nextProps.user.current.role === 'styler') {
                this.props.checkStylerRegStatus();
                this.props.getStylerDetails();
            } else {
                this.props.navigation.dispatch(NavigationService.resetAction('Home'))
            }
        }
        if (nextProps.user.auth__failed) {
            // alert(nextProps.user.error )
            if (nextProps.user.error == 'Network request failed') {
                this.setState({ showErr: true, error: 'You seem to be offline. Please kindly check that you have a stable Internet connection', })
            }
            else this.props.navigation.dispatch(NavigationService.resetAction('Auth'));
        }
        if (nextProps.styler.status != this.props.styler.status) {
            if (typeof nextProps.styler.status !== 'undefined') {
                if (nextProps.styler.status === true) {
                    this.props.navigation.dispatch(NavigationService.resetAction('Requests'))
                } else {
                    this.props.navigation.dispatch(NavigationService.resetAction('StylerService'))
                }
            }
        }
    }

    reload = () => {
        this.setState({ showErr: false, error: undefined, });
        this.init();
    }

    render() {
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor={colors.pink} />
                {!this.state.showErr ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.pink, }}>
                    <SplashLogo />
                    <Text style={{ marginTop: 50, fontSize: 18, color: colors.white, fontFamily: fonts.medium, }}>Welcome</Text>
                </View> : <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', }}>
                        <Text style={{ marginTop: 50, fontSize: 12, textAlign: 'center', color: colors.danger, fontFamily: fonts.medium, marginHorizontal: 50, }}>{this.state.error}</Text>
                        <View style={{ marginTop: 20, width: '100%' }}>
                            <Button
                                onPress={this.reload}
                                btnTxt={"RETRY"}
                                size={"sm"}
                                styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000", }}
                                btnTxtStyles={{ color: colors.black, fontFamily: fonts.medium }}
                            />
                        </View>
                    </View>}
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);