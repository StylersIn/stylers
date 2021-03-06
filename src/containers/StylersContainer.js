import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Stylers';

// const Stylers = (props) => <Styler {...props} />
class Stylers extends React.Component {
    componentDidMount() {
        this.props.listService();
    }
    render() {
        return <Component {...this.props} />
    }
}

const mapStateToProps = state => ({
    home: state.home,
    // stylers: state.stylers,
    service__list: state.service.services,
    stylerService: state.styler.stylerService,
    updated: state.styler.updated,
    error: state.service.error,
    price: state.styler.servicePrice,
    subService: state.service.subService,
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stylers);