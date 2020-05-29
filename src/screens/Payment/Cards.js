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
import PayWithCardView from './PayWithCardView';
import PayDirectView from './PayDirectView';
import DeleteCardModal from './DeleteCardModal';

const { width, height } = Dimensions.get('window');

class NoDebit extends React.Component {

    state = {
        fetching: true,
        selectedCard: undefined,
        isVisible: false,
        isProcessing: false,
        isDeleteCardVisible: false,
        cardId: undefined,
    }
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <PaymentNavIcon tintColor={"none"} />
        )
    }

    componentDidMount() {
        this.props.fetchCards();
        this.props.getBalance();
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.cards && prevProps.cards != this.props.cards) {
            this.setState({ fetching: false, })
        }
        if (prevProps.tranx && prevProps.tranx != this.props.tranx) {
            this.completeTransaction();
        }
        if (prevProps.booked && prevProps.booked !== this.props.booked) {
            const { stylerData, } = this.props;
            let styler = stylerData;
            // notify('Payment Successful', 'You have successfully made payment and your request is being processed.');
            this.setState({ isVisible: true });
            this.props.socket.emit('appointmentBooked', styler.publicId)
        }
        if (prevProps.error && prevProps.error != this.props.error) {
            alert(prevProps.error);
            this.setState({ isProcessing: false });
        }
        if (prevProps.deleted && prevProps.deleted != this.props.deleted) {
            this.setState({ fetching: true, isDeleteCardVisible: false, isProcessing: false, });
            this.props.fetchCards();
        }
    }

    completeTransaction = () => {
        this.setState({ isProcessing: true, });
        const { stylerData, } = this.props;
        let styler = stylerData;
        var req = {
            stylerId: styler._id,
            services: this.props.services,
            scheduledDate: this.props.date,
            // totalAmount: styler.totalAmt,
            totalAmount: styler.totalDue,
            sumTotal: stylerData.totalAmt,
            streetName: this.props.streetName,
            pickUp: this.props.pickUp,
            transactionReference: null,
        }
        // console.log(req)
        setTimeout(() => {
            this.props.saveAppointment(req);
        }, 500);
    }

    selectCard = (card) => {
        this.setState({ selectedCard: card, });
    }

    chargeCard = async () => {
        // const { navigation } = this.props;
        // let styler = navigation.getParam('styler', '');
        // let totalAmount = navigation.getParam('totalAmt', '');
        const {
            selectedCard,
        } = this.state;
        const {
            stylerData,
        } = this.props;
        this.setState({ isProcessing: true });
        this.props.chargeAuthorization({
            authorizationCode: selectedCard.authorizationCode,
            amount: stylerData.totalDue,
            sumTotal: stylerData.totalAmt,
            email: selectedCard.email,
        });
    }

    addCard = () => {
        this.props.navigation.navigate('Payment');
    }

    closeModal = () => {
        this.setState({ isVisible: false });
    }

    toggleDeleteModal = (id) => this.setState({ isDeleteCardVisible: !this.state.isDeleteCardVisible, cardId: id, });

    removeCard = () => {
        this.setState({ isProcessing: true, });
        const { cardId, } = this.state;
        this.props.removeCard(cardId);
    }

    render() {
        const {
            selectedCard,
            fetching,
            isProcessing,
            isDeleteCardVisible,
        } = this.state;
        const {
            cards,
            stylerData,
            balance,
        } = this.props;
        let styler = stylerData;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        {fetching ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Spinner color={colors.pink} />
                        </View> : <>
                                {styler.totalDue > 0 ? <PayWithCardView
                                    cards={cards}
                                    totalDue={styler.totalDue}
                                    selectCard={this.selectCard}
                                    selectedCard={selectedCard}
                                    chargeCard={this.chargeCard}
                                    isProcessing={isProcessing}
                                    navigation={this.props.navigation}
                                    addCard={this.addCard}
                                    toggleDeleteModal={this.toggleDeleteModal}
                                /> : <PayDirectView
                                        totalDue={styler.totalDue}
                                        totalAmt={styler.totalAmt}
                                        balance={balance}
                                        isProcessing={isProcessing}
                                        completeFromWallet={this.completeTransaction}
                                    />}
                            </>}
                    </View>
                </SafeAreaView>
                <DeleteCardModal
                    isProcessing={isProcessing}
                    removeCard={this.removeCard}
                    isDeleteCardVisible={isDeleteCardVisible}
                    deleteCardVisible={this.deleteCardVisible}
                    close={this.toggleDeleteModal}
                />
                <Modal
                    closeModal={this.closeModal}
                    isVisible={this.state.isVisible}
                    hideCloseBtn={true}
                >
                    <View style={{ alignItems: "center", paddingVertical: 20, }}>
                        <Image
                            source={styler.imageUrl ? { uri: styler.imageUrl } : avatar}
                            style={{ width: 110, height: 110, borderRadius: 5, }}
                        />
                        <Text style={{ fontFamily: fonts.bold, fontSize: 20, textAlign: "center", padding: 24, }}>{styler.name}</Text>

                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ alignSelf: "center" }}>
                                <LocationIcon />
                            </View>
                            <Text style={{ fontFamily: fonts.medium, fontSize: 14, textAlign: 'center', }}>{this.props.streetName}</Text>
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
        // paddingHorizontal: 20,
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
    socket: state.socket,
    balance: state.user.balance,
    deleted: state.user.deleted,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NoDebit);