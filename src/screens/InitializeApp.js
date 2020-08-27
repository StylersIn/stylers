import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as constants from '../constants/ActionTypes';
import NavigationService from '../navigation/NavigationService';

class InitializeApp extends React.Component {
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
                    //check that styler is verified
                    alert(nextProps.styler.isVerified)
                    if (nextProps.styler.isVerified) {
                        this.props.navigation.dispatch(NavigationService.resetAction('Requests'))
                    }
                    alert("Sorry, this account has not been verified. If this error persists 48hours after regsitration, kindly contact the administrator.");
                    AsyncStorage.removeItem(constants.TOKEN);
                } else {
                    this.props.navigation.dispatch(NavigationService.resetAction('StylerService'))
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InitializeApp);