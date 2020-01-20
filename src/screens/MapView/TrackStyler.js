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
import Geocoder from 'react-native-geocoding';
import { notify } from '../../services';
import BottomSheet from './BottomSheet';
import NavigationService from '../../navigation/NavigationService';
import { pickUp } from '../Assets';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-ratings';
Geocoder.init(MAP_API_KEY);

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = MAP_API_KEY;

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const DEFAULT_PADDING_ANDROID = { top: 600, right: 600, bottom: 600, left: 600 };
const HEADER_HEIGHT = 30;

class StylerMap extends React.Component {
    constructor(props) {
        super(props);
        this.region = {
            latitude: this.props.location.coords.latitude,
            longitude: this.props.location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        this.props.socket.on('driverLocation', (location) => {
            console.log(location);
            // this.fitAllMarkers({
            //     latitude: parseFloat(location.latitude),
            //     longitude: parseFloat(location.longitude)
            // })
            this.props.updateDriverLocation(location);
            // this.setState({ driverLocation: location, }, () => {
            //     // if (!this.state.fitOnce) {
            //     //     this.fitAllMarkersMain();
            //     //     this.setState({ fitOnce: true, })
            //     // }
            // })
        })
        this.props.socket.on('reviews.send', () => {
            console.log('show review');
            this.setState({ showReview: true, })
        })
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
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
        }),
        driverLocation: undefined,
        fitOnce: false,
        completeService: false,
        showReview: false,
    }
    componentDidMount() {
        // this.props.getCurrentLocation();
        this.setState({ appointment: this.props.navigation.getParam('appointment', '') }, () => {
            setTimeout(() => {
                this.fitAllMarkers();
            }, 1000);
        })
    }
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.completed && prevProps.completed !== this.props.completed) {
            alert('Successfully completed')
            if (this.state.appointment.userId.publicId === this.props.current.publicId) {
                notify('Service Completed', 'Hi there! You just completed this service.');
            }
            this.props.navigation.dispatch(NavigationService.resetAction('Requests'))
            // this.props.listStylerRequests();
        }
        if (prevProps.driverLocation && prevProps.driverLocation != this.props.driverLocation) {
            this.fitAllMarkersMain(prevProps.driverLocation);
        }
    }

    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

    // watchLocation = () => {
    //     const { coordinate } = this.state;

    //     this.watchID = navigator.geolocation.watchPosition(
    //         position => {
    //             const { latitude, longitude } = position.coords;

    //             const newCoordinate = {
    //                 latitude,
    //                 longitude
    //             };

    //             if (Platform.OS === "android") {
    //                 if (this.marker) {
    //                     this.marker._component.animateMarkerToCoordinate(
    //                         newCoordinate,
    //                         500 // 500 is the duration to animate the marker
    //                     );
    //                 }
    //             } else {
    //                 coordinate.timing(newCoordinate).start();
    //             }

    //             this.setState({
    //                 region: {
    //                     latitude,
    //                     longitude
    //                 }
    //             });
    //         },
    //         error => console.log(error),
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 20000,
    //             maximumAge: 1000,
    //             distanceFilter: 10
    //         }
    //     );
    // };

    showToastMessage = message => this.setState({ message });

    getAddress = (address) => {
        Geocoder.from(address)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                this.setState({ currentAddress: addressComponent.short_name })
            })
            .catch(error => console.warn(error));
    }

    fitAllMarkers = () => {
        const { appointment } = this.state;
        const MARKERS = [this.region, {
            longitude: parseFloat(appointment.pickUp.longitude),
            latitude: parseFloat(appointment.pickUp.latitude),
        }];
        this.map.fitToCoordinates(MARKERS, {
            edgePadding: Platform.OS == 'android' ? DEFAULT_PADDING_ANDROID : DEFAULT_PADDING,
            animated: true,
        });
    }

    fitAllMarkersMain = (location) => {
        console.log('fit all')
        console.log(location);
        const { appointment } = this.state;
        const MARKERS = [
            // this.region,
            {
                longitude: parseFloat(appointment.pickUp.longitude),
                latitude: parseFloat(appointment.pickUp.latitude),
            },
            {
                longitude: parseFloat(location.longitude),
                latitude: parseFloat(location.latitude),
            }
        ];
        this.map.fitToCoordinates(MARKERS, {
            edgePadding: Platform.OS == 'android' ? DEFAULT_PADDING_ANDROID : DEFAULT_PADDING,
            animated: true,
        });
    }

    endService = () => {
        this.setState({ completeService: true, })
        this.props.completeService({ appointmentId: this.state.appointment._id });
    }

    render() {
        const { appointment } = this.state;
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
                    region={this.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followUserLocation={true}
                    showsCompass={true}
                    zoomEnabled={true}
                    loadingEnabled={true}
                    // onRegionChangeComplete={this.props.driverLocation ? this.fitAllMarkersMain() : this.fitAllMarkers(this.props.driverLocation)}
                >
                    {/* {appointment && <MapViewDirections
                        origin={this.state.region}
                        destination={appointment.pickUp.latitude + "," + appointment.pickUp.longitude}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={2}
                        strokeColor={colors.pink}
                    />} */}
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

                    {this.props.driverLocation && appointment && <Marker
                        title={'Styler Coming'}
                        image={styler_img}
                        key={appointment.stylerId.publicId}
                        coordinate={this.props.driverLocation}
                    />}


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
                    role={'USER'}
                />

                {this.state.showReview && <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, elevation: 5, zIndex: -1000, }, this.state.showReview ? { zIndex: 1000 } : null]}>
                    <Modal
                        // closeModal={this.closeModal}
                        hideCloseBtn={true}
                        isVisible={this.state.showReview}
                    >
                        <View style={styles.header}>
                            <View style={styles.drawerIcon}></View>
                        </View>
                        {appointment ? <View>
                            <View style={{ alignItems: 'center', }}>
                                <Thumbnail source={styler_img} />
                                <Text style={{ fontFamily: fonts.bold, marginTop: 5, }}>{appointment.stylerId.name}</Text>
                                <View style={{ marginVertical: 7, flexDirection: "row", }}>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        startingValue={0}
                                        ratingColor={colors.pink}
                                        ratingTextColor={colors.pink}
                                        ratingBackgroundColor={colors.pink}
                                        imageSize={18}
                                        showRating={false}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </View>
                                <Text style={{ marginVertical: 10, }}>Excellent</Text>
                            </View>
                            <Textarea
                                rowSpan={4}
                                placeholderTextColor={'#ccc'}
                                style={styles.reviewInput}
                                // bordered
                                placeholder={'Message'}
                            />
                            <View style={{ marginTop: 20, width: '100%' }}>
                                <Button
                                    onPress={this.rate}
                                    btnTxt={"Rate"}
                                    size={"lg"}
                                    styles={{ height: 40, }}
                                    btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                />
                            </View>
                        </View> : <Spinner color={colors.pink} />}
                    </Modal>
                </View>}
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
        justifyContent: 'center',
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
    driverLocation: state.map.driverLocation,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StylerMap);