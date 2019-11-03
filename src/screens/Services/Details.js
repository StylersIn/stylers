import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Card,
    CardItem,
    Body,
    Icon,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import StylerServiceList from './StylerServiceList';
import { SafeAreaView } from 'react-navigation';
import Modal from '../../components/Modal';
import { DateIcon, TimeIcon, LocationIcon } from './ServiceAssets';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getRating, calcTotalPrice } from '../../utils/stylersUtils';

class ServiceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selected: [],
            isVisible: false,
            date: new Date('2020-06-12T14:42:42'),
            mode: 'date',
            show: false,
            adult: 0,
            child: 0,
        }

        // document.addEventListener("click", function (event) {
        //     alert(event)
        // })
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    closeModal = () => {
        this.setState({ isVisible: false });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    setDate = (event, date) => {
        date = date || this.state.date;
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    selectService = (id) => {
        this.props.updateSelectedService(id);
        // this.setState((prevState) => {
        //     if (prevState.selected.findIndex(e => e.id === id) === -1) {
        //         return {
        //             selected: [{ id }, ...prevState.selected]
        //         }
        //     } else {
        //         return {
        //             selected: prevState.selected.filter(c => c.id !== id)
        //         }
        //     }
        // }, console.log(this.state.selected))
    }

    changeOption = (id, type, option, min = 0, max = 5) => {
        this.props.updateSelectedOption(id, type, option);
        // const { navigation } = this.props;
        // const styler = navigation.getParam('styler', '');
        // const { selected, } = this.state;
        // const totPrice = calcTotalPrice.apply(this, [styler, selected]);
        // this.setState((prevState) => {
        //     let prev = prevState.selected.find(e => e.id === id);
        //     let prevCount = prev && prev[type] || 0;
        //     let added = prevCount < max ? prevCount + 1 : max,
        //         subtracted = prevCount > min ? prevCount - 1 : 0 || 0;
        //     if (prevState.selected.findIndex(e => e.id === id) === -1) {
        //         return {
        //             selected: [{ id, [type]: option === 'add' ? added : subtracted, }, ...prevState.selected]
        //         }
        //     } else {
        //         let temp = prevState.selected.filter(c => c.id !== id);
        //         return {
        //             selected: [Object.assign(prev, { id, [type]: option === 'add' ? added : subtracted, }), ...temp]
        //         }
        //     }
        // }, this.props.updatePrice(totPrice))
    }

    render() {
        const { show, date, mode } = this.state;
        const { navigation } = this.props;
        const styler = navigation.getParam('styler', '');
        const { selected, } = this.state;
        const totPrice = calcTotalPrice.apply(this, [styler, selected]);

        return (
            <View style={{ flex: 1, }}>
                <View style={{ position: "absolute", top: 20, right: 0, padding: 20, zIndex: 1, }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon
                            style={{ fontSize: 60, color: "#000000", alignSelf: "flex-end", }}
                            type="Ionicons"
                            name="ios-close" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Image
                        style={{ height: 300, width: "100%" }}
                        source={service__1}
                    />
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, paddingBottom: 5, }}>{styler.name}</Text>
                        <Text>{styler.address}</Text>
                        <Text style={{ fontSize: 18 }}>Starts at <Text style={{ fontSize: 18, color: "#0E5B02", fontFamily: fonts.medium, }}>{`$${styler.startingPrice}`}</Text></Text>
                        <View style={{ marginVertical: 7, flexDirection: "row", paddingBottom: 5, }}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                startingValue={getRating(styler.ratings)}
                                ratingColor={"#E6750C"}
                                ratingTextColor={"#E6750C"}
                                ratingBackgroundColor={"#E6750C"}
                                imageSize={18}
                                showRating={false}
                                onFinishRating={this.ratingCompleted}
                            />
                        </View>
                        <Text style={{ fontFamily: fonts.medium, textDecorationLine: 'underline', }}>Send Message</Text>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>Reviews</Text>
                            <Card style={styles.cardStyle}>
                                <CardItem>
                                    <Body>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontFamily: fonts.bold, fontSize: 15 }}>John Doe</Text>
                                            <Text style={{ paddingLeft: 10, fontSize: 10, color: "#979797", marginTop: 4, }}>6d ago</Text>
                                        </View>
                                        <View style={{ marginVertical: 7, flexDirection: "row", }}>
                                            <Rating
                                                type='star'
                                                ratingCount={3}
                                                imageSize={14}
                                                showRating={false}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                        </View>
                                        <Text style={{ fontFamily: fonts.medium, fontSize: 12 }}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</Text>
                                        <Text style={{ alignSelf: "flex-end", fontSize: 11, fontStyle: "italic", color: "#1E1C95", }}>All Reviews</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>

                        <StylerServiceList {...this.props}
                            styler={styler}
                            selected={this.props.styler.selectedService || []}
                            // adult={this.state.adult}
                            // child={this.state.child}
                            onSelectService={this.selectService}
                            onChangeOption={this.changeOption}
                        />
                        <View style={{ alignSelf: "flex-end", marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.bold, fontSize: 22, }}>TOT - {`NGN${totPrice}`}</Text>
                        </View>

                        <View style={{ marginVertical: 50 }}>
                            <Button
                                onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                                btnTxt={"Schedule Appointment"}
                                size={"lg"}
                                btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    closeModal={this.closeModal}
                    isVisible={this.state.isVisible}
                >
                    <View>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 20, textAlign: "center", padding: 15, }}>NGN4000</Text>
                        <TouchableWithoutFeedback onPress={this.datepicker}>
                            <Card style={[styles.date__card, styles.cardStyle]}>
                                <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>Pick a Date</Text>
                                <View>
                                    <DateIcon />
                                </View>
                            </Card>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={this.datepicker}>
                            <Card style={[styles.date__card, styles.cardStyle]}>
                                <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>Pick a Time</Text>
                                <View>
                                    <TimeIcon />
                                </View>
                            </Card>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={this.datepicker}>
                            <Card style={[styles.date__card, styles.cardStyle]}>
                                <Text style={{ color: "#979797", fontFamily: fonts.bold, fontSize: 14, }}>Pick your Location</Text>
                                <View>
                                    <LocationIcon />
                                </View>
                            </Card>
                        </TouchableWithoutFeedback>

                        <View style={{ paddingVertical: 15, marginTop: 20, }}>
                            <Button
                                onPress={() => this.props.navigation.navigate('NoDebit')}
                                btnTxt={"Pay and Confirm"}
                                size={"lg"}
                                btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                            />
                        </View>

                        <View>
                            <Button
                                btnTxt={"Pay at Point of Service"}
                                size={"lg"}
                                styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                                btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </Modal>
                {show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        paddingRight: 12,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 10,
    },
    Input___shadow: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        // borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 2,
    },
    date__card: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
})

const mapStateToProps = state => ({
    services: state.services,
    styler: state.styler,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);