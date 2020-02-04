import React from 'react';
import { StyleSheet, View, Dimensions, Platform, Linking, TouchableOpacity, } from 'react-native';
import {
    CoordinatorLayout,
    BottomSheetBehavior,
    FloatingActionButton,
} from 'react-native-bottom-sheet-behavior';
import SwipeButton from 'rn-swipe-button';
import { BottomSheet } from '../../components/BottomSheet';
import { Spinner, Thumbnail, Form, Card, CardItem } from 'native-base';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { colors, fonts, } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { WhatsAppIcon } from '../Appointments/AppointmentAssets';
import StylerServiceList from './StylerServiceList';

const HEADER_HEIGHT = 30;
const swiperIcon = () => {
    return (
        <SwiperIcon />
    )
}
function services(props) {
    return (
        <>
            <StylerServiceList
                styler={props.stylerData}
                selected={props.styler.selectedService || []}
                onSelectService={props.selectService}
                onChangeOption={props.changeOption}
            />
            <View style={{ alignSelf: "flex-end", marginTop: 10 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 22, }}>TOT - {`NGN${'totalAmt'}`}</Text>
            </View>
        </>
    )
}
export default function (props) {
    return (
        <>
            {Platform.OS === 'ios' && <BottomSheet
                top={210}
            >
                <View style={{ padding: 20, }}>
                    {services(props)}
                </View>
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
                        {services(props)}

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
