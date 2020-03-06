import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Home';
import { AppointmentIcon } from '../navigation/assets';

// const Home = (props) => <Component {...props} />
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        isProcessing: true,
        filterErr: undefined,
        services: undefined,
    }
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }
    componentDidMount() {
        this.props.listService();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.service__list && nextProps.service__list !== this.props.service__list) {
            this.setState({ isProcessing: false, services: nextProps.service__list, });
        }
        if (nextProps.searching === true) {
            this.setState({ isProcessing: true, filterErr: undefined, });
        }
        if (nextProps.resetFilter === true) {
            this.setState({ isProcessing: false, services: nextProps.service__list, });
        }
        if ((nextProps.filteredServices && nextProps.filteredServices != this.props.filteredServices) ||
            nextProps.searching == false && nextProps.searching != this, this.props.searching) {
            this.setState({ isProcessing: false, filterErr: nextProps.message, services: nextProps.filteredServices, });
        }
    }
    render() {
        return <Component {...this.props} {...this.state} />
    }
}

const mapStateToProps = state => ({
    home: state.home,
    service__list: state.service.services,
    socket: state.socket,
    filteredServices: state.service.filteredServices,
    searching: state.service.searching,
    message: state.service.message,
    resetFilter: state.service.v,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);