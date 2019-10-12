import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Appointments';
import { AppointmentIcon } from '../navigation/assets';

class Appointments extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }
    render() {
        return (
            <Component {...this.props} />
        )
    }
}

const mapStateToProps = state => ({
    appointment: state.appointment,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);