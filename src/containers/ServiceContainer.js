import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Services';

// const Services = (props) => <Component {...props} />
class Services extends React.Component {
    state = {
        isProcessing: true
    }
    componentDidMount() {
        const { navigation } = this.props;
        const service = navigation.getParam('service', '');
        setTimeout(() => {
            this.props.getServiceStylers(service._id);
        }, 3000);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stylers && nextProps.stylers !== this.props.stylers) {
            this.setState({ isProcessing: false });
        }
    }
    render() {
        return <Component {...this.props} {...this.state} />
    }
}

const mapStateToProps = state => ({
    service: state.service,
    stylers: state.styler.service__stylers,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);