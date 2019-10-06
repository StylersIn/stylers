import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { BarberIcon } from './ServiceAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';

class Services extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"Browse Services"}
                />
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Image
                                        style={{ width: 80, height: 80, borderRadius: 5, }}
                                        source={service__1}
                                    />
                                </Left>
                                <Body style={{ position: "relative", right: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text style={{ fontFamily: fonts.bold }}>Thor Odinson</Text>
                                        <Text style={{ fontSize: 10, marginTop: 10, }}>No 9 Centenary City, Enugu</Text>
                                        <Text style={{ fontSize: 10, }}>Starts at NGN1000 </Text>
                                    </View>

                                    <View>
                                        <View>
                                            <BarberIcon />
                                        </View>
                                        <View>
                                            <Button
                                                btnTxt={"Place booking"}
                                                size={"sm"}
                                                btnTxtStyles={{ color: colors.white, fontSize: 10, fontFamily: fonts.bold, }}
                                                styles={{ height: 24 }}
                                            />
                                        </View>
                                    </View>
                                </Body>
                                {/* <Right style={{ flexDirection: "column", justifyContent: "space-between", position: "relative", left: 10 }}>
                                    
                                </Right> */}
                            </CardItem>
                        </Card>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: Platform.OS == "ios" ? 50 : 0
    }
})

const mapStateToProps = state => ({
    services: state.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);