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
import { EmptyAppointment } from '../Appointments/AppointmentAssets';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { getDay, getDate, formatTime } from '../../utils/stylersUtils';
import * as constants from '../../constants/ActionTypes';
import { ErrorIcon } from '../Assets';

export default function (props) {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, marginTop: 20, }}>
                {!props.loading && props.requests.length === 0 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <EmptyAppointment />
                    <Text style={{ fontSize: 20, paddingVertical: 40, fontFamily: fonts.medium, }}>No scheduled requests</Text>
                </View>}
                {!props.loading ? <View>
                    {props.requests.length && props.role === roles.user ? <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text> : null}
                    {props.requests.length && props.role === roles.styler ? <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Requests</Text> : null}
                    {props.requests.map((request, i) => <TouchableWithoutFeedback
                        key={i}
                        // onPress={() => props.showDetails(request)}
                        activeOpacity={0.7}
                    >
                         <Card style={[styles.Input___shadow, request.status == constants.CANCELLED ? { borderLeftColor: colors.danger } :
                            request.status == constants.COMPLETED ? { borderLeftColor: colors.success } :
                                request.status == constants.STARTED ? { borderLeftColor: colors.pink } :
                                    request.status == constants.ACCEPTED ? { borderLeftColor: colors.pink } : { borderLeftColor: '#000000' }]}>
                            <CardItem style={{ borderRadius: 4 }}>
                                <View style={{ borderRightWidth: 0.5, borderColor: "#979797", alignItems: "center", paddingRight: 10, }}>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 18, paddingVertical: 2, }}>{getDate(request.CreatedAt)}</Text>
                                    <Text style={{ fontSize: 12, paddingVertical: 2, }}>{getDay(request.CreatedAt)}</Text>
                                    <Text style={{ fontSize: 12, paddingVertical: 2, }}>{formatTime(request.CreatedAt)}</Text>
                                </View>
                                <View style={{ paddingHorizontal: 10, flex: 1, }}>
                                    {/* {request.services.map((r, key) => (<Text key={key} style={{ fontFamily: fonts.bold }}>{r.serviceId && r.subServiceId.name}</Text>))} */}
                                    <Text style={{ fontFamily: fonts.bold }}>{request.services[0].subServiceId.name}</Text>
                                    <Text style={{ fontSize: 10, fontFamily: fonts.medium, marginTop: 5, }}>{request.userId.name} </Text>
                                    <Text style={{ fontSize: 10, flexWrap: "wrap", marginTop: 5, }}>{request.streetName}</Text>
                                </View>
                                {/* <View style={{ position: "absolute", top: 10, right: 10, }}>
                                    <BarberIcon />
                                </View> */}
                            </CardItem>
                            {request.status == constants.EXPIRED ? <View style={{ position: "absolute", bottom: 10, right: 10, }}>
                                <ErrorIcon color={colors.danger} />
                            </View> : request.status != constants.CANCELLED ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 10, }}>
                                <View style={{ marginTop: 10, width: '48%' }}>
                                    <Button
                                        onPress={() => props.accept(request._id)}
                                        btnTxt={"Accept"}
                                        size={"lg"}
                                        loading={props.requestKey === 'accept' && props.loading}
                                        styles={{ height: 40, }}
                                        btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                                    />
                                </View>

                                <View style={{ marginTop: 10, width: '48%' }}>
                                    <Button
                                        onPress={() => props.openCancelModal(request._id)}
                                        btnTxt={"Decline"}
                                        size={"lg"}
                                        loading={props.requestKey === 'decline' && props.loading}
                                        styles={{ height: 40, backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                                        btnTxtStyles={{ color: colors.black, fontSize: 12, fontFamily: fonts.bold }}
                                    />
                                </View>
                            </View> : undefined}

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
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        borderLeftWidth: 12,
        borderLeftColor: "#000000",
        borderTopColor: 'transparent',
    },
});