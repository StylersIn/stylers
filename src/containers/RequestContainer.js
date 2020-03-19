import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Requests';
import { AppointmentIcon } from '../navigation/assets';
import { roles, fonts, colors } from '../constants/DefaultProps';
import { Badge } from 'native-base';
import { View } from 'react-native';
import Text from '../config/AppText';

class Requests extends React.Component {
    state = {
        isProcessing: true
    }
    componentDidMount() {
        this.props.listStylerRequests();
        this.props.getStats();
        this.props.navigation.setParams({
            requests: this.props.requests
        })
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
        ),
        // drawerLabel: ({ state }) => <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
        //     <Text style={{ margin: 16, fontFamily: fonts.bold, fontSize: 15, color: colors.white, }}>
        //         Requests
        // </Text>
        //     {state.params.requests.length && <View style={{ width: 25, height: 25, borderRadius: 25 / 2, justifyContent: 'center', backgroundColor: colors.danger, position: 'relative', right: 20, bottom: 5, }}>
        //         <Text style={{ textAlign: 'center', color: colors.white, fontFamily: fonts.medium }}>{state.params.requests.length}</Text>
        //     </View>}
        // </View>,
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
    publicId: state.user.current && state.user.current.publicId,
    updated: state.appointment.updated,
    stats: state.styler.stats,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requests);