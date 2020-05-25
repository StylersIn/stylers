import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    RefreshControl,
    Animated,
    Easing,
} from 'react-native';
import {
    Icon,
    Thumbnail,
    Spinner,
    Card,
    CardItem,
} from 'native-base';
import { fonts, colors, roles } from '../constants/DefaultProps';
import Text from '../config/AppText';

function Notify (props) {
    const [opacity, setOpacity] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            easing: Easing.back(),
            duration: 500,
            useNativeDriver: true,
        }).start();
    })

    notification = () => {
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                easing: Easing.back(),
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 5000);
        return (
            <Animated.View style={{ opacity: opacity, zIndex: 1000, }}>
                <Card style={styles.Input___shadow}>
                    <CardItem style={{ borderRadius: 4, backgroundColor: colors.pink, flexDirection: 'row', }}>
                        <View>
                            <Icon style={{ color: colors.white, }} name='ios-add' />
                        </View>
                        <View>
                            <Text style={{ color: colors.white, fontFamily: fonts.bold, fontSize: 18, }}>{props.title}</Text>
                            <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{props.message}</Text>
                        </View>
                    </CardItem>
                </Card>
            </Animated.View>
        )
    }

    return (
        <>
            {notification()}
        </>
    )
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
});

export default Notify;