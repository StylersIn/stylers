import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    Card,
    CardItem,
} from 'native-base';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { BarberIcon } from '../Services/ServiceAssets';
import { EmptyAppointment } from './AppointmentAssets';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

export default function (props) {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, marginTop: 20, }}>
                {!props.isProcessing && props.bookings.length === 0 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <EmptyAppointment />
                    <Text style={{ fontSize: 20, paddingVertical: 40, fontFamily: fonts.medium, }}>No scheduled appointments</Text>
                </View>}
                {!props.isProcessing ? <View>
                    <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text>
                    {props.bookings.map((appointment, i) => <TouchableOpacity
                        key={i}
                        onPress={() => props.showDetails()}
                        activeOpacity={0.7}
                    >
                        <Card style={styles.cardStyle}>
                            <CardItem style={{ borderRadius: 4 }}>
                                <View style={{ borderRightWidth: 0.5, borderColor: "#979797", alignItems: "center", paddingRight: 10, }}>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 18, paddingVertical: 2, }}>08</Text>
                                    <Text style={{ fontSize: 12, paddingVertical: 2, }}>Thu</Text>
                                    <Text style={{ fontSize: 12, paddingVertical: 2, }}>3:00PM</Text>
                                </View>
                                <View style={{ paddingHorizontal: 10, }}>
                                    {appointment.services.map((r, key) => (<Text key={key} style={{ fontFamily: fonts.bold }}>{r.serviceId && r.serviceId.name}</Text>))}
                                    <Text style={{ fontSize: 10, fontFamily: fonts.medium, paddingVertical: 5, }}>{appointment.stylerId.name} </Text>
                                    <Text style={{ fontSize: 10, }}>{appointment.location}</Text>
                                </View>
                                <View style={{ position: "absolute", top: 10, right: 10, }}>
                                    <BarberIcon />
                                </View>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>)}
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
});