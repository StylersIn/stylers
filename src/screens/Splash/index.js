import React, { Component } from "react";
import {
    View
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

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(constants.TOKEN)
            .then((token) => {
                if (!token) this.props.navigation.navigate('Auth');
                this.props.InitializeApp({ token });
            })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.props.socket.emit('auth', nextProps.user.current.publicId)
            if (nextProps.user.current.role === 'styler') {
                this.props.checkStylerRegStatus();
            } else {
                this.props.navigation.dispatch(NavigationService.resetAction('Home'))
            }
        }
        if (nextProps.user.auth__failed && nextProps.user.auth__failed != this.props.user.auth__failed) {
            this.props.navigation.navigate('Auth');
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

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.pink, }}>
                <SplashLogo />
                <Text style={{ marginTop: 50, fontSize: 18, color: colors.white, fontFamily: fonts.medium, }}>Welcome</Text>
            </View>
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