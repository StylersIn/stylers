import React from 'react';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Platform, Linking, TouchableOpacity, Vibration, Image, } from 'react-native';
import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import Text from '../../config/AppText';
import { Thumbnail, Card, CardItem, Icon, Spinner, Textarea } from 'native-base';
import { fonts, colors, MAP_API_KEY } from '../../constants/DefaultProps';
import { ComingIcon, PickUpIcon, } from './MapAssets';
import styler_img from '../../../assets/imgs/styler_img.png';
import Geocoder from 'react-native-geocoding';
import { notify } from '../../services';
import BottomSheet from './BottomSheet';
import NavigationService from '../../navigation/NavigationService';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Geolocation from '@react-native-community/geolocation';
Geocoder.init(MAP_API_KEY);

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = MAP_API_KEY;

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA_PLUS = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LONGITUDE_DELTA_PLUS = LATITUDE_DELTA_PLUS * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const DEFAULT_PADDING_ANDROID = { top: 600, right: 600, bottom: 600, left: 600 };
const HEADER_HEIGHT = 30;

class StylerMap extends React.Component {
    constructor(props) {
        super(props);
        this.rating = 5;
        this.region = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
            this.props.socket.on('stylerLocation.send', (location) => {
                // console.log(location);
                // this.fitAllMarkers({
                //     latitude: parseFloat(location.latitude),
                //     longitude: parseFloat(location.longitude)
                // })
                this.props.updateUserStylerLocation(location);
                // this.setState({ driverLocation: location, }, () => {
                //     // if (!this.state.fitOnce) {
                //     //     this.fitAllMarkersMain();
                //     //     this.setState({ fitOnce: true, })
                //     // }
                // })
            })
        this.props.socket.on('reviews.send', () => {
            // console.log('show review');
            Vibration.vibrate();
            notify('Service completed', 'Styler has successfully completed your service');
            this.setState({ showReview: true, })
        })
    }
    state = {
        region: {
            latitude: 0,
            longitude: 0,
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
        userStylerLocation: undefined,
        fitOnce: false,
        completeService: false,
        ready: true,
        animateCount: 0,
        showReview: false,
        isProcessing: false,
        count: 0,
    }
    componentDidMount() {
        this.props.getCurrentLocation();
        this.getCurrentPosition();
        this.setState({ appointment: this.props.navigation.getParam('appointment', '') }, () => {
            // setTimeout(() => {
            //     this.fitAllMarkers();
            // }, 1000);
            const { appointment } = this.state;
            var region = {
                latitude: parseFloat(appointment.pickUp.latitude),
                longitude: parseFloat(appointment.pickUp.longitude),
                latitudeDelta: LATITUDE_DELTA_PLUS,
                longitudeDelta: LONGITUDE_DELTA_PLUS,
            }
            setTimeout(() => {
                this.map.animateToRegion(region);
            }, 1000);
        })
    }
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.rating && prevProps.rating !== this.props.rating) {
            alert('Review noted!')
            this.props.navigation.dispatch(NavigationService.resetAction('Appointments'))
        }
        if (prevProps.error && prevProps.error !== this.props.error) {
            this.setState({ isProcessing: false, })
            alert('An error occured: ' + prevProps.error)
        }
        if (prevProps.userStylerLocation && prevProps.userStylerLocation != this.props.userStylerLocation) {
            const { count, } = this.state;
            var region = {
                latitude: prevProps.userStylerLocation.latitude,
                longitude: prevProps.userStylerLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            if (this.state.count == 0) {
                this.map.animateToRegion(region);
            }
            if (count == 10) {
                console.log('we start again');
                this.setState({ count: 0, }, () => this.map.animateToRegion(region));
            }
            this.setState({ userStylerLocation: region });
            this.setState(prevState => {
                return { count: prevState.count + 1 }
            })

            // if (this.state.animateCount == 0) {
            //     this.setState((prevState) => ({ animateCount: prevState.animateCount + 1, }));
            //     var region = {
            //         latitude: prevProps.driverLocation.latitude,
            //         longitude: prevProps.driverLocation.longitude,
            //         latitudeDelta: LATITUDE_DELTA,
            //         longitudeDelta: LONGITUDE_DELTA,
            //     }
            //     this.map.animateToRegion(region);
            // } else if (this.state.animateCount == 5) {
            //     this.setState({ animateCount: 0, });
            // }
            // this.fitAllMarkersMain(prevProps.driverLocation);
        }
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
                    alert(error.message);
                },
                { enableHighAccuracy: false, timeout: 20000, }
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
        // console.log('fit all')
        // console.log(location);
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

    rate = () => {
        this.setState({ isProcessing: true, });
        this.props.addRating({
            message: this.review,
            appointmentId: this.state.appointment._id,
            rating: this.rating,
            stylerId: this.state.appointment.stylerId.userId
        });
    }

    render() {
        const { appointment } = this.state;
        const { userStylerLocation } = this.props;
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
                    // region={this.region}
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
                        key={appointment.publicId}
                        coordinate={{
                            longitude: parseFloat(appointment.pickUp.longitude),
                            latitude: parseFloat(appointment.pickUp.latitude),
                        }}
                    >
                        <PickUpIcon />
                    </Marker>}

                    {/* {this.props.driverLocation && appointment && <Marker
                        title={'Styler Coming'}
                        image={styler_img}
                        key={appointment.stylerId.publicId}
                        coordinate={this.props.driverLocation}
                    />} */}
                    {userStylerLocation && (
                        <>
                            <MapView.Marker
                                coordinate={userStylerLocation}
                                title={'coming...'}>
                                <Image
                                    style={{ width: 60, height: 60, resizeMode: 'contain', }}
                                    source={styler_img}
                                />
                            </MapView.Marker>
                        </>
                    )}
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
                                        startingValue={5}
                                        ratingColor={colors.pink}
                                        ratingTextColor={colors.pink}
                                        ratingBackgroundColor={colors.pink}
                                        imageSize={18}
                                        showRating={false}
                                        onFinishRating={e => this.rating = e}
                                    />
                                </View>
                                <Text style={{ marginVertical: 10, }}>Excellent</Text>
                            </View>
                            <Textarea
                                onChangeText={e => this.review = e}
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
                                    loading={this.state.isProcessing}
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
    userStylerLocation: state.map.userStylerLocation,
    rating: state.appointment.rating,
    error: state.appointment.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StylerMap);