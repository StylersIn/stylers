import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/Home';
import { AppointmentIcon } from '../navigation/assets';

// const Home = (props) => <Component {...props} />
class Home extends React.Component {
    state = {
        isProcessing: true
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
            this.setState({ isProcessing: false });
        }
    }
    render() {
        return <Component {...this.props} {...this.state} />
    }
}

const mapStateToProps = state => ({
    home: state.home,
    service__list: state.service.services,
    // isProcessing: state.service.isProcessing,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);