import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Services';

// const Services = (props) => <Component {...props} />
class Services extends React.Component {
    state = {
        isProcessing: true,
        // serviceId: '',
    }
    componentDidMount() {
        const { navigation, location, } = this.props;
        const service = navigation.getParam('service', '');
        this.props.getServiceStylers(service._id, JSON.stringify([location.longitude, location.latitude]));
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stylers && nextProps.stylers !== this.props.stylers) {
            this.setState({ isProcessing: false });
        }
        if (!nextProps.stylers && nextProps.processing === true) {
            this.setState({ isProcessing: true });
        }
    }
    render() {
        const { navigation } = this.props;
        const service = navigation.getParam('service', '');
        return <Component {...this.props} {...this.state} serviceId={service._id} />
    }
}

const mapStateToProps = state => ({
    service: state.service,
    stylers: state.styler.service__stylers,
    processing: state.styler.isProcessing,
    location: state.user.location,
    message: state.styler.message,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);