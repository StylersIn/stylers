import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
    Icon,
    Card,
    CardItem,
    Body,
    Left,
    Right,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { BarberIcon } from './ServiceAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selected: 0,
        }
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    handleChange = () => {
        this.setState({ showList: !this.state.showList });
    }

    selectListItem = (index, value) => {
        this.setState({
            selected: index
        })
    }

    render() {
        const { showList } = this.state;
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={{ zIndex: 1 }}>
                        <Header
                            list
                            title={"Haircuts"}
                            onChange={this.handleChange}
                            showList={this.state.showList}
                            selectListItem={this.selectListItem}
                            selected={this.state.selected}
                        />
                    </View>
                    <View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Image
                                            style={{ width: 80, height: 80, borderRadius: 5, }}
                                            source={service__1}
                                        />
                                    </Left>
                                    <Body style={{ position: "relative", right: 15, }}>
                                        <Text style={{ fontFamily: fonts.bold }}>Thor Odinson</Text>
                                        <Text style={{ fontSize: 10, marginTop: 10, }}>No 9 Centenary City, Enugu</Text>
                                        <Text style={{ fontSize: 10, }}>Starts at NGN1000 </Text>
                                        <View style={{ marginTop: 7, flexDirection: "row" }}>
                                            <Rating
                                                type='star'
                                                ratingCount={3}
                                                imageSize={12}
                                                showRating={false}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                            <Text style={{ fontSize: 10, marginLeft: 7, }}>6 <Text style={{ fontSize: 10, }}>Reviews</Text> </Text>
                                        </View>
                                    </Body>
                                    <View style={{ flexDirection: "column", justifyContent: "space-between", position: "relative", left: 10, }}>
                                        <View style={{ alignSelf: "flex-end" }}>
                                            <BarberIcon />
                                        </View>
                                        <View style={{ marginTop: "30%" }}>
                                            <Button
                                                onPress={() => this.props.navigation.navigate('ServiceDetails')}
                                                btnTxt={"Place booking"}
                                                size={"sm"}
                                                btnTxtStyles={{ color: colors.white, fontSize: 10, fontFamily: fonts.bold, }}
                                                styles={{ height: 24 }}
                                            />
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    }
})

const mapStateToProps = state => ({
    services: state.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);