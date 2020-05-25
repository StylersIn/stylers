import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Picker,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
} from 'native-base';
import Button from '../components/Button';
import { fonts, colors, toastType } from '../constants/DefaultProps';
import Text from '../config/AppText';
import ShowToast from '../components/ShowToast';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import NavigationService from '../navigation/NavigationService';
import RNPickerSelect from 'react-native-picker-select';

class Withdraw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            isProcessing: undefined,
        }
    }

    componentDidMount() {
        this.props.listBanks();
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.error && prevProps.error != this.props.error) {
            alert(prevProps.error);
            this.setState({ isProcessing: false, });
        }
    }

    showToast = (text, type) => {
        ShowToast(text, type);
        this.setState({ isProcessing: false });
    }

    requestWithdrawal = () => {
        this.setState({ isProcessing: true });
        let account_number = this.account_number,
            bank_code = this.state.code,
            name = this.name,
            amount = this.amount;
        this.props.requestWithdrawal({ account_number, bank_code, name, amount, });
    }

    render() {
        const { banks, } = this.props;
        const { code, isProcessing, } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Withdraw</Text>
                    </View>
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        regular>
                        <Input
                            onChangeText={e => this.account_number = e}
                            style={{
                                fontFamily: fonts.medium,
                                fontSize: 13
                            }}
                            keyboardType={"numeric"}
                            placeholder='Account Number' />
                    </Item>

                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        regular>
                        <Input
                            onChangeText={e => this.name = e}
                            style={{
                                fontFamily: fonts.medium,
                                fontSize: 13
                            }}
                            autoCorrect={false}
                            placeholder='Account Name' />
                    </Item>

                    {/* <Item style={{ marginTop: 10, borderRadius: 5, padding: 15, }}
                        regular> */}
                        {/* <RNPickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={banks || []}
                        /> */}
                    <Picker
                        mode="dropdown"
                        style={{ width: "100%" }}
                        onValueChange={(code) => this.setState({ code, })}
                        selectedValue={code}
                        enabled={false}>
                        <Picker.Item key={1} label={"-- Select bank --"} value={undefined} />
                        {banks && banks.map((item, index) => {
                            return (
                                <Picker.Item key={index} label={item.name} value={item.code} />
                            );
                        })}
                    </Picker>
                    {/* </Item> */}

                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        regular>
                        <Input
                            onChangeText={e => this.amount = e}
                            style={{
                                fontFamily: fonts.medium,
                                fontSize: 13
                            }}
                            keyboardType={"numeric"}
                            placeholder='Amount' />
                    </Item>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={this.requestWithdrawal}
                            btnTxt={"Request Withdrawal"}
                            size={"lg"}
                            loading={isProcessing}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{
                                color: colors.black, fontFamily: fonts.medium
                            }}
                        />
                    </View>

                    {/* <View style={{ marginTop: 20, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfirmForgotPassword')}>
                            <Text style={{ color: colors.danger }}>Already have a code? Here</Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
    }
})

const mapStateToProps = state => ({
    banks: state.transaction.banks,
    error: state.transaction.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);