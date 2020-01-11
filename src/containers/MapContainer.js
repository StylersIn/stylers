import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import Component from '../screens/MapView';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
class MapView extends React.Component {
    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
    }
    componentDidMount() {
        this.props.getCurrentLocation();
    }
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.location && prevProps.location != this.props.location) {
            this.setState({
                region: {
                    latitude: prevProps.location.coords.latitude,
                    longitude: prevProps.location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            })
        }
    }
    render() {
        return <Component {...this.props} {...this.state} />
    }
}

const mapStateToProps = state => ({
    location: state.map.location,
    inputData: state.map.inputData,
    searching: state.map.searching,
    predictions: state.map.predictions,
    selectedAddress: state.map.selectedAddress,
    error: state.map.error,
    currentAddress: state.map.currentAddress,
    current: state.user.current,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapView);