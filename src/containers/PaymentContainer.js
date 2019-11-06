import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Payment';

const Payment = (props) => <Component {...props} />

const mapStateToProps = state => ({
    payment: state.payment,
    booked: state.booking.booked,
    date: state.booking.date,
    location: state.booking.location,
    services: state.styler.selectedService,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);