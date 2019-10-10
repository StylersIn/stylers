import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';

const Modal = (props) => {
    const { loading, text } = props;

    return (
        <View style={styles.container}>
            <View style={styles.activityIndicatorWrapper}>
                {props.children}
            </View>
        </View>

        // <View style={styles.container}>
        // <View style={styles.activityIndicatorWrapper}>
        //     {/* <ActivityIndicator animating={loading} /> */}
        //     <Icon style={{ fontSize: 70, color: "#bbb", marginBottom: -30 }} type="Ionicons" name="ios-information-circle-outline" />
        //     {text && <Text>{text}</Text>}
        //     <TouchableOpacity style={{ borderTopWidth: 1, borderTopColor: "#F1F1F3", width: "100%", alignItems: "center" }}>
        //         <View style={{ marginTop: 8 }}>
        //             <Text>Close</Text>
        //         </View>
        //     </TouchableOpacity>
        // </View>
        // </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        zIndex: 200,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 200,
        width: 200,
        zIndex: 500,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default Modal;