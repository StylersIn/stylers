import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
import ShowToast from '../../components/ShowToast';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import NavigationService from '../../navigation/NavigationService';

class ConfirmForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            validationErr: false,
            pwMatchErr: false,
        }
    }

    componentDidMount() {
        // console.log()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.passwordChanged && nextProps.user.passwordChanged != this.props.user.passwordChanged) {
            alert('Password has been changed successfully, kindly login');
            this.props.navigation.dispatch(NavigationService.resetAction('Login'));
        }
        if (nextProps.user.error && nextProps.user.error != this.props.user.error) {
            this.setState({ isProcessing: false, })
            alert(`Error: ${nextProps.user.error}`);
        }
    }

    confirmPasswordChange = () => {
        this.setState({ isProcessing: true, })
        if (this.password != this.confirmPassword) {
            this.setState({ isProcessing: false });
            alert('Password and confirm password does not match');
            return;
        }
        return this.props.confirmPasswordChange({
            passwordToken: this.code,
            password: this.password,
        })
    }

    showToast = (text, type) => {
        ShowToast(text, type);
        this.setState({ isProcessing: false });
    }

    handleClick = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Change Password</Text>
                    </View>
                    {/* {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>} */}
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        // error={(this.phone === undefined || this.phone === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.code = e}
                            keyboardType={'numeric'}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            placeholder='Confrimation code' />
                    </Item>

                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        // error={(this.phone === undefined || this.phone === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.password = e}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            secureTextEntry={true}
                            placeholder='New Password' />
                    </Item>

                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        // error={(this.phone === undefined || this.phone === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.confirmPassword = e}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            secureTextEntry={true}
                            placeholder='Confirm New Password' />
                    </Item>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={this.confirmPasswordChange}
                            btnTxt={"CONFIRM"}
                            size={"lg"}
                            loading={this.state.isProcessing ? true : false}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{
                                color: colors.black, fontFamily: fonts.medium
                            }}
                        />
                    </View>
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
    user: state.user,
    register: state.register,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmForgotPassword);