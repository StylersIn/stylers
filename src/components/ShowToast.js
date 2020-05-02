import React from 'react';
import { Platform, View, StyleSheet, StatusBar, } from 'react-native';
import Toast from 'react-native-root-toast';
import { fonts, colors } from '../constants/DefaultProps';
import { Icon } from 'native-base';
import Text from '../config/AppText';

const danger = "danger", success = "success", info = "info", warning = "warning";
const ShowToast = (text, type, duration = 3000) => {
    let bgColor = type === danger ? colors.danger :
        type === success ? colors.success :
            type === info ? colors.info :
                type === warning ? colors.warning : "#ccc";

    let toast = Toast.show(text, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: bgColor,
        containerStyle: { width: '80%', marginTop: Platform.OS === 'ios' ? 50 : null },
        textStyle: { fontFamily: fonts.medium, },
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
        Toast.hide(toast);
    }, duration);
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        padding: 20,
        // flexDirection: "row",
        paddingTop: Platform.OS === "ios" ? 50 : null

    },
    text: {
        fontFamily: fonts.default,
        color: '#ffffff',
        paddingLeft: 10,
        marginTop: "2%",
        // textAlign: "center",
        // position: "absolute",
        // bottom: 10
    }
})

export default ShowToast;