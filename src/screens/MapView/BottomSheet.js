import React from 'react';
import { StyleSheet, View, Dimensions, Platform, Linking, TouchableOpacity, ScrollView, } from 'react-native';
import {
    CoordinatorLayout,
    BottomSheetBehavior,
    FloatingActionButton,
} from 'react-native-bottom-sheet-behavior';
import SwipeButton from 'rn-swipe-button';
import { BottomSheet } from '../../components/BottomSheet';
import { Spinner, Thumbnail, Form, Card, CardItem, Icon } from 'native-base';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { colors, fonts, roles, } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { CloseIcon, CallIcon, ChatIcon, ArrowDown, SwiperIcon } from './MapAssets';
import { WhatsAppIcon } from '../Appointments/AppointmentAssets';

const HEADER_HEIGHT = 30;
const swiperIcon = () => {
    return (
        <SwiperIcon />
    )
}
const call = (props) => {
    Linking.openURL(`tel:${props.role == roles.styler ? props.appointment.userId.phoneNumber : props.appointment.stylerId.phoneNumber}`)
}

const sms = (props) => {
    Linking.openURL(`sms:${props.role == roles.styler ? props.appointment.userId.phoneNumber : props.appointment.stylerId.phoneNumber}&body=hello`)
}

const whatsapp = (props) => {
    Linking.openURL(`whatsapp://send?text=hello&phone=+${props.role == roles.styler ? props.appointment.userId.callingCode :
        props.appointment.stylerId.callingCode}${props.role == roles.styler ? props.appointment.userId.phoneNumber : props.appointment.stylerId.phoneNumber}`)
}
const getName = (appointment, role) => {
    return role == roles.styler ? appointment.userId && appointment.userId.name : appointment.stylerId && appointment.stylerId.name
}

export default function (props) {
    return (
        <>
            {Platform.OS === 'ios' && <BottomSheet>
                {props.currentAddress && props.appointment ? <ScrollView contentContainerStyle={{ paddingHorizontal: 30, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            {props.role == roles.user && <View>
                                {props.appointment.stylerId ? <Thumbnail
                                    style={{ width: 35, height: 35 }}
                                    source={props.appointment.stylerId.imageUrl ? { uri: props.appointment.stylerId.imageUrl } : service__1}
                                /> : null}
                            </View>}
                            <View style={{ position: 'relative', left: 10 }}>
                                <Text style={{ fontFamily: fonts.bold }}>{getName(props.appointment, props.role)}</Text>
                                <View style={{ padding: 2, paddingHorizontal: 4, borderRadius: 3, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.bold, position: 'relative', bottom: 1, }}>Card Payment</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={{ fontFamily: fonts.bold }}>{`NGN${props.appointment.sumTotal}`}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Card style={styles.map_btn}>
                            <CardItem style={styles.map_btn_icon}>
                                <View style={{ marginTop: 10, marginRight: 1, }}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => call(props)}
                                    >
                                        <CallIcon />
                                    </TouchableOpacity>
                                </View>
                            </CardItem>
                        </Card>

                        <Card style={styles.map_btn}>
                            <CardItem style={styles.map_btn_icon}>
                                <View style={{ marginTop: 6, }}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => sms(props)}
                                    >
                                        <ChatIcon />
                                    </TouchableOpacity>
                                </View>
                            </CardItem>
                        </Card>

                        <Card style={styles.map_btn}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => whatsapp(props)}
                            >
                                <CardItem style={styles.map_btn_icon}>
                                    <WhatsAppIcon color={colors.whatsapp} size={22} />
                                </CardItem>
                            </TouchableOpacity>
                        </Card>
                    </View>
                    <View style={{ marginTop: 30, }}>
                        <View style={{ borderColor: 'rgba(151, 173, 182, 0.2)', borderWidth: 0.5, borderRadius: 5, padding: 20, flexDirection: 'row', }}>
                            {/* <Text>11:24</Text> */}
                            {/* <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, marginLeft: 10, }}> */}
                            <View style={{ flexDirection: 'column', marginTop: 0, marginLeft: 10, }}>
                                <Icon name="ios-pin" style={{ fontSize: 20, color: colors.pink, }} />
                                {/* <View style={{ width: 8, height: 8, borderRadius: 8 / 2, backgroundColor: colors.pink }}></View>
                                <View style={{ width: 1, height: 40, marginTop: 5, backgroundColor: '#3E4958', }}></View>
                                <View style={{ marginTop: 5, }}>
                                    <ArrowDown />
                                </View> */}
                            </View>
                            <View style={{ marginLeft: 15, flex: 1, marginTop: 2, }}>
                                {/* <Text style={{ fontSize: 13, position: 'absolute', fontFamily: fonts.medium, }}>{props.currentAddress}</Text> */}
                                <Text style={{ fontSize: 13, fontFamily: fonts.medium, }}>{props.appointment.streetName}</Text>
                            </View>
                        </View>
                    </View>
                    {props.role == roles.styler && <View style={{ marginTop: 20, }}>
                        <SwipeButton
                            // thumbIconImageSource={service__1}
                            // onSwipeStart={() => this.showToastMessage('Swipe started!')}
                            // onSwipeFail={() => this.showToastMessage('Incomplete swipe!')}
                            onSwipeSuccess={() =>
                                props.endService()
                            }
                            railBackgroundColor={'#000000'}
                            titleColor={'#ffffff'}
                            titleFontSize={14}
                            titleStyles={{ fontFamily: fonts.bold }}
                            thumbIconBorderColor={colors.pink}
                            thumbIconComponent={swiperIcon}
                            thumbIconBackgroundColor={colors.pink}
                            title={'Slide to complete service'}
                        // thumbIconBackgroundColor={colors.pink}
                        />
                    </View>}
                </ScrollView> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Spinner color={colors.pink} />
                    </View>}
            </BottomSheet>}

            {Platform.OS === 'android' && <CoordinatorLayout style={{ flex: 1, width: '100%', position: 'absolute', zIndex: 1000 }}>
                <View style={{ flex: 1, backgroundColor: 'transparent', width: '100%' }}></View>
                <BottomSheetBehavior
                    // ref='bottomSheet'
                    peekHeight={210}
                    hideable={false}
                    state={BottomSheetBehavior.STATE_COLLAPSED}>
                    <View style={{ backgroundColor: '#ffffff' }}>
                        <View style={styles.header}>
                            <View style={styles.drawerIcon}></View>
                        </View>
                        {props.currentAddress && props.appointment ? <View style={{ paddingHorizontal: 30, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                    <View>
                                        {props.role == roles.user && <View>
                                            {props.appointment.stylerId ? <Thumbnail
                                                style={{ width: 35, height: 35 }}
                                                source={props.appointment.stylerId.imageUrl ? { uri: props.appointment.stylerId.imageUrl } : service__1}
                                            /> : null}
                                        </View>}
                                    </View>
                                    <View style={{ position: 'relative', left: 10 }}>
                                        <Text style={{ fontFamily: fonts.bold }}>{getName(props.appointment, props.role)}</Text>
                                        <View style={{ padding: 2, paddingHorizontal: 4, borderRadius: 3, backgroundColor: '#3A3A3A', height: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                            <Text style={{ fontSize: 8, color: colors.white, fontFamily: fonts.bold, position: 'relative', bottom: 1, }}>Card Payment</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Text style={{ fontFamily: fonts.bold }}>{`NGN${props.appointment.sumTotal}`}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Card style={styles.map_btn}>
                                    <CardItem style={styles.map_btn_icon}>
                                        <View style={{ marginTop: 10, marginRight: 1, }}>
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => Linking.openURL(`tel:${props.appointment.phoneNumber}`)}
                                            >
                                                <CallIcon />
                                            </TouchableOpacity>
                                        </View>
                                    </CardItem>
                                </Card>

                                <Card style={styles.map_btn}>
                                    <CardItem style={styles.map_btn_icon}>
                                        <View style={{ marginTop: 6, }}>
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => Linking.openURL(`whatsapp://send?text=hello&phone=${props.appointment.phoneNumber}`)}
                                            >
                                                <ChatIcon />
                                            </TouchableOpacity>
                                        </View>
                                    </CardItem>
                                </Card>

                                <Card style={styles.map_btn}>
                                    <CardItem style={styles.map_btn_icon}>
                                        <CloseIcon />
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ marginVertical: 30, }}>
                            <View style={{ borderColor: 'rgba(151, 173, 182, 0.2)', borderWidth: 0.5, borderRadius: 5, padding: 20, flexDirection: 'row', }}>
                            {/* <Text>11:24</Text> */}
                            {/* <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5, marginLeft: 10, }}> */}
                            <View style={{ flexDirection: 'column', marginTop: 0, marginLeft: 10, }}>
                                <Icon name="ios-pin" style={{ fontSize: 20, color: colors.pink, }} />
                                {/* <View style={{ width: 8, height: 8, borderRadius: 8 / 2, backgroundColor: colors.pink }}></View>
                                <View style={{ width: 1, height: 40, marginTop: 5, backgroundColor: '#3E4958', }}></View>
                                <View style={{ marginTop: 5, }}>
                                    <ArrowDown />
                                </View> */}
                            </View>
                            <View style={{ marginLeft: 15, flex: 1, marginTop: 2, }}>
                                {/* <Text style={{ fontSize: 13, position: 'absolute', fontFamily: fonts.medium, }}>{props.currentAddress}</Text> */}
                                <Text style={{ fontSize: 13, fontFamily: fonts.medium, }}>{props.appointment.streetName}</Text>
                            </View>
                        </View>
                            </View>
                            {props.role == roles.styler && <View style={{ marginBottom: 20, }}>
                                <SwipeButton
                                    // thumbIconImageSource={service__1}
                                    // onSwipeStart={() => this.showToastMessage('Swipe started!')}
                                    // onSwipeFail={() => this.showToastMessage('Incomplete swipe!')}
                                    onSwipeSuccess={() =>
                                        props.endService()
                                    }
                                    railBackgroundColor={'#000000'}
                                    titleColor={'#ffffff'}
                                    titleFontSize={14}
                                    titleStyles={{ fontFamily: fonts.bold }}
                                    thumbIconBorderColor={colors.pink}
                                    thumbIconComponent={swiperIcon}
                                    thumbIconBackgroundColor={colors.pink}
                                    title={'Slide to complete service'}
                                // thumbIconBackgroundColor={colors.pink}
                                />
                            </View>}
                        </View> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Spinner color={colors.pink} />
                            </View>}
                    </View>
                </BottomSheetBehavior>
                {/* <FloatingActionButton autoAnchor ref="fab" /> */}
            </CoordinatorLayout>}
        </>
    )
}

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
    },
    marker: {
        backgroundColor: colors.pink,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        position: 'relative',
        bottom: 60,
    },
    text: {
        fontFamily: fonts.bold,
        color: '#ffffff',
    },
    header: {
        height: HEADER_HEIGHT,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerIcon: {
        width: 35,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#D5DDE0',
    },
});
