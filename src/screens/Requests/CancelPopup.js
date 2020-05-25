import React from 'react';
import Modal from "../../components/Modal";
import { View } from 'react-native';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Button from '../../components/Button';

const options = ["Not disposed for the job", "Service location is not favourable", "No reason"];
export default function (props) {
    return (
        <Modal
            closeModal={props.closeModal}
            isVisible={props.isVisible}
        >
            <View style={{ paddingVertical: 10, }}>
                <Text style={{ fontFamily: fonts.bold, textAlign: "center", fontSize: 18, }}>Why decline service?</Text>
                <View style={{ marginTop: 20, }}>
                    <RadioGroup
                        size={15}
                        thickness={2}
                        color='#606060'
                        onSelect={(index, value) => props.selectReason(value)}
                    >
                        {options.map((option, i) =>
                            <RadioButton
                                key={i}
                                style={{ margin: 3, padding: 1, paddingHorizontal: 5, paddingVertical: 7, }}
                                value={option.toLowerCase()} >
                                <Text style={{ fontSize: 16, marginTop: -2, }}>{option}</Text>
                            </RadioButton>)}
                    </RadioGroup>
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <Button
                        onPress={props.declineAppointment}
                        btnTxt={"Decline"}
                        size={"lg"}
                        disabled={!props.selectedReason}
                        loading={props.isProcessing}
                        styles={{ height: 40, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.black }}
                        btnTxtStyles={{ color: colors.black, fontSize: 12, fontFamily: fonts.bold }}
                    />
                </View>
            </View>
        </Modal>
    )
}