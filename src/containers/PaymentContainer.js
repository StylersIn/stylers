import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Payment';

const Payment = (props) => <Component {...props} />

const mapStateToProps = state => ({
    payment: state.payment,
    booked: state.appointment.booked,
    date: state.appointment.date,
    location: state.appointment.location,
    services: state.styler.selectedService,
    pickUp: state.map.selectedAddress.location,
    streetName: state.map.selectedAddress.name,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);