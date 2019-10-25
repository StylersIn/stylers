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
                if (!token) this.props.navigation.navigate('Login');
                this.props.InitializeApp({ token });
            })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.props.navigation.navigate('Home');
        }
        if (nextProps.user.auth__failed && nextProps.user.auth__failed != this.props.user.auth__failed) {
            this.props.navigation.navigate('Login');
        }
        // if (nextProps.resident.verified && nextProps.resident.verified != this.props.resident.verified) {
        //     setTimeout(() => {
        //         if (nextProps.resident.status === false) {
        //             this.props.navigation.dispatch(resetAction('OnBoard'));
        //         } else {
        //             this.props.navigation.dispatch(resetAction('Dashboard'));
        //         }
        //     }, 0);
        // }
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
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InitializeApp);