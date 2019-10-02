import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { View } from 'native-base';
import Button from '../../components/Button';
import Text from '../../config/AppText';
import { fonts } from '../../constants/DefaultProps';

const AuthScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ padding: 50 }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 25 }} >SIGN UP</Text>
            </View>
            <View>
                <Button
                    btnTxt={"CLIENT"}
                    size={"lg"}
                    btnTxtStyles={{ color: "white", fontFamily: fonts.default }}
                />
            </View>

            <View style={{ paddingTop: 20 }}>
                <Button
                    btnTxt={"STYLER"}
                    size={"lg"}
                    btnTxtStyles={{ color: "white", fontFamily: fonts.default }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default AuthScreen;