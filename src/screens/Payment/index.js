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
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import mastercard from '../../../assets/imgs/mastercard.png';
import Modal from '../../components/Modal';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { LocationIcon, DateIcon, TimeIcon } from '../Services/ServiceAssets';

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    closeModal = () => {
        this.setState({ isVisible: false });
    }

    render() {
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
                                        style={{ fontFamily: fonts.bold, fontSize: 16 }}
                                        placeholder='**** **** **** ****' />
                                </Item>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: fonts.medium }}>Valid Until</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ width: "48%", }}>
                                        <Item style={styles.input__main} regular>
                                            <Input
                                                style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                                placeholder='Month' />
                                        </Item>
                                    </View>

                                    <View style={{ width: "48%", }}>
                                        <Item style={styles.input__main} regular>
                                            <Input
                                                style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                                placeholder='Year' />
                                        </Item>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, }}>
                                <Text style={{ fontFamily: fonts.medium }}>Card Holder Name</Text>
                                <Item style={styles.input__main} regular>
                                    <Input
                                        style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                        placeholder='Your Name and Surname' />
                                </Item>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: fonts.medium }}>CVV</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <View style={{ width: "48%", }}>
                                        <Item style={styles.input__main} regular>
                                            <Input
                                                style={{ fontFamily: fonts.bold, fontSize: 16 }}
                                                placeholder='***' />
                                        </Item>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", }}>
                            <CheckBox checked={true} />
                            <Text style={{ paddingLeft: 20, marginTop: 1, fontFamily: fonts.medium, }}>Save card data for future payments</Text>
                        </View>

                        <View style={{ paddingVertical: 20, marginTop: 20, zIndex: -1, }}>
                            <Button
                                onPress={() => this.setState({ isVisible: true })}
                                btnTxt={"Confirm"}
                                size={"lg"}
                                btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <Modal
                    closeModal={this.closeModal}
                    isVisible={this.state.isVisible}
                >
                    <View style={{ alignItems: "center", paddingVertical: 20, }}>
                        <Image
                            source={service__1}
                            style={{ width: 110, height: 110, borderRadius: 5, }}
                        />
                        <Text style={{ fontFamily: fonts.bold, fontSize: 20, textAlign: "center", padding: 24, }}>Thor Odinson</Text>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <LocationIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>5342 Centenary City</Text>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <DateIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>23rd December, 2019</Text>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <TimeIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 16, }}>3:00PM</Text>
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