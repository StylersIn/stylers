import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Appointments';
import { AppointmentIcon } from '../navigation/assets';

class Appointments extends React.Component {
    state = {
        isProcessing: true
    }
    componentDidMount() {
        this.props.listBookings();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.bookings && nextProps.bookings !== this.props.bookings) {
            this.setState({ isProcessing: false });
        }
    }
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }
    render() {
        return (
            <Component {...this.props} {...this.state} />
        )
    }
}

const mapStateToProps = state => ({
    bookings: state.booking.bookings,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);