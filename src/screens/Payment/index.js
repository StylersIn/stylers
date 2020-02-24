import PaystackWebView from 'react-native-paystack-webview';
import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import {
    Item,
    Input,
    Icon,
    CheckBox,
    Switch,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import mastercard from '../../../assets/imgs/mastercard.png';
import Modal from '../../components/Modal';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { LocationIcon, DateIcon, TimeIcon } from '../Services/ServiceAssets';
import RNPaystack from 'react-native-paystack';
import config from '../../config';
import ShowToast from '../../components/ShowToast';
import NavigationService from '../../navigation/NavigationService';
import { notify } from '../../services';
import avatar from '../../../assets/imgs/user.png';

RNPaystack.init({ publicKey: config.paystack });

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isProcessing: false,
            saveCard: false,
        }
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        const { navigation } = this.props;
        let styler = navigation.getParam('styler', '');
        if (prevProps.booked && prevProps.booked !== this.props.booked) {
            notify('Payment Successful', 'You have successfully made payment and your request is being processed.');
            this.setState({ isVisible: true });
            this.props.socket.emit('appointmentBooked', styler._id)
        }
    }

    async chargeCard() {
        const { stylerData, } = this.props;
        let styler = stylerData;
        this.setState({ isProcessing: true })
        await RNPaystack.chargeCardWithAccessCode({
            cardNumber: this.cardNumber,
            expiryMonth: this.expiryMonth,
            expiryYear: this.expiryYear,
            cvc: this.cvc,
            accessCode: this.props.transactionDetails.access_code
            // email: this.props.email,
            // amountInKobo: totalAmount * 100,
        })
            .then(response => {
                // this.setState({ isProcessing: false })
                if (response && response.reference) {
                    this.showToast(`Payment Successful ${'\n'} Please wait patiently while we complete your transaction...`, toastType.success, 3000);

                    var req = {
                        stylerId: styler._id,
                        services: this.props.services,
                        scheduledDate: this.props.date,
                        totalAmount: styler.totalAmt,
                        streetName: this.props.streetName,
                        pickUp: this.props.pickUp,
                        transactionReference: response.reference,
                        saveCard: this.state.saveCard,
                    }
                    setTimeout(() => {
                        this.props.saveAppointment(req);
                    }, 2000);
                }
                console.log(response); // card charged successfully, get reference here
            })
            .catch(error => {
                this.setState({ isProcessing: false })
                this.showToast(`${error.code} ${'\n'} ${error.message}`, toastType.danger, 5000);
            })

    }

    showToast = (text, type, duration = 0) => {
        ShowToast(text, type, duration);
        // this.setState({ isProcessing: false });
    }

    closeModal = () => {
        this.setState({ isVisible: false });
    }

    render() {
        const { navigation, stylerData, } = this.props;
        let styler = stylerData;
        // let totalAmount = navigation.getParam('totalAmt', '');
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            activeOpacity={0.7}>
                            <Icon
                                style={{ fontSize: 60, color: !this.state.isVisible ? "#000000" : "#ffffff", alignSelf: "flex-end", }}
                                type="Ionicons"
                                name="ios-close" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, fontFamily: fonts.bold, }}>Payment</Text>

                        <View style={{ marginVertical: 20 }}>
                            <View style={{ marginTop: 10, }}>
                                <Text style={{ fontFamily: fonts.medium }}>Card Number</Text>
                                <Item style={styles.input__main} regular>
                                    <Image
                                        style={{ width: 30, height: 30, marginHorizontal: 10, }}
                                        source={mastercard}
                                    />
                                    <Input
                                        onChangeText={e => this.cardNumber = e}
                                        style={{ fontFamily: fonts.bold, fontSize: 16 }}
                                        keyboardType={'numeric'}
                                        maxLength={16}
                                        placeholder='**** **** **** ****' />
                                </Item>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: fonts.medium }}>Valid Until</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ width: "48%", }}>
                                        <Item style={styles.input__main} regular>
                                            <Input
                                                onChangeText={e => this.expiryMonth = e}
                                                style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                                keyboardType={'numeric'}
                                                maxLength={2}
                                                returnKeyType={'next'}
                                                onSubmitEditing={() => { this.yearRef.focus() }}
                                                blurOnSubmit={false}
                                                placeholder='Month' />
                                        </Item>
                                    </View>

                                    <View style={{ width: "48%", }}>
                                        <Item style={styles.input__main} regular>
                                            <Input
                                                ref={(e) => this.yearRef = e}
                                                onChangeText={e => this.expiryYear = e}
                                                style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                                keyboardType={'numeric'}
                                                maxLength={2}
                                                placeholder='Year' />
                                        </Item>
                                    </View>
                                </View>
                            </View>

                            {/* <View style={{ marginTop: 10, }}>
                                <Text style={{ fontFamily: fonts.medium }}>Card Holder Name</Text>
                                <Item style={styles.input__main} regular>
                                    <Input
                                        onChangeText={e => this.name = e}
                                        style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                        placeholder='Your Name and Surname' />
                                </Item>
                            </View> */}

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: fonts.medium }}>CVV</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ width: "48%", }}>
                                        <Item style={styles.input__main} regular>
                                            <Input
                                                onChangeText={e => this.cvc = e}
                                                style={{ fontFamily: fonts.bold, fontSize: 16 }}
                                                keyboardType={'numeric'}
                                                maxLength={3}
                                                placeholder='***' />
                                        </Item>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, }}>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, }}>Save Card</Text>
                            <Switch
                                // ios_backgroundColor={colors.gray}
                                trackColor={colors.pink}
                                onValueChange={() => this.setState({ saveCard: !this.state.saveCard })}
                                value={this.state.saveCard}
                            />
                        </View>
                        </View>

                        {/* <View style={{ flexDirection: "row", }}>
                            <CheckBox
                                // color={"#606060"}
                                style={{ width: 22, height: 22, alignItems: "center", justifyContent: 'center', paddingTop: 1, }}
                                checked={true}
                            />
                            <Text style={{ paddingLeft: 20, marginTop: 1, fontFamily: fonts.medium, }}>Save card data for future payments</Text>
                        </View> */}

                        <View style={{ paddingVertical: 20, marginTop: 20, zIndex: -1, }}>
                            <Button
                                // onPress={() => this.setState({ isVisible: true })}
                                onPress={() => this.chargeCard()}
                                btnTxt={"Confirm"}
                                size={"lg"}
                                loading={this.state.isProcessing ? true : false}
                                btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <Modal
                    closeModal={this.closeModal}
                    isVisible={this.state.isVisible}
                    hideCloseBtn={true}
                >
                    <View style={{ alignItems: "center", paddingVertical: 20, }}>
                        <Image
                            source={styler.userId.imageUrl ? { uri: styler.userId.imageUrl } : avatar}
                            style={{ width: 110, height: 110, borderRadius: 5, }}
                        />
                        <Text style={{ fontFamily: fonts.bold, fontSize: 20, textAlign: "center", padding: 24, }}>{styler.name}</Text>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <LocationIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, textAlign: 'center', }}>{styler.address}</Text>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <DateIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, textAlign: 'center', }}>{this.props.date.toDateString()}</Text>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <TimeIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, textAlign: 'center', }}>{this.props.date.toTimeString()}</Text>
                        </View>
                        <View style={{ marginTop: 20, width: '100%' }}>
                            <Button
                                onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('Home'))}
                                btnTxt={"GO HOME"}
                                size={"lg"}
                                styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000", }}
                                btnTxtStyles={{ color: colors.black, fontFamily: fonts.medium }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    input__main: {
        borderRadius: 5,
        marginVertical: 6,
        height: 45,
    },
});

export default Payment;