import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Payment';
import { AppointmentIcon } from '../navigation/assets';

// const Payment = (props) => <Component {...props} />
class Payment extends React.Component {
    state = {
        isProcessing: true,
        filterErr: undefined,
        // services: undefined,
        totalAmount: '',
    }
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }
    componentDidMount() {
        const { stylerData } = this.props;
        // let totalAmount = navigation.getParam('totalAmt', '');
        this.setState({ totalAmount: stylerData.totalAmt, })
        this.props.initTransaction({
            amount: stylerData.totalDue,
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.transactionDetails && nextProps.transactionDetails !== this.props.transactionDetails) {
            this.setState({ isProcessing: false, });
        }
    }
    render() {
        return <Component {...this.props} {...this.state} />
    }
}

const mapStateToProps = state => ({
    payment: state.payment,
    booked: state.appointment.booked,
    date: state.appointment.date,
    location: state.appointment.location,
    services: state.styler.selectedService,
    pickUp: state.map.selectedAddress.location,
    streetName: state.map.selectedAddress.name,
    email: state.user.current.email,
    socket: state.socket,
    transactionDetails: state.appointment.transactionDetails,
    stylerData: state.appointment.stylerData,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);