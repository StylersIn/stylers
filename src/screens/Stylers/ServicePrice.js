import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fonts, colors, imgUrl } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FlatList } from 'react-native-gesture-handler';
import { AppointmentIcon } from '../../navigation/assets';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { Spinner, Item, Input } from 'native-base';
import { Naira } from '../Assets';
import { EmptyAppointment } from '../Appointments/AppointmentAssets';

const propTypes = {
    // onSelect: PropTypes.func,
}

class ServicePrice extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    state = {
        service: undefined
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stylerServices && nextProps.stylerServices != this.props.stylerServices) {

        }
    }

    componentDidMount() {
        this.setState({ service: this.props.navigation.getParam('service', '') }, () => {
            // this.props.getSubServices(this.state.service._id);
        });
    }

    getDefaultVal = (servicePrice, id, meta) => {
        console.log('fjfjfhfjfjfhhfhfhfhfhfh')
        // console.log(servicePrice.length > 0 && servicePrice.filter(e => e.subServiceId === id)[0] ? servicePrice.filter(e => e.subServiceId === id)[0][meta] : '')
        return servicePrice.length > 0 && servicePrice.filter(e => e.subServiceId === id)[0] ? servicePrice.filter(e => e.subServiceId === id)[0][meta] : '';
    }

    render() {
        const _keyExtractor = (item, index) => item.name;
        const { service } = this.state;
        const servicePrice = this.props.price || [];
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={styles.container}>
                        <Header
                            hamburger={true}
                            title={service ? service.name : ''}
                        />
                        <View style={{ width: "80%", }}>
                            <Text style={styles.basic__1}>Help us with a price in NGN for each service</Text>
                        </View>
                        {service && service.subServices.length > 0 ? <>
                            {/* <FlatList
                                // contentContainerStyle={{ backgroundColor:"red" }}
                                data={service__list && service__list.credentials.message}
                                numColumns={2}
                                keyExtractor={_keyExtractor}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1 / 2, paddingEnd: 10, justifyContent: "space-between" }}>
                                        <TouchableOpacity
                                            disabled={selected.findIndex(e => e.serviceId === item._id) === -1 ? false : true}
                                            onPress={() => props.onSelect(item)}
                                            activeOpacity={0.7}>
                                            <Image
                                                style={[styles.img]}
                                                source={{ uri: item.imageUrl || imgUrl }} />
                                            <View style={[styles.overlay, { backgroundColor: selected.findIndex(e => e.serviceId === item._id) === -1 ? 'rgba(0,0,0,0.5)' : 'rgba(200,160,200.5,0.5)' }]} />
                                            <View style={{ position: "relative", bottom: "50%" }}>
                                                <Text style={styles.overlayTxtMain}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            /> */}
                            {service.subServices.map((subService, i) => <View key={i} style={styles.child__container}>
                                <Text style={{ paddingHorizontal: 4, fontFamily: fonts.bold, fontSize: 16, }}>{subService.name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '47%' }}>
                                        <Text style={{ padding: 4, fontSize: 12, }}>Adult</Text>
                                        <Item style={styles.input} regular>
                                            <View style={styles.inputAddon}>
                                                <Naira />
                                            </View>
                                            <Input
                                                style={{ fontFamily: fonts.medium, fontSize: 12, }}
                                                placeholder='0.00'
                                                keyboardType={'numeric'}
                                                defaultValue={this.getDefaultVal(servicePrice, subService._id, 'adult')}
                                                onEndEditing={(e) => this.props.servicePrice({ serviceId: service._id, subServiceId: subService._id, adult: e.nativeEvent.text })}
                                            />
                                        </Item>
                                    </View>
                                    <View style={{ width: '47%' }}>
                                        <Text style={{ padding: 4, fontSize: 12, }}>Child</Text>
                                        <Item style={styles.input} regular>
                                            <View style={styles.inputAddon}>
                                                <Naira />
                                            </View>
                                            <Input
                                                style={{ fontFamily: fonts.medium, fontSize: 12, }}
                                                placeholder='0.00'
                                                keyboardType={'numeric'}
                                                defaultValue={this.getDefaultVal(servicePrice, subService._id, 'child')}
                                                // onBlur={()=>alert('fff')}
                                                onEndEditing={(e) => this.props.servicePrice({ serviceId: service._id, subServiceId: subService._id, child: e.nativeEvent.text })}
                                            />
                                        </Item>
                                    </View>
                                </View>
                            </View>)}
                            <View style={{ marginTop: 47 }}>
                                <Button
                                    onPress={() => this.props.navigation.goBack()}
                                    btnTxt={"Save Price"}
                                    size={"lg"}
                                    btnTxtStyles={{ color: colors.white, fontFamily: fonts.bold }}
                                />
                            </View>
                        </> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <EmptyAppointment />
                                <Text style={{ fontSize: 20, paddingVertical: 40, fontFamily: fonts.medium, }}>No sub services</Text>
                            </View>}
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    child__container: {
        // flex: 1,
        marginTop: 20,
    },
    grid__main: {
        marginTop: 10,
    },
    grid__child: {
        // flexDirection: "row",
        marginTop: -8,
        // justifyContent: "space-between",
    },
    img: {
        width: "100%",
        height: 100,
        borderRadius: 5,
        resizeMode: "cover",
    },
    overlayTxtMain: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white,
        textAlign: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: 100,
        // marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
    },
    basic__1: {
        color: "#979797",
        marginTop: 10,
    },
    input: {
        height: 40,
        borderRadius: 5,
    },
    inputAddon: {
        width: 40,
        backgroundColor: '#C4C4C4',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapStateToProps = state => ({
    service__list: state.service.services,
    stylerServices: state.styler.stylerServices,
    price: state.styler.servicePrice,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServicePrice);