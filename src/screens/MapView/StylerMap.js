import React from 'react'; import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { ProviderPropType } from 'react-native-maps';
import { BottomSheet } from '../../components/BottomSheet';
import Text from '../../config/AppText';
import { Thumbnail, Card, CardItem, Icon } from 'native-base';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { fonts, colors } from '../../constants/DefaultProps';
import { CallIcon, ChatIcon, CloseIcon, ArrowDown } from './MapAssets';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class StylerMap extends React.Component {
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
        const appointment = this.props.navigation.getParam('appointment', '');
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    region={this.props.region}
                />
                <BottomSheet>
                    <View style={{ paddingHorizontal: 30, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                <View>
                                    <Thumbnail
                                        style={{ width: 35, height: 35 }}
                                        source={service__1} />
                                </View>
                                <View style={{ position: 'relative', left: 10 }}>
                                    <Text style={{ fontFamily: fonts.bold }}>{appointment.userId && appointment.userId.name}</Text>
                                    <View style={{ padding: 2, paddingHorizontal: 4, borderRadius: 3, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                        <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.bold, position: 'relative', bottom: 1, }}>Point of service</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Text style={{ fontFamily: fonts.bold }}>{`NGN${appointment.totalAmount}`}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Card style={styles.map_btn}>
                                <CardItem style={styles.map_btn_icon}>
                                    <View style={{ marginTop: 10, marginRight: 1, }}>
                                        <CallIcon />
                                    </View>
                                </CardItem>
                            </Card>

                            <Card style={styles.map_btn}>
                                <CardItem style={styles.map_btn_icon}>
                                    <View style={{ marginTop: 6, }}>
                                        <ChatIcon />
                                    </View>
                                </CardItem>
                            </Card>

                            <Card style={styles.map_btn}>
                                <CardItem style={styles.map_btn_icon}>
                                    <CloseIcon />
                                </CardItem>
                            </Card>
                        </View>
                        <View style={{ marginTop: 30, }}>
                            <View style={{ borderColor: 'rgba(151, 173, 182, 0.2)', borderWidth: 0.5, borderRadius: 5, padding: 20, flexDirection: 'row', }}>
                                <Text>11:24</Text>
                                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 10, }}>
                                    <View style={{ width: 8, height: 8, borderRadius: 8 / 2, backgroundColor: colors.pink }}></View>
                                    <View style={{ width: 1, height: 40, marginTop: 5, backgroundColor: '#3E4958', }}></View>
                                    <View style={{ marginTop: 5, }}>
                                        <ArrowDown />
                                    </View>
                                </View>
                                <View>
                                    <Text>1, Thrale Street, London, SE19HW, UK</Text>
                                    <Text style={{ marginTop: 20, }}>Ealing Broadway Shopping Centre, London, W55JY, UK</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </BottomSheet>
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
    }
});

const mapStateToProps = state => ({
    location: state.map.location,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StylerMap);