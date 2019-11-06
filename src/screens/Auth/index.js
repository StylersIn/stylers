import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { View } from 'native-base';
import Button from '../../components/Button';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';
import ImagePicker from 'react-native-image-crop-picker';

const AuthScreen = (props) => {
    const openImg = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.path);
        });
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 30, alignItems: "center" }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 25 }} >SIGN UP</Text>
            </View>

            <View>
                <Button
                    btnTxt={"CLIENT"}
                    onPress={() => props.navigation.navigate('Register')}
                    size={"lg"}
                    styles={{ backgroundColor: colors.pink }}
                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                />
            </View>

            <View style={{ paddingTop: 20 }}>
                <Button
                    onPress={() => props.navigation.navigate('Stylers')}
                    btnTxt={"STYLER"}
                    size={"lg"}
                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                />
            </View>

            {/* <View style={{ paddingTop: 20 }}>
                <Button
                    onPress={() => openImg()}
                    btnTxt={"GET IMAGE"}
                    size={"lg"}
                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                />
            </View> */}

            <View style={{ padding: 10, alignItems: "center" }}>
                <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => props.navigation.navigate('Login')}>
                    <Text style={{ fontFamily: fonts.default, }} >Already a registered user?</Text>
                    <Text style={{ color: colors.yellow, paddingHorizontal: 5, }}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        // alignItems: "center",
    }
})

export default AuthScreen;