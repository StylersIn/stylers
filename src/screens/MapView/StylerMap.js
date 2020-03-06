import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Platform, Linking, TouchableOpacity, } from 'react-native';
import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import Text from '../../config/AppText';
import { Thumbnail, Card, CardItem, Icon, Spinner, Textarea } from 'native-base';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { fonts, colors, MAP_API_KEY } from '../../constants/DefaultProps';
import { CallIcon, ChatIcon, CloseIcon, ArrowDown, SwiperIcon, PickUpIcon, } from './MapAssets';
import MapViewDirections from 'react-native-maps-directions';
import styler_location from '../../../assets/imgs/styler-location.jpg';
import styler_img from '../../../assets/imgs/styler_img.png';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Geocoder from 'react-native-geocoding';
import { notify } from '../../services';
import BottomSheet from './BottomSheet';
import NavigationService from '../../navigation/NavigationService';
import Geolocation from '@react-native-community/geolocation';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Axios from 'axios';
import * as constants from '../../constants/ActionTypes';
Geocoder.init(MAP_API_KEY);

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = MAP_API_KEY;

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const DEFAULT_PADDING = Platform.OS === 'ios' ? { top: 200, right: 50, bottom: 400, left: 50 } : { top: 500, right: 200, bottom: 800, left: 200 };
const LATITUDE_DELTA = Platform.OS == 'android' ? 0.007 : 0.009;
const LONGITUDE_DELTA = Platform.OS == 'android' ? 0.007 : 0.009;
const initialRegion = {
    // latitude: 6.446734,
    // longitude: 6.446734,
    latitude: -37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
// const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const DEFAULT_PADDING_ANDROID = { top: 600, right: 600, bottom: 600, left: 600 };
const HEADER_HEIGHT = 30;

class StylerMap extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        region: {
            latitude: this.props.location.coords.latitude,
            longitude: this.props.location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        appointment: undefined,
        markers: [],
        coordinate: new AnimatedRegion({
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0
        }),
        completeService: false,
        showReview: false,
        ready: true,
        hasRegion: false,
    }
    componentDidMount() {
        this.props.getCurrentLocation();
        this.setState({ appointment: this.props.navigation.getParam('appointment', '') }, () => {
            this.watchLocation();
        })
        this.updateStylerCurrentLocation();
        this.getCurrentPosition()
    }
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.location && prevProps.location != this.props.location) {
            // this.getAddress({
            //     latitude: prevProps.location.coords.latitude,
            //     longitude: prevProps.location.coords.longitude,
            // })
            this.fitAllMarkers();
            this.setState({
                hasRegion: true,
                region: {
                    latitude: prevProps.location.coords.latitude,
                    longitude: prevProps.location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            }, () => {
                // setTimeout(() => {
                //     this.fitAllMarkers()
                // }, 1000);
            })
        }

        if (prevProps.completed && prevProps.completed !== this.props.completed) {
            alert('Successfully completed')
            if (this.state.appointment.userId.publicId === this.props.current.publicId) {
                notify('Service Completed', 'Hi there! You just completed this service.');
            }
            this.props.navigation.dispatch(NavigationService.resetAction('Requests'))
            this.props.socket.emit('serviceCompleted', this.state.appointment.userId.publicId);
            // this.props.listStylerRequests();
        }
    }

    updateStylerCurrentLocation = () => {
        // var ID = setInterval(() => {
        //     this.props.updateStylerCurrentLocation();
        // }, 3000);
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    setRegion = (region) => {
        if (this.state.ready) {
            this.getAddress({
                latitude: region.latitude,
                longitude: region.longitude,
            })
            setTimeout(() => this.map.animateToRegion(region), 10);
        }
    }

    getCurrentPosition() {
        try {
            Geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    this.setRegion(region);
                },
                (error) => {
                    //TODO: better design
                    switch (error.code) {
                        case 1:
                            if (Platform.OS === "ios") {
                                Alert.alert("", error.code);
                            } else {
                                Alert.alert("", error.code);
                            }
                            break;
                        default:
                            Alert.alert("", error.code);
                    }
                },
                { enableHighAccuracy: true, timeout: 20000, }
            );
        } catch (e) {
            alert(e.message || "");
        }
    };

    onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ ready: true });
        }
    };

    watchLocation = () => {
        const { coordinate, appointment, } = this.state;

        this.watchID = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;

                // const newCoordinate = {
                //     latitude,
                //     longitude
                // };

                // if (Platform.OS === "android") {
                //     if (this.marker) {
                //         this.marker._component.animateMarkerToCoordinate(
                //             newCoordinate,
                //             500 // 500 is the duration to animate the marker
                //         );
                //     }
                // } else {
                //     coordinate.timing(newCoordinate).start();
                // }

                // this.setState({
                //     region: {
                //         latitude,
                //         longitude
                //     }
                // });

                var region = {
                    latitude,
                    longitude
                }
                var credentials = {
                    Id: appointment._id,
                    userKey: appointment.userId.publicId,
                }
                this.props.socket.emit('stylerLocation', region, credentials);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10
            }
        );
    };

    showToastMessage = message => this.setState({ message });

    getAddress = (region) => {
        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${MAP_API_KEY}`)
            .then((response) => {
                const result = response.data.results[0];
                this.setState({ currentAddress: result.formatted_address });
            })
            .catch((err) => console.log(err))
    }

    fitAllMarkers = () => {
        const { region, appointment } = this.state;
        console.log('-========================')
        console.log(region)
        console.log(appointment)
        const MARKERS = [{
            longitude: region.longitude,
            latitude: region.latitude
        }, {
            longitude: parseFloat(appointment.pickUp.longitude),
            latitude: parseFloat(appointment.pickUp.latitude),
        }]
        this.map.fitToCoordinates(MARKERS, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }

    endService = (status) => {
        this.setState({ completeService: true, })
        this.props.updateAppointmentStatus({ appointmentId: this.state.appointment._id }, constants.COMPLETED);
    }

    rate = () => {

    }

    render() {
        const { region, appointment } = this.state;
        return (
            <View style={styles.container}>
                {this.state.completeService && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, elevation: 5, zIndex: 1000, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.9)', }}>
                    <Spinner style={{ alignItems: "center" }} isVisible={true} size={100} color={colors.pink} />
                    {/* {error && <CheckCircle />} */}
                    {this.props.error && <Text style={{ color: colors.white, marginTop: 30, fontFamily: fonts.medium, fontSize: 16, }}>{this.props.error}</Text>}
                </View>}
                <MapView
                    ref={e => this.map = e}
                    provider={'google'}
                    style={styles.map}
                    // initialRegion={initialRegion}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followUserLocation={true}
                    showsCompass={true}
                    zoomEnabled={true}
                    loadingEnabled={true}
                >
                    {appointment && this.state.hasRegion && <MapViewDirections
                        origin={this.state.region}
                        destination={appointment.pickUp.latitude + "," + appointment.pickUp.longitude}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={Platform.OS == 'ios' ? 2.5 : 4}
                        strokeColor={colors.pink}
                    />}
                    {region && appointment && <Marker
                        title={appointment.stylerId.name}
                        image={styler_img}
                        key={appointment.stylerId.publicId}
                        coordinate={region}
                    />}

                    {appointment && <Marker
                        title={'Destination'}
                        // image={styler_location}
                        key={appointment.userId.publicId}
                        coordinate={{
                            longitude: parseFloat(appointment.pickUp.longitude),
                            latitude: parseFloat(appointment.pickUp.latitude),
                        }}
                    >
                        <PickUpIcon />
                    </Marker>}

                    {/* <Marker
                        title={'PickUp'}
                        // image={pickUpIcon}
                        key={appointment.userId}
                        coordinate={appointment.pickUp}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.text}>5mins</Text>
                        </View>
                        <View style={{ position: 'absolute', left: 24, bottom: 2 }}>
                            <PickUpIcon />
                        </View>
                    </Marker> */}
                    {/* <Marker.Animated
                        ref={marker => {
                            this.marker = marker;
                        }}
                        coordinate={this.state.coordinate}
                    /> */}
                </MapView>
                <BottomSheet
                    {...this.props}
                    {...this.state}
                    endService={this.endService}
                />
            </View>
        );
    }
}

StylerMap.propTypes = {
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
    map_btn: {
        marginTop: 50,
        width: 65,
        height: 65,
        borderWidth: 1,
        borderRadius: 65 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
    },
    map_btn_icon: {
        borderRadius: 65 / 2,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker: {
        backgroundColor: colors.pink,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        position: 'relative',
        bottom: 60,
    },
    text: {
        fontFamily: fonts.bold,
        color: '#ffffff',
    },
    header: {
        height: HEADER_HEIGHT,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    drawerIcon: {
        width: 35,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#D5DDE0',
    },
    reviewInput: {
        borderWidth: 1,
        borderColor: '#D5DDE0',
        borderRadius: 5,
        backgroundColor: '#F7F8F9',
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.gray,
    },
});

const mapStateToProps = state => ({
    location: state.map.location,
    completed: state.appointment.completed,
    currentAddress: state.map.currentAddress,
    error: state.appointment.error,
    current: state.user.current,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StylerMap);