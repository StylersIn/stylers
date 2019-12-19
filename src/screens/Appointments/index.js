import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
} from 'react-native';
import {
    Icon,
    Card,
    CardItem,
    Thumbnail,
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
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    showDetails = (appointment) => this.setState({ isVisible: true, appointment, });
    closeModal = () => this.setState({ isVisible: false });

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

    IsDateInPast = (selectedDate) => {
        var past = new Date(selectedDate);
        var now = new Date();
        if (past < now) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { appointment, isVisible, } = this.state;
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        {/* <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            activeOpacity={0.7}>
                            <Icon
                                style={{ fontSize: 60, color: !this.state.isVisible ? "#000000" : "#ffffff", alignSelf: "flex-end", }}
                                type="Ionicons"
                                name="ios-close" />
                        </TouchableOpacity> */}

                        <Header
                            hamburger={this.props.role === roles.styler ? true : false}
                            title={`Hi ${this.props.username},`}
                        />

                        {this.props.role === roles.styler && <View style={{ marginTop: 20 }}>
                            <Stats />
                        </View>}

                        <View style={{ marginTop: 20 }}>
                            {this.props.role === roles.user && <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: '#4F4F4F', }}>January</Text>
                                <Icon style={{ fontSize: 20, paddingLeft: 10, marginTop: 2, color: '#4F4F4F', }} name="ios-arrow-down" />
                            </View>}
                            {/* {this.props.role === roles.styler && <Text style={{ fontSize: 18, fontFamily: fonts.bold, }}>Pending Appointments</Text>} */}
                        </View>

                        <AppointmentList
                            role={this.props.role}
                            showDetails={this.showDetails}
                            closeModal={this.closeModal}
                            isProcessing={this.props.isProcessing}
                            isVisible={this.state.isVisible}
                            appointments={this.props.appointments}
                        />

                    </ScrollView>
                </SafeAreaView>
                <Modal
                    header={<View style={{ height: '100%', padding: 20, paddingHorizontal: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <View>
                                <Thumbnail
                                    style={{ width: 35, height: 35 }}
                                    source={service__1} />
                            </View>
                            <View style={{ position: 'relative', left: 10 }}>
                                <Text style={{ fontFamily: fonts.bold }}>{appointment.userId && appointment.userId.name}</Text>
                                <View style={{ padding: 2, borderRadius: 6, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.medium, position: 'relative', bottom: 1, }}>Point of service</Text>
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
                            {appointment.services && appointment.services.map((r, key) => (
                                <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                                    <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>{r.serviceId.name}</Text>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 16, }}>{`NGN1000`}</Text>
                                </View>
                            ))}
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
                            {this.IsDateInPast(appointment.scheduledDate) ? <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => this.props.navigation.navigate('StylerMap', { appointment: appointment })}
                                    btnTxt={"Begin Service"}
                                    size={"lg"}
                                    styles={{ height: 40, backgroundColor: colors.danger, }}
                                    btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                />
                            </View> : <View style={{ marginTop: 10, width: '100%' }}>
                                    <Button
                                        onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                        btnTxt={"Reschedule"}
                                        size={"lg"}
                                        styles={{ height: 40, }}
                                        btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                    />
                                </View>}
                            <View style={{ marginTop: 10, width: '100%' }}>
                                <Button
                                    onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
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
        padding: 20,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 4,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
        borderLeftWidth: 12,
        borderLeftColor: "#000000",
        // paddingRight: 12,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
});

export default Appointment;