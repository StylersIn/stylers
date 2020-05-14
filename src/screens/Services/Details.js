import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Linking,
    Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Card,
    CardItem,
    Body,
    DatePicker,
    Icon,
    Item,
    Input,
    Spinner,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import StylerServiceList from './StylerServiceList';
import { SafeAreaView } from 'react-navigation';
import Modal from '../../components/Modal';
import { DateIcon, TimeIcon, LocationIcon } from './ServiceAssets';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getRating, calcTotalPrice } from '../../utils/stylersUtils';
import moment from 'moment';
import Reviews from './Reviews';
import ShowToast from '../../components/ShowToast';
import { WhatsAppIcon } from '../Appointments/AppointmentAssets';
import BottomSheet from './BottomSheet';
import avatar from '../../../assets/imgs/user_two.png';

class ServiceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selected: [],
            isVisible: false,
            date: new Date(Date.now()),
            dateSelected: false,
            timeSelected: false,
            mode: 'date',
            show: false,
            bottomSheet: undefined,
        }
    }

    componentDidMount() {
        const { navigation, styler, } = this.props;
        const styler__data = navigation.getParam('styler', '');
        this.props.addStylerData(styler__data);
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
            dateSelected: mode === 'date' ? true : this.state.dateSelected,
            timeSelected: mode === 'time' ? true : this.state.timeSelected,
        });
    }

    closeModal = () => {
        this.setState({ isVisible: false });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    setDate = (event, date) => {
        date = date || this.state.date;
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
        this.props.updateDate(date);
    }

    selectService = (serviceId) => {
        this.props.updateSelectedService(serviceId);
    }

    changeOption = (subServiceId, type, option, min = 0, max = 5) => {
        this.props.updateSelectedOption(subServiceId, type, option);
    }

    pay = () => {
        const { stylerData } = this.props;
        // const styler__data = navigation.getParam('styler', '');
        const totalAmt = calcTotalPrice.apply(this, [stylerData, this.props.styler.selectedService]);
        if (this.state.dateSelected && this.props.selectedAddress && this.props.selectedAddress.name) {
            this.props.addStylerData(Object.assign(stylerData, { totalAmt, }));
            return this.props.navigation.navigate('Cards', { styler: stylerData, totalAmt })
        }
        this.showToast('Please select valid appointment credentials', toastType.danger);
    }

    toggleSheet = () => {
        this.setState({ bottomSheet: true, })
    }

    scheduleAppointment = () => {
        const totalAmt = calcTotalPrice.apply(this, [this.props.stylerData, this.props.styler.selectedService]);
        if (totalAmt === 0) {
            this.showToast('Please select a service', toastType.danger);
        } else {
            this.setState({ isVisible: !this.state.isVisible, bottomSheet: true, })
        }
    }

    showToast = (text, type) => {
        ShowToast(text, type);
    }

    openWhatsApp = _ => {
        const { stylerData } = this.props;
        Linking.openURL(`whatsapp://send?text=hello ${stylerData.name}, I would be needing your service&phone=${stylerData.user.callingCode}${stylerData.phone}`)
    }

    viewReviews = () => this.props.navigation.navigate('AllReviews', { styler: this.props.stylerData, });

    render() {
        const { show, date, mode } = this.state;
        const { navigation, styler, appointment__date, stylerData, } = this.props;
        const totalAmt = calcTotalPrice.apply(this, [this.props.stylerData, this.props.styler.selectedService]);

        return (
            <>
                {stylerData ? <View style={styles.main}>
                    <View style={{ position: "absolute", top: Platform.OS == 'ios' ? 20 : 0, right: 0, padding: 20, zIndex: 1, }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon
                                style={{ fontSize: 60, color: "#000000", alignSelf: "flex-end", }}
                                type="Ionicons"
                                name="ios-close" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.imgCover, stylerData.imageUrl ? { opacity: 1 } : { opacity: 0.5 }]}>
                        {stylerData.imageUrl ? <Image
                            style={{ height: 300, width: "100%", resizeMode: 'cover', borderRadius: 5, }}
                            source={stylerData.imageUrl ? { uri: stylerData.imageUrl } : service__1}
                        /> : null}

                        {!stylerData.imageUrl && <Image
                            style={[{ height: 100, width: 100, borderRadius: 5, }, Platform.OS == 'ios' ? { marginTop: 20 } : null]}
                            source={stylerData.imageUrl ? { uri: stylerData.imageUrl } : avatar}
                        />}
                    </View>
                    <ScrollView style={styles.container}>
                        <View style={{ paddingBottom: 50 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ fontFamily: fonts.bold, fontSize: 24, paddingBottom: 5, }}>{stylerData.name}</Text>
                                {stylerData.isActive && <View style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: colors.success,
                                    alignSelf: "center",
                                    borderRadius: 10,
                                    marginLeft: 5,
                                    borderWidth: 2,
                                    borderColor: "#F6F6F6",
                                }}>
                                </View>}
                            </View>
                            <Text>{stylerData.location.name}</Text>
                            <Text style={{ fontSize: 18 }}>Starts at <Text style={{ fontSize: 18, color: "#0E5B02", fontFamily: fonts.bold, }}>{`NGN${stylerData.startingPrice}`}</Text></Text>
                            <View style={{ marginVertical: 7, flexDirection: "row", paddingBottom: 5, }}>
                                {/* <Rating
                                type='star'
                                ratingCount={5}
                                startingValue={stylerData.ratings.length > 0 ? getRating(stylerData.ratings) : 0}
                                ratingColor={"#E6750C"}
                                ratingTextColor={"#E6750C"}
                                ratingBackgroundColor={"#E6750C"}
                                imageSize={18}
                                showRating={false}
                                onFinishRating={this.ratingCompleted}
                            /> */}
                                <AirbnbRating
                                    count={getRating(stylerData.ratings)}
                                    starStyle={{ tintColor: colors.warning, margin: 1, }}
                                    // defaultRating={5}
                                    showRating={false}
                                    size={18}
                                />
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.openWhatsApp}>
                                <WhatsAppIcon color={colors.whatsapp} size={18} />
                                <Text style={{ fontFamily: fonts.medium, textDecorationLine: 'underline', paddingLeft: 5, fontSize: 16, }}>Send Message</Text>
                            </TouchableOpacity>

                            <Reviews
                                styler__data={stylerData}
                                viewReviews={this.viewReviews}
                            />

                        </View>
                    </ScrollView>
                    <View style={{ marginVertical: 0, marginBottom: 20, padding: 20, }}>
                        <Button
                            onPress={this.toggleSheet}
                            btnTxt={"Select Service"}
                            size={"lg"}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                        />
                    </View>
                    {this.state.bottomSheet && <BottomSheet
                        {...this.props}
                        {...this.state}
                        selectService={this.selectService}
                        changeOption={this.changeOption}
                        stylerData={stylerData}
                        totalAmt={totalAmt}
                        scheduleAppointment={this.scheduleAppointment}
                    />}
                    <Modal
                        closeModal={this.closeModal}
                        isVisible={this.state.isVisible}
                    >
                        <ScrollView contentContainerStyle={{ flexGrow: 1, zIndex: 1000, elevation: 5 }}>
                            {show && <View style={{ alignSelf: "center", }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => this.setState({ show: false })}
                                >
                                    <Icon style={{ color: colors.danger }} name="ios-close-circle-outline" />
                                </TouchableOpacity>
                            </View>}
                            {show && <DateTimePicker value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate} />}
                            <Text style={{ fontFamily: fonts.bold, fontSize: 20, textAlign: "center", padding: 15, }}>{`NGN${totalAmt}`}</Text>
                            <TouchableWithoutFeedback onPress={this.datepicker}>
                                <Card style={[styles.date__card, styles.Input___shadow]}>
                                    <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>{this.state.dateSelected ? appointment__date.toDateString() : 'Pick a Date'}</Text>
                                    <View>
                                        <DateIcon />
                                    </View>
                                </Card>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={this.timepicker}>
                                <Card style={[styles.date__card, styles.Input___shadow]}>
                                    <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>{this.state.timeSelected ? appointment__date.toTimeString() : 'Pick a Time'}</Text>
                                    <View>
                                        <TimeIcon />
                                    </View>
                                </Card>
                            </TouchableWithoutFeedback>

                            {/* <Card style={[styles.Input___shadow]}>
                            <Item>
                                <Input
                                    value={this.props.selectedAddress && this.props.selectedAddress.name}
                                    onFocus={() => this.props.navigation.navigate('MapView')}
                                    style={{ fontFamily: fonts.bold, fontSize: 14, color: "#979797", marginLeft: 7, }}
                                    placeholderTextColor={"#979797"}
                                    placeholder='Pick your Location' />
                            </Item>
                        </Card> */}
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('MapView')}>
                                <Card style={[styles.date__card, styles.Input___shadow]}>
                                    <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>{this.props.selectedAddress && this.props.selectedAddress.name ? this.props.selectedAddress.name : 'Pick your Location'}</Text>
                                </Card>
                            </TouchableWithoutFeedback>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Text style={{ fontFamily: fonts.bold, color: colors.pink, }}>Use current location</Text>
                            </View>

                            {/* <TouchableWithoutFeedback onPress={this.datepicker}>
                            <Card style={[styles.date__card, styles.cardStyle]}>
                                <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>Pick your Location</Text>
                                <View>
                                    <LocationIcon />
                                </View>
                            </Card>
                        </TouchableWithoutFeedback> */}

                            <View style={{ paddingVertical: 15, marginTop: 20, }}>
                                <Button
                                    onPress={this.pay}
                                    btnTxt={"Pay and Confirm"}
                                    size={"lg"}
                                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                                />
                            </View>

                            {/* <View>
                                <Button
                                    btnTxt={"Pay at Point of Service"}
                                    size={"lg"}
                                    styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                                    btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                                />
                            </View> */}
                        </ScrollView>
                    </Modal>
                </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner color={colors.pink} />
                    </View>}
            </>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        paddingRight: 12,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 10,
    },
    Input___shadow: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
    date__card: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    no_avatar: {
        width: '100%',
        height: 300,
        backgroundColor: colors.pink,
        opacity: 0.4,
        // resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgCover: {
        height: 300, width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.btnColor,
        opacity: 0.5,
    }
})

const mapStateToProps = state => ({
    services: state.services,
    styler: state.styler,
    appointment__date: state.appointment.date,
    selectedAddress: state.map.selectedAddress,
    stylerData: state.appointment.stylerData,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);