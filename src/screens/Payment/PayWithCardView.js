import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
    Icon,
    CheckBox,
    Radio,
    Spinner,
    Card,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { PaymentIcon } from './PaymentAssests';
import { PaymentNavIcon } from '../../navigation/assets';
import Header from '../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from '../../components/Modal';
import { DateIcon, LocationIcon, TimeIcon } from '../Services/ServiceAssets';
import NavigationService from '../../navigation/NavigationService';
import avatar from '../../../assets/imgs/user.png';
import { notify } from '../../services';

const { width, height } = Dimensions.get('window');

export default function (props) {
    return (
        <>
            {props.cards && props.cards.length > 0 ? <>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    <Header
                        close={true}
                        title={'My Cards'}
                    />
                    <View style={{ paddingHorizontal: 20, }}>
                        <TouchableOpacity onPress={() => props.addCard()} activeOpacity={0.8}>
                            <Text style={{ fontFamily: fonts.medium, color: colors.pink, }}>Add new payment method</Text>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: fonts.bold, color: colors.gray, paddingVertical: 20, }}>{`Amount Due: NGN${props.totalDue}`}</Text>
                        {/* {props.cards.map((card, i) => <TouchableOpacity activeOpacity={0.7} onPress={() => props.selectCard(card)} key={i} style={styles.cardDetails}>
                            <Radio
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                onPress={() => props.selectCard(card)}
                                selected={props.selectedCard && props.selectedCard._id == card._id ? true : false}
                            />
                            <View style={{ paddingHorizontal: 10, }}>
                                <Image source={require('../../../assets/imgs/visa.png')} />
                            </View>

                            <View style={{ paddingHorizontal: 10, }}>
                                <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginLeft: 15, alignSelf: 'center', }}>{`**** **** **** ${card.cardNumber}`}</Text>
                            </View>
                        </TouchableOpacity>)} */}

                        {props.cards.map((card, i) => <TouchableOpacity activeOpacity={0.7} onPress={() => props.selectCard(card)} key={i}>
                            <Card key={i} style={[{ padding: 20, }, styles.cardShadow]}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ paddingHorizontal: 10, }}>
                                        <Image source={require('../../../assets/imgs/visa.png')} />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => props.toggleDeleteModal(card._id)}
                                        // style={{ alignSelf: 'flex-end', }}
                                        activeOpacity={0.7}
                                    >
                                        <Icon
                                            style={{ color: '#BBB', }}
                                            name="ios-trash"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 14, }}>Card number</Text>
                                <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>{`**** **** **** ${card.cardNumber}`}</Text>
                                <View style={{ marginTop: 20, }}></View>
                                <Radio
                                    color={"#f0ad4e"}
                                    style={{ alignSelf: "flex-end", }}
                                    selectedColor={"#5cb85c"}
                                    onPress={() => props.selectCard(card)}
                                    selected={props.selectedCard && props.selectedCard._id == card._id ? true : false}
                                />
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 12, }}>Date</Text>
                                    <Text style={{ fontFamily: fonts.bold, fontSize: 14, }}>{`${item.expMonth}/${'2022'.slice(2, 4)}`}</Text>
                                </View>
                            </View> */}
                            </Card>
                        </TouchableOpacity>)}

                        <View style={{ flex: 1, marginTop: 50, }}>
                            <Button
                                onPress={() => props.chargeCard()}
                                btnTxt={"Pay"}
                                loading={props.isProcessing}
                                disabled={!props.selectedCard ? true : false}
                                size={"lg"}
                                btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </> : <>
                    <View style={{ position: "absolute", right: 0, padding: 20, zIndex: 1, }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                        >
                            <Icon
                                style={{ fontSize: 60, color: "#000000", alignSelf: "flex-end", }}
                                type="Ionicons"
                                name="ios-close" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height, justifyContent: "center", paddingHorizontal: 20, }}>
                        <View style={{ alignItems: "center" }}>
                            <PaymentIcon />
                            <Text style={{ fontFamily: fonts.medium, fontSize: 24, paddingVertical: 20, }}>No debit card</Text>
                            <Text style={{ textAlign: "center", fontSize: 16, paddingVertical: 20, }}>You don’t have any debit card associated with your account</Text>
                        </View>
                        <View style={{ paddingVertical: 20, marginTop: 20, }}>
                            <Button
                                onPress={() => props.addCard()}
                                btnTxt={"Add Debit Card"}
                                size={"lg"}
                                btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    input__main: {
        borderRadius: 5,
        marginVertical: 6,
        height: 45,
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
        marginTop: 15,
    },
    text_1: {
        color: '#02A05D',
        fontSize: 12,
    },
    date_txt: {
        fontSize: 12,
    },
    input: {
        fontFamily: fonts.default,
        marginLeft: 20,
    },
    cardShadow: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        // shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
})