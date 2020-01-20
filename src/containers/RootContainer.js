import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import AppNavigator from '../navigation';
import { NavigationActions } from 'react-navigation';
import NavigationService from '../navigation/NavigationService';

class Root extends React.Component {
    state = {
        isProcessing: true
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
    render() {
        return <AppNavigator
            ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}
        />
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Root);