import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Card,
    CardItem,
} from 'native-base';
import { fonts, colors, roles } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { BarberIcon } from '../Services/ServiceAssets';
import { EmptyAppointment } from './AppointmentAssets';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import { getDate, getDay, formatTime } from '../../utils/stylersUtils';
import * as constants from '../../constants/ActionTypes';

export default function (props) {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, marginTop: 0, }}>
                {!props.isProcessing && props.appointments.length === 0 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <EmptyAppointment />
                    <Text style={{ fontSize: 20, paddingVertical: 40, fontFamily: fonts.medium, }}>No scheduled appointments</Text>
                </View>}
                {!props.isProcessing ? <View>
                    {props.appointments.length && props.role === roles.user ? <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text> : null}
                    {props.appointments.length && props.role === roles.styler ? <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Pending Appointments</Text> : null}
                    {props.appointments.map((appointment, i) => <TouchableWithoutFeedback
                        key={i}
                        onPress={() => props.showDetails(appointment)}
                        activeOpacity={0.7}
                    >
                        <Card style={[styles.Input___shadow, appointment.status == constants.CANCELLED ? { borderColor: colors.danger } :
                            appointment.status == constants.COMPLETED ? { borderColor: colors.success } :
                                appointment.status == constants.ACCEPTED ? { borderColor: colors.pink } : { borderColor: '#000000' }]}>
                            <CardItem style={{ borderRadius: 4 }}>
                                <View style={{ borderRightWidth: 0.5, borderColor: "#979797", alignItems: "center", paddingRight: 10, }}>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 18, paddingVertical: 2, }}>{getDate(appointment.scheduledDate)}</Text>
                                    <Text style={{ fontSize: 12, paddingVertical: 2, }}>{getDay(appointment.scheduledDate)}</Text>
                                    <Text style={{ fontSize: 12, paddingVertical: 2, }}>{formatTime(appointment.scheduledDate)}</Text>
                                </View>
                                <View style={{ paddingHorizontal: 10, }}>
                                    {/* {appointment.services.map((r, key) => (<Text key={key} style={{ fontFamily: fonts.bold }}>{r.serviceId && r.serviceId.name}</Text>))} */}
                                    <Text style={{ fontFamily: fonts.bold, }}>{`${appointment.services[0] && appointment.services[0].subServiceId.name}`}</Text>
                                    <Text style={{ fontSize: 10, fontFamily: fonts.medium, paddingVertical: 5, }}>{props.role == roles.user ? appointment.stylerId.name : appointment.userId.name} </Text>
                                    <Text style={{ fontSize: 10, }}>{appointment.streetName}</Text>
                                </View>
                                <View style={{ position: "absolute", top: 10, right: 10, }}>
                                    <BarberIcon />
                                </View>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>)}
                </View> : Loader()}
            </View>
        </View>
    )
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
    Input___shadow: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        // borderColor: '#000000',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        borderLeftWidth: 12,
        // borderLeftColor: "#000000",
        borderTopColor: 'transparent',
    },
});