import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import MapView, { ProviderPropType } from 'react-native-maps';
import MapSearch from './MapSearch';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ShowMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    region={this.props.region}
                // customMapStyle={customStyle}
                />
                <MapSearch
                    getAddressPredictions={this.props.getAddressPredictions}
                    getInputData={this.props.getInputData}
                    inputData={this.props.inputData}
                    searching={this.props.searching}
                    predictions={this.props.predictions}
                    error={this.props.error}
                    getSelectedAddress={this.props.getSelectedAddress}
                    selectedAddress={this.props.selectedAddress}
                />
            </View>
        );
    }
}

ShowMap.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default ShowMap;