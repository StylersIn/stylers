import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Card,
    CardItem,
    Body,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import StylerServiceList from './StylerServiceList';
import { SafeAreaView } from 'react-navigation';

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selected: 0,
        }
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View>
                    <Image
                        style={{ height: 300, width: "100%" }}
                        source={service__1}
                    />
                </View>
                <ScrollView style={styles.container}>
                    <SafeAreaView>
                        <View>
                            <Text style={{ fontFamily: fonts.bold, fontSize: 24, paddingBottom: 5, }}>Thor Odinson</Text>
                            <Text>No 9 Centenary City , Enugu</Text>
                            <Text style={{ fontSize: 18 }}>Starts at <Text style={{ fontSize: 18, color: "#0E5B02", fontFamily: fonts.medium, }}>NGN1000</Text></Text>
                            <View style={{ marginVertical: 7, flexDirection: "row", paddingBottom: 5, }}>
                                <Rating
                                    type='star'
                                    ratingCount={3}
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

                            <StylerServiceList {...this.props} />
                            <View style={{ alignSelf: "flex-end" }}>
                                <Text style={{ fontFamily: fonts.bold, fontSize: 22, }}>TOT - NGN4000</Text>
                            </View>

                            <View style={{ paddingVertical: 20 }}>
                                <Button
                                    btnTxt={"Schedule Appointment"}
                                    size={"lg"}
                                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
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
    }
})

const mapStateToProps = state => ({
    services: state.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);