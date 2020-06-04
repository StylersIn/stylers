import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
    Linking,
    RefreshControl,
} from 'react-native';
import {
    Icon,
    Card,
    CardItem,
    Thumbnail,
    Spinner,
} from 'native-base';
import { fonts, colors, roles } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, ScrollView, } from 'react-native-gesture-handler';
import { AppointmentIcon } from '../../navigation/assets';
import AppointmentList from './AppointmentList';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { WhatsAppIcon } from './AppointmentAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import Header from '../../components/Header';
import Stats from './Stats';
import Geocoder from 'react-native-geocoding';
import { notify } from '../../services';
import { formatDate, formatTime, } from '../../utils/stylersUtils';
import * as constants from '../../constants/ActionTypes';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
// weekday: 'long', 
const options__time = {
    timeZone: "Africa/Accra", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"
}
class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            appointment: {},
            isProcessing: false,
            refreshing: false,
            setRefreshing: false,
            notify: false,
            pageNumber: 1,
            pageSize: 10,
            isFinished: false,
            hasScrolled: false,
            appointments: [],
            loading: true,
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    componentDidMount() {
        // this.setState({ notify: true, });
        if (this.props.role === roles.user) {
            this.props.listAppointments();
        } else if (this.props.role === roles.styler) {
            this.props.listStylerAppointments();
        } else { }
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.location && prevProps.location != this.props.location) {
            this.navigateToMap();
        }
        if (prevProps.appointments && prevProps.appointments !== this.props.appointments) {
            // this.setState({ isProcessing: false });
            if (this.state.refreshing) {
                this.setState({ refreshing: false });
            }
            if (!prevProps.appointments.length) {
                this.setState({ isFinished: true, });
            }
            this.setState((prevState) => ({
                loading: false,
                pageNumber: prevState.pageNumber + 1,
                // pageSize: prevState.pageSize + 10,
                appointments: prevState.appointments.concat(prevProps.appointments),
            }))
            // this.showNotification(prevProps.appointments);
        }
        if (prevProps.updated && prevProps.updated !== this.props.updated && prevProps.status == constants.CANCELLED) {
            alert('Appointment has been cancelled successfully');
            this.setState({ isVisible: false, isProcessing: false, });
            if (this.props.role === roles.user) {
                this.props.listAppointments();
            } else if (this.props.role === roles.styler) {
                this.props.listStylerAppointments();
            } else { }
        }
    }

    filterDoc = () => {
        this.setState({ isFinished: false, });
        const { pageNumber, pageSize, } = this.state;
        if (this.props.role === roles.user) {
            this.props.listAppointments(pageNumber, pageSize);
        } else if (this.props.role === roles.styler) {
            this.props.listStylerAppointments(pageNumber, pageSize);
        } else { }
    }

    showNotification = (appointments) => {
        const {
            current: { publicId, }
        } = this.props;
        let expired = appointments.filter(e => e.status == (constants.EXPIRED || constants.CANCELLED) && e.userId.publicId == publicId).length;
        if (expired > 0) {
            setTimeout(() => {
                this.setState({ notify: undefined, notification: {} })
            }, 5000);
            const { notification } = this.state;
            return (
                <Card style={styles.Input___shadow}>
                    <CardItem style={{ borderRadius: 4, backgroundColor: colors.pink, flexDirection: 'row', }}>
                        <View>
                            <Icon style={{ color: colors.white, }} name='ios-add' />
                        </View>
                        <View>
                            <Text style={{ color: colors.white, fontFamily: fonts.bold, fontSize: 18, }}>{`Expired Appointments`}</Text>
                            <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{`You have ${expired} expired appointment(s), please kindly reschedule with a different styler`}</Text>
                        </View>
                    </CardItem>
                </Card>
            )
        }
    }

    showDetails = (appointment) => this.setState({ isVisible: true, appointment, });
    closeModal = () => this.setState({ isVisible: false, isProcessing: false, });

    calcServicePrice = () => {
        var _service = this.props.appointments.filter(e => e.stylerId.services === appointment.serviceId._id);
        return _service.adult * appointment
    }

    IsDateInPast = (selectedDate) => {
        var past = new Date(selectedDate);
        var now = new Date();
        if (past < now) {
            return true;
        } else {
            return false;
        }
    }

    navigateToMap = () => {
        if (this.props.role === roles.styler) {
            if (this.state.appointment.publicId === this.props.current.publicId) {
                notify('Service Started', 'Hi there! Styler just started this service.');
            }
            this.props.navigation.navigate('StylerMap', { appointment: this.state.appointment })
        }
        if (this.props.role === roles.user) {
            this.props.navigation.navigate('TrackStyler', { appointment: this.state.appointment })
        }
        this.setState({ isProcessing: false, isVisible: false, })
    }

    beginService = (id) => {
        this.navigateToMap();
        this.updateAppointmentStatus(id, constants.STARTED)
        this.setState({ isProcessing: true, })
    }

    continueService = () => {
        this.navigateToMap();
        this.setState({ isProcessing: true, })
    }

    trackStyler = () => {
        this.setState({ isProcessing: true, })
        setTimeout(() => {
            this.navigateToMap();
            this.setState({ isProcessing: false, })
        }, 2000);
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        if (this.props.role === roles.user) {
            this.props.listAppointments();
        } else if (this.props.role === roles.styler) {
            this.props.listStylerAppointments();
        } else { }
    }

    updateAppointmentStatus(Id, status) {
        this.props.updateAppointmentStatus({ appointmentId: Id, }, status);
    }

    getName = (appointment) => {
        const {
            role,
        } = this.props;
        return role == roles.styler ? appointment.userId && appointment.userId.name : appointment.stylerId && appointment.stylerId.name
    }

    handleUrl = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      };

    render() {
        const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
            const paddingToBottom = 20;
            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        };
        const {
            appointment,
            isVisible,
            notify,
            appointments,
            isFinished,
            loading,
            hasScrolled,
        } = this.state;
        // const {
        //     appointments,
        // } = this.props;

        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        onScroll={({ nativeEvent }) => {
                            this.setState({ hasScrolled: true, })
                            if (isCloseToBottom(nativeEvent)) {
                                this.filterDoc();
                            }
                        }}
                    >
                        {notify && appointments && this.showNotification(appointments || {})}
                        <View>
                            <Header
                                // hamburger={this.props.role === roles.styler ? true : false}
                                hamburger
                                title={`Hi ${this.props.username[0]},`}
                            />
                            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: colors.black }}></View>
                                    <Text style={{ fontFamily: fonts.medium, position: 'relative', bottom: 4, left: 2 }}>Booked</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: colors.pink }}></View>
                                    <Text style={{ fontFamily: fonts.medium, position: 'relative', bottom: 4, left: 2 }}>Accepted</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: colors.success }}></View>
                                    <Text style={{ fontFamily: fonts.medium, position: 'relative', bottom: 4, left: 2 }}>Completed</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: colors.danger }}></View>
                                    <Text style={{ fontFamily: fonts.medium, position: 'relative', bottom: 4, left: 2 }}>Cancelled</Text>
                                </View>
                            </View>
                        </View>

                        {this.props.role === roles.styler && <View style={{ paddingLeft: 20 }}>
                            <Stats {...this.props} />
                        </View>}
                        <View style={{ flex: 1, padding: 20, }}>
                            {/* <View style={{ marginTop: 0 }}>
                                {this.props.role === roles.user && <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: '#4F4F4F', }}>January</Text>
                                    <Icon style={{ fontSize: 20, paddingLeft: 10, marginTop: 2, color: '#4F4F4F', }} name="ios-arrow-down" />
                                </View>}
                            </View> */}

                            <AppointmentList
                                role={this.props.role}
                                showDetails={this.showDetails}
                                closeModal={this.closeModal}
                                isProcessing={this.props.isProcessing}
                                isVisible={this.state.isVisible}
                                appointments={appointments}
                                loading={loading}
                            />
                        </View>

                        <View style={{ padding: 20, }}>
                            {!isFinished && !loading && appointments.length >= 10 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Spinner
                                    color={colors.default}
                                />
                            </View>}
                            {isFinished && appointments.length > 0 && appointments.length >= 10 && <View>
                                <Text style={styles.finishedTxt}>No new appointments found</Text>
                            </View>}
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <Modal
                    header={<View style={{ height: '100%', padding: 20, paddingHorizontal: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            {this.props.role == roles.user && <View>
                                {/* <Thumbnail
                                    style={{ width: 35, height: 35 }}
                                    source={service__1} /> */}
                                {appointment.stylerId ? <Thumbnail
                                    style={{ width: 35, height: 35 }}
                                    source={appointment.stylerId.imageUrl ? { uri: appointment.stylerId.imageUrl } : service__1}
                                /> : null}

                                {/* {!stylerData.imageUrl && <Image
                                    style={[{ height: 100, width: 100, borderRadius: 5, }, Platform.OS == 'ios' ? { marginTop: 20 } : null]}
                                    source={stylerData.imageUrl ? { uri: stylerData.imageUrl } : avatar}
                                />} */}
                            </View>}
                            <View style={{ position: 'relative', left: 10 }}>
                                <Text style={{ fontFamily: fonts.bold }}>{this.getName(appointment)}</Text>
                                <View style={{ padding: 2, borderRadius: 6, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.medium, position: 'relative', bottom: 1, }}>Card Payment</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: fonts.bold }}>{`NGN${appointment.sumTotal}`}</Text>
                        </View>
                    </View>}
                    closeModal={this.closeModal}
                    isVisible={isVisible}
                >
                    <View style={{ paddingVertical: 0, }}>
                        <View style={{ marginTop: 5, flex: 1, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Location</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, flexWrap: "wrap", }}>{appointment.streetName}</Text>
                        </View>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Date</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, }}>{formatDate(appointment.scheduledDate)}</Text>
                        </View>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Time</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, }}>{formatTime(appointment.scheduledDate)}</Text>
                        </View>
                        <View style={{ marginTop: 15, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Service Cost</Text>
                            {appointment.services && appointment.services.map((r, key) => {
                                let adult = r.adult || 0;
                                let child = r.child || 0;
                                let data = appointment.stylerId.services.filter(e => e.subServiceId == r.subServiceId._id),
                                    filteredData = data.length ? data[0] : {};
                                let tot = (adult * filteredData.adult) + (child * filteredData.child);
                                return (
                                    <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                                        <Text style={{ fontFamily: fonts.medium, fontSize: 14, }}>{r.subServiceId.name}</Text>
                                        <Text style={{ fontFamily: fonts.bold, fontSize: 14, }}>{`NGN${tot}`}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ marginTop: 40 }}>
                            {this.props.role === roles.user && appointment.status == constants.BOOKED && <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => this.updateAppointmentStatus(appointment._id, constants.CANCELLED)}
                                    btnTxt={"Cancel Appointment"}
                                    size={"lg"}
                                    styles={{ backgroundColor: colors.white, height: 40, borderWidth: 1, borderColor: "#000000", }}
                                    btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                                />
                            </View>}
                            {this.IsDateInPast(appointment.scheduledDate) && this.props.role === roles.styler &&
                                appointment.status == constants.ACCEPTED ? <View style={{ marginTop: 10, width: '100%' }}>
                                    <Button
                                        onPress={() => this.beginService(appointment._id)}
                                        btnTxt={"Begin Service"}
                                        size={"lg"}
                                        loading={this.state.isProcessing}
                                        styles={{ height: 40, backgroundColor: colors.black, }}
                                        btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                    />
                                </View> : this.IsDateInPast(appointment.scheduledDate) && this.props.role === roles.styler &&
                                    appointment.status == constants.STARTED ? <View style={{ marginTop: 10, width: '100%' }}>
                                        <Button
                                            onPress={this.continueService}
                                            btnTxt={"View Map"}
                                            size={"lg"}
                                            styles={{ height: 40, backgroundColor: colors.black, }}
                                            btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                        />
                                    </View> : this.IsDateInPast(appointment.scheduledDate) && this.props.role === roles.user &&
                                        (appointment.status == constants.STARTED || appointment.status == constants.ACCEPTED) ? <View style={{ marginTop: 10, width: '100%' }}>
                                            <Button
                                                onPress={this.trackStyler}
                                                btnTxt={"Track Styler"}
                                                size={"lg"}
                                                loading={this.state.isProcessing}
                                                styles={{ height: 40, backgroundColor: colors.black, }}
                                                btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                            />
                                        </View> : this.props.role === roles.user && appointment.status == (constants.EXPIRED || constants.CANCELLED) ?
                                            <View style={{ marginTop: 10, width: '100%' }}>
                                                <Button
                                                    onPress={() => this.props.navigation.navigate("Reschedule",
                                                        {
                                                            param: { service: appointment.stylerId.services[0].serviceId, styler: appointment.stylerId._id, }
                                                        })}
                                                    btnTxt={"Reschedule with different styler"}
                                                    size={"lg"}
                                                    styles={{ height: 40, backgroundColor: colors.black, }}
                                                    btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                                />
                                            </View> : !this.IsDateInPast(appointment.scheduledDate) ? null : null}
                            {/* <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => alert('module disabled...')}
                                    btnTxt={"Reschedule"}
                                    size={"lg"}
                                    styles={{ height: 40, }}
                                    btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                />
                            </View> */}
                            <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => this.handleUrl(`whatsapp://send?text=hello&phone=+234${appointment.stylerId.phoneNumber}`)}
                                    btnTxt={"Message"}
                                    size={"lg"}
                                    Icon={<WhatsAppIcon />}
                                    styles={{ height: 40, backgroundColor: '#25D366', }}
                                    btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    Input___shadow: {
        position: "absolute",
        left: 20,
        right: 20,
        zIndex: 1000,
        paddingRight: 30,
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.pink,
        borderRadius: 5,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: colors.pink,
    },
    finishedTxt: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.gray,
    },
});

export default Appointment;