import React from 'react';
import {
    View,
    StyleSheet,
} from "react-native";
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';

export default function (props) {
    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 20, marginTop: 20, }}>
                {/* <Text style={styles.totalDueTxt}>{`Amount Due: NGN${props.totalAmt}`}</Text> */}
                <Text style={styles.totalDueTxt}>
                    {`Amount Due: NGN${props.totalAmt}`}
                </Text>
                {props.balance ? <View>
                    <Text style={styles.walletBalTxt}>{`Wallet Balance: NGN${props.balance}`}</Text>
                </View> : <Text>Loading...</Text>}
                <View style={styles.btnContainer}>
                    <Button
                        onPress={() => props.completeFromWallet()}
                        btnTxt={"Complete Payment from Wallet"}
                        size={"lg"}
                        loading={props.isProcessing}
                        btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: "center",
    },
    totalDueTxt: {
        textDecorationLine: 'line-through',
        fontFamily: fonts.bold,
        fontSize: 21,
        textAlign: "center",
        color: colors.gray,
    },
    walletBalTxt: {
        fontFamily: fonts.bold,
        color: colors.success,
        paddingVertical: 10,
        textAlign: "center",
    },
    btnContainer: {
        marginTop: 20,
    },
})