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

class NoDebit extends React.Component {

    state = {
        fetching: true,
        selectedCard: undefined,
        isVisible: false,
        isProcessing: false,
    }
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <PaymentNavIcon tintColor={"none"} />
        )
    }

    componentDidMount() {
        this.props.fetchCards();
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.cards && prevProps.cards != this.props.cards) {
            this.setState({ fetching: false, })
        }
        if (prevProps.tranx && prevProps.tranx != this.props.tranx) {
            this.completeTransaction();
        }
        if (prevProps.booked && prevProps.booked !== this.props.booked) {
            notify('Payment Successful', 'You have successfully made payment and your request is being processed.');
            this.setState({ isVisible: true });
            // this.props.socket.emit('appointmentBooked', styler._id)
        }
        if (prevProps.error && prevProps.error != this.props.error) {
            alert(prevProps.error);
        }
    }

    completeTransaction = () => {
        const { stylerData, } = this.props;
        let styler = stylerData;
        var req = {
            stylerId: styler.userId._id,
            services: this.props.services,
            scheduledDate: this.props.date,
            totalAmount: styler.totalAmt,
            streetName: this.props.streetName,
            pickUp: this.props.pickUp,
            transactionReference: null,
        }
        setTimeout(() => {
            this.props.saveAppointment(req);
        }, 500);
    }

    selectCard = (card) => {
        this.setState({ selectedCard: card, });
    }

    async chargeCard() {
        // const { navigation } = this.props;
        // let styler = navigation.getParam('styler', '');
        // let totalAmount = navigation.getParam('totalAmt', '');
        this.setState({ isProcessing: true });
        this.props.chargeAuthorization({
            authorizationCode: this.state.selectedCard.authorizationCode,
            amount: this.props.stylerData.totalAmt,
        });
    }

    addCard = () => {
        this.props.navigation.navigate('Payment');
    }

    closeModal = () => {
        this.setState({ isVisible: false });
    }

    render() {
        const { selectedCard, fetching, } = this.state;
        const { cards, stylerData, } = this.props;
        let styler = stylerData;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        {fetching ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Spinner color={colors.pink} />
                        </View> : <>
                                {cards && cards.length > 0 ? <>
                                    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                                        <Header
                                            close={true}
                                            title={'My Cards'}
                                        />
                                        <TouchableOpacity onPress={() => this.addCard()} activeOpacity={0.8}>
                                            <Text style={{ fontFamily: fonts.medium, color: colors.pink, }}>Add new payment method</Text>
                                        </TouchableOpacity>
                                        {cards.map((card, i) => <TouchableOpacity activeOpacity={0.7} onPress={() => this.selectCard(card)} key={i} style={styles.cardDetails}>
                                            <Radio
                                                color={"#f0ad4e"}
                                                selectedColor={"#5cb85c"}
                                                onPress={() => this.selectCard(card)}
                                                selected={selectedCard && selectedCard._id == card._id ? true : false}
                                            />
                                            <View style={{ paddingHorizontal: 10, }}>
                                                <Image source={require('../../../assets/imgs/visa.png')} />
                                            </View>

                                            <View style={{ paddingHorizontal: 10, }}>
                                                <Text style={{ fontSize: 18, fontFamily: fonts.bold, marginLeft: 15, alignSelf: 'center', }}>{`**** **** **** ${card.cardNumber}`}</Text>
                                            </View>
                                        </TouchableOpacity>)}
                                    </ScrollView>

                                    <View style={{ marginTop: 50, }}>
                                        <Button
                                            onPress={() => this.chargeCard()}
                                            btnTxt={"Pay"}
                                            loading={this.state.isProcessing}
                                            disabled={!this.state.selectedCard ? true : false}
                                            size={"lg"}
                                            btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                                        />
                                    </View>
                                </> : <>
                                        <View style={{ position: "absolute", right: 0, padding: 20, zIndex: 1, }}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.goBack()}
                                            >
                                                <Icon
                                                    style={{ fontSize: 60, color: "#000000", alignSelf: "flex-end", }}
                                                    type="Ionicons"
                                                    name="ios-close" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ height, justifyContent: "center", }}>
                                            <View style={{ alignItems: "center" }}>
                                                <PaymentIcon />
                                                <Text style={{ fontFamily: fonts.medium, fontSize: 24, paddingVertical: 20, }}>No debit card</Text>
                                                <Text style={{ textAlign: "center", fontSize: 16, paddingVertical: 20, }}>You don’t have any debit card associated with your account</Text>
                                            </View>
                                            <View style={{ paddingVertical: 20, marginTop: 20, }}>
                                                <Button
                                                    onPress={() => this.addCard()}
                                                    btnTxt={"Add Debit Card"}
                                                    size={"lg"}
                                                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                                                />
                                            </View>
                                        </View>
                                    </>}
                            </>}
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
        paddingHorizontal: 20,
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
})

const mapStateToProps = state => ({
    cards: state.user.cards,
    stylerData: state.appointment.stylerData,
    tranx: state.appointment.tranx,
    date: state.appointment.date,
    pickUp: state.map.selectedAddress.location,
    streetName: state.map.selectedAddress.name,
    services: state.styler.selectedService,
    booked: state.appointment.booked,
    error: state.appointment.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NoDebit);