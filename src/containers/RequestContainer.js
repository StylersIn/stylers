import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Requests';
import { AppointmentIcon } from '../navigation/assets';
import { roles } from '../constants/DefaultProps';

class Requests extends React.Component {
    state = {
        isProcessing: true
    }
    componentDidMount() {
        this.props.listStylerRequests();
        this.props.getStats();
        // if (this.props.role === roles.user) {
        //     this.props.listAppointments();
        // } else if (this.props.role === roles.styler) {
        //     this.props.listStylerAppointments();
        // } else { }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.requests && nextProps.requests !== this.props.requests) {
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
    requests: state.appointment.requests,
    role: state.user.current && state.user.current.role,
    username: state.user.current && state.user.current.name.split(' '),
    publicId: state.user.current.publicId,
    accepted: state.appointment.accepted,
    stats: state.styler.stats,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requests);