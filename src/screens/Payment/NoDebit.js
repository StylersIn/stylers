import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
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
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { PaymentIcon } from './PaymentAssests';
import { PaymentNavIcon } from '../../navigation/assets';

const { width, height } = Dimensions.get('window');

class NoDebit extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <PaymentNavIcon tintColor={"none"} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView>
                    <View style={styles.container}>
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
                                    onPress={() => this.props.navigation.navigate('Payment')}
                                    btnTxt={"Add Debit Card"}
                                    size={"lg"}
                                    btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
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
})

const mapStateToProps = state => ({
    services: state.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NoDebit);