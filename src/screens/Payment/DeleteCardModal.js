import React from 'react';
import { View } from 'react-native';
import Modal from '../../components/Modal';
import Text from '../../config/AppText';
import Button from '../../components/Button';
import { colors, fonts } from '../../constants/DefaultProps';
import { Spinner } from 'native-base';

export default function (props) {
    return (
        <Modal
            hideCloseBtn
            isVisible={props.isDeleteCardVisible}
        >
            {!props.isProcessing ? <View>
                <View style={{ alignItems: 'center', padding: 20, }}>
                    <Text style={{ textAlign: 'center', }}>Are you sure you want to remove card?</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', paddingBottom: 10, }}>
                    <Button
                        onPress={() => props.close()}
                        btnTxt={"Cancel"}
                        styles={{ width: '30%', backgroundColor: colors.danger, height: 40, }}
                        btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.medium, }}
                    />
                    <Button
                        onPress={() => props.removeCard()}
                        btnTxt={"Continue"}
                        styles={{ width: '30%', backgroundColor: colors.white, borderColor: colors.danger, borderWidth: 1, height: 40, }}
                        btnTxtStyles={{ color: colors.default, fontSize: 12, fontFamily: fonts.medium, }}
                    />
                </View>
            </View> : <View style={{ justifyContent: 'center', }}>
                    <Spinner />
                </View>}
        </Modal>
    )
}