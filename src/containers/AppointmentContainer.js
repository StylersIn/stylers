import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Appointments';
import { AppointmentIcon } from '../navigation/assets';
import { roles } from '../constants/DefaultProps';

class Appointments extends React.Component {
    state = {
        isProcessing: true
    }
    componentDidMount() {
        if (this.props.role === roles.user) {
            this.props.listAppointments();
        } else if (this.props.role === roles.styler) {
            this.props.listStylerAppointments();
        } else { }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.appointments && nextProps.appointments !== this.props.appointments) {
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
    appointments: state.appointment.appointments,
    role: state.user.current && state.user.current.role,
    username: state.user.current && state.user.current.name.split(' '),
    location: state.map.location,
    stats: state.styler.stats,
    current: state.user.current,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);