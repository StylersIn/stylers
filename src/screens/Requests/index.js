import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    RefreshControl,
    Animated,
    Easing,
    Vibration,
} from 'react-native';
import {
    Icon,
    Thumbnail,
    Spinner,
    Card,
    CardItem,
} from 'native-base';
import { fonts, colors, roles } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { AppointmentIcon } from '../../navigation/assets';
import RequestList from './RequestList';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Stats from '../Appointments/Stats';
import { notify } from '../../services';
import * as constants from '../../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import CancelPopup from './CancelPopup';
import Notify from '../../components/Notify';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
// weekday: 'long', 
const options__time = {
    timeZone: "Africa/Accra", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"
}
class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            appointment: {},
            isProcessing: false,
            accept: false,
            key: '',
            isActive: undefined,
            refreshing: false,
            notify: false,
            notifyCount: 0,
            isCancelVisible: false,
            selectedAppointment: undefined,
            selectedReason: undefined,
            pageNumber: 1,
            pageSize: 10,
            isFinished: false,
            hasScrolled: false,
            requests: [],
            loading: true,
            notSeen: 0,
            opacity: new Animated.Value(0),
            bottomLoader:false,
        }
        // this.props.socket.on('appointmentBooked.send', () => {
        //     notify('New Appointment!!!', 'Hi there! You have a new appointment.');
        // })
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    componentDidMount() {
        // this.setState({ notify: true, })
        // const { user: { oneSignalId }, isActive, } = this.props;
        // if (!oneSignalId) {
        //     AsyncStorage.getItem('oneSignalUserId', (err, Id) => {
        //         if (Id) {
        //             this.props.updateOneSignal({ oneSignalUserId: Id });
        //         }
        //     })
        // }
        // this.props.updateOneSignal({ oneSignalUserId: oneSignalId });
        this.props.listStylerRequests();
        this.props.getStylerDetails();
        this.props.getStats();
        this.props.navigation.setParams({
            requests: this.props.requests
        })
        AsyncStorage.getItem('oneSignalUserId', (err, Id) => {
            if (Id) {
                this.props.updateOneSignal({ oneSignalUserId: Id });
            }
        })
    }

    componentDidUpdate(prevProps) {
        const { isActive, } = this.state;
        if (prevProps.isActive !== undefined && isActive === undefined) {
            this.setState({ isActive: prevProps.isActive, });
        }
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        const { appointment } = this.state;
        if (prevProps.requests && prevProps.requests !== this.props.requests) {
            if (prevProps.notSeen && prevProps.notSeen > 0) {
                this.setState({ notSeen: prevProps.notSeen, notify: true, });
                Vibration.vibrate();
                this.props.seenNotification({ seen: true, });
            }
            // this.setState({ loading: false });
            if (!prevProps.requests.length) {
                this.setState({ isFinished: true, });
            }

            if (prevProps.requests.length < 10) {
                this.setState({bottomLoader: false,})
            } else {
                this.setState({bottomLoader: true,})
            }
            
            this.setState((prevState) => ({
                loading: false,
                pageNumber: prevState.pageNumber + 1,
                // pageSize: prevState.pageSize + 10,
                requests: prevState.requests.concat(prevProps.requests),
            }))
        }
        if (prevProps.updated && prevProps.updated !== this.props.updated) {
            this.props.listStylerRequests();
            this.setState({ isProcessing: false, loading: true, requests: [], });
            if (prevProps.status === constants.ACCEPTED) {
                alert('Successfully accepted')
                notify('Service Accepted', 'Hi there! You just accepted this service.');
                this.setState({ accept: false, })
            } else if (prevProps.status === constants.CANCELLED) {
                this.setState({ isCancelVisible: false, });
                notify('Service Cancelled', 'Hi there! You just cancelled this service.');
                alert('Successfully declined');
            }
            // notify('Appointment Status', 'Hi there! Styler has accepted your appointment.');

            // if (prevProps.updatedStyler && prevProps.updatedStyler != this.props.updatedStyler) {
            //     alert('updated')
            // }
        }
    }

    filterDoc = () => {
        this.setState({ isFinished: false, });
        const { pageNumber, pageSize, } = this.state;
        this.props.listStylerRequests(pageNumber, pageSize);
    }

    showDetails = (appointment) => this.setState({ isVisible: true, appointment, });
    closeModal = () => this.setState({ isVisible: false, isCancelVisible: false, selectedReason: undefined, });

    formatDate = (d) => {
        var date = new Date(d);
        return date.toLocaleDateString("en-US", options);
    }

    formatTime = (d) => {
        var date = new Date(d);
        return date.toLocaleTimeString("en-US", options__time);
    }

    calcServicePrice = () => {
        var _service = this.props.appointments.filter(e => e.stylerId.services === appointment.serviceId._id);
        return _service.adult * appointment
    }

    updateAppointmentStatus(Id, status) {
        this.setState({ isProcessing: true, });
        if (status == constants.ACCEPTED) {
            this.setState({ accept: true, key: 'accept' })
        }
        this.props.updateAppointmentStatus({ appointmentId: Id, }, status);
    }

    updateState = () => {
        this.setState({ accept: true, key: 'accept' })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true, requests: [], loading: true, });
        this.props.listStylerRequests();
        this.props.getStats();
    }

    setStatus = () => {
        const { isActive, } = this.state;
        this.setState({ isActive: !isActive, });
        this.props.updateStyler({ isActive: !isActive });
    }

    // declineAppointment = () => {
    //     this.setState({ isProcessing: true })
    //     // this.props.acceptAppointment(appointment._id);
    // }

    selectReason = selectedReason => this.setState({ selectedReason, });

    render() {
        const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
            const paddingToBottom = 20;
            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        };
        const {
            appointment,
            isVisible,
            isActive,
            notify,
            isCancelVisible,
            selectedAppointment,
            selectedReason,
            isProcessing,
            loading,
            bottomLoader,
            requests,
            accept,
            isFinished,
            hasScrolled,
            notSeen,
        } = this.state;
        // const {
        //     requests,
        // } = this.props;
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor={colors.pink} />
                {accept && <View style={styles.accept}>
                    <Spinner style={{ alignItems: "center" }} isVisible={true} size={80} color={colors.pink} />
                </View>}
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
                        {notify && <Notify
                            title="New Appointments"
                            message={`You have ${notSeen} new appointment(s)`}
                        />}
                        {/* {!notify && requests.length > 0 && this.showNotification(requests || [])} */}
                        {/* {this.notification()} */}
                        <View>
                            <Header
                                hamburger={this.props.role === roles.styler ? true : false}
                                statusBtn
                                isActive={isActive}
                                title={`Hi ${this.props.username[0]},`}
                                setStatus={() => this.setStatus()}
                            />
                        </View>

                        {this.props.role === roles.styler && <View style={{ paddingLeft: 20, }}>
                            <Stats
                                stats={this.props.stats}
                            />
                        </View>}

                        <View style={{ flex: 1, padding: 20, }}>
                            <View style={{ marginTop: 0 }}>
                                {this.props.role === roles.user && <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: '#4F4F4F', }}>January</Text>
                                    <Icon style={{ fontSize: 20, paddingLeft: 10, marginTop: 2, color: '#4F4F4F', }} name="ios-arrow-down" />
                                </View>}
                                {/* {this.props.role === roles.styler && <Text style={{ fontSize: 18, fontFamily: fonts.bold, }}>Pending Appointments</Text>} */}
                            </View>

                            <RequestList
                                role={this.props.role}
                                showDetails={this.showDetails}
                                closeModal={this.closeModal}
                                loading={loading}
                                isVisible={this.state.isVisible}
                                requests={requests}
                                accept={(id) => this.updateAppointmentStatus(id, constants.ACCEPTED)}
                                // decline={(id) => this.updateAppointmentStatus(id, constants.CANCELLED)}
                                openCancelModal={(id) => this.setState({ isCancelVisible: true, selectedAppointment: id, })}
                                requestKey={this.state.key}
                            />
                        </View>

                        <View style={{ padding: 20, }}>
                            {!isFinished && bottomLoader && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Spinner
                                    color={colors.default}
                                />
                            </View>}
                            {isFinished && requests.length > 0 && <View>
                                <Text style={styles.finishedTxt}>No new requests found</Text>
                            </View>}
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <CancelPopup
                    isVisible={isCancelVisible}
                    closeModal={this.closeModal}
                    selectReason={this.selectReason}
                    selectedReason={selectedReason}
                    isProcessing={isProcessing}
                    declineAppointment={() => this.props.updateAppointmentStatus({ appointmentId: selectedAppointment, reason: selectedReason }, constants.CANCELLED)}
                />
                <Modal
                    header={<View style={{ height: '100%', padding: 20, paddingHorizontal: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            {/* <View>
                                <Thumbnail
                                    style={{ width: 35, height: 35 }}
                                    source={service__1} />
                            </View> */}
                            <View>
                                <Text style={{ fontFamily: fonts.bold }}>{appointment.userId && appointment.name}</Text>
                                <View style={{ padding: 2, borderRadius: 6, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.medium, position: 'relative', bottom: 1, }}>Card Payment</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: fonts.bold }}>{`NGN${appointment.totalAmount}`}</Text>
                        </View>
                    </View>}
                    closeModal={this.closeModal}
                    isVisible={isVisible}
                >
                    <View style={{ paddingVertical: 20, }}>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Location</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>{appointment.streetName}</Text>
                        </View>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Date</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>{this.formatDate(appointment.scheduledDate)}</Text>
                        </View>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Time</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>{this.formatTime(appointment.scheduledDate)}</Text>
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
                                        <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>{r.subServiceId.name}</Text>
                                        <Text style={{ fontFamily: fonts.bold, fontSize: 16, }}>{`NGN${tot}`}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ marginTop: 40 }}>
                            {this.props.role === roles.user && <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                    btnTxt={"Cancel Appointment"}
                                    size={"lg"}
                                    styles={{ backgroundColor: colors.white, height: 40, borderWidth: 1, borderColor: "#000000", }}
                                    btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                                />
                            </View>}
                            <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                    btnTxt={"Decline"}
                                    size={"lg"}
                                    styles={{ height: 40, backgroundColor: colors.white, borderWidth: 1, borderColor: "#828282" }}
                                    btnTxtStyles={{ color: '#828282', fontSize: 12, fontFamily: fonts.bold }}
                                />
                            </View>
                            <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={this.acceptAppointement}
                                    btnTxt={"Accept"}
                                    size={"lg"}
                                    loading={this.state.isProcessing}
                                    styles={{ height: 40, backgroundColor: colors.black, }}
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
    accept: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 5,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    finishedTxt: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.gray,
    },
});

export default Requests;