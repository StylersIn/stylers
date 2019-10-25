import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Services';

// const Services = (props) => <Component {...props} />
class Services extends React.Component {
    componentDidMount() {
        const { navigation } = this.props;
        const service = navigation.getParam('service', '');
        this.props.getServiceStylers(service._id);
    }
    render() {
        return <Component {...this.props} />
    }
}

const mapStateToProps = state => ({
    service: state.service,
    styler: state.styler.service__stylers,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);