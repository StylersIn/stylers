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
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, ScrollView, } from 'react-native-gesture-handler';
import { AppointmentIcon } from '../../navigation/assets';
import AppointmentList from './AppointmentList';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { WhatsAppIcon } from './AppointmentAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    showDetails = () => this.setState({ isVisible: true });
    closeModal = () => this.setState({ isVisible: false });

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            activeOpacity={0.7}>
                            <Icon
                                style={{ fontSize: 60, color: !this.state.isVisible ? "#000000" : "#ffffff", alignSelf: "flex-end", }}
                                type="Ionicons"
                                name="ios-close" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, fontFamily: fonts.bold, }}>Appointments</Text>

                        <AppointmentList
                            showDetails={this.showDetails}
                            closeModal={this.closeModal}
                            isProcessing={this.props.isProcessing}
                            isVisible={this.state.isVisible}
                            bookings={this.props.bookings}
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
                                <Text style={{ fontFamily: fonts.bold }}>John Anidi</Text>
                                <View style={{ padding: 2, borderRadius: 6, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.medium, position: 'relative', bottom: 1, }}>Point of service</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: fonts.bold }}>NGN2500</Text>
                        </View>
                    </View>}
                    closeModal={() => this.closeModal}
                    isVisible={true}
                >
                    <View style={{ paddingVertical: 20, }}>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Location</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>5342 Cetenary City</Text>
                        </View>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Date</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>23rd December, 2019</Text>
                        </View>
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Time</Text>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>3:00PM</Text>
                        </View>
                        <View style={{ marginTop: 15, }}>
                            <Text style={{ fontSize: 10, color: "#4F4F4F", fontFamily: fonts.bold, }}>Service Cost</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                                <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>Barbing</Text>
                                <Text style={{ fontFamily: fonts.bold, fontSize: 16, }}>NGN1000</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                                <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>Shaving</Text>
                                <Text style={{ fontFamily: fonts.bold, fontSize: 16, }}>NGN1500</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                                <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>Hair Dye</Text>
                                <Text style={{ fontFamily: fonts.bold, fontSize: 16, }}>NGN800</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 40, width: '100%' }}>
                            <Button
                                onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                btnTxt={"Cancel Appointment"}
                                size={"lg"}
                                styles={{ backgroundColor: colors.white, height: 40, borderWidth: 1, borderColor: "#000000", }}
                                btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                            />
                        </View>
                        <View style={{ marginTop: 10, width: '100%' }}>
                            <Button
                                onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                btnTxt={"Reschedule"}
                                size={"lg"}
                                styles={{ height: 40, }}
                                btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                            />
                        </View>
                        <View style={{ marginTop: 10, width: '100%' }}>
                            <Button
                                onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                btnTxt={"Message"}
                                size={"lg"}
                                Icon={<WhatsAppIcon />}
                                styles={{ height: 40, }}
                                btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                            />
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