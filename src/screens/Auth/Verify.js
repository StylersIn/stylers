import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Form, Item, Label, Input } from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation';
import OTPTextView from 'react-native-otp-textinput';
import NavigationService from '../../navigation/NavigationService';
import ShowToast from '../../components/ShowToast';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Verify extends React.Component {
    state = {
        token: '',
        isProcessing: false,
        mobile: undefined,
        error: undefined,
        resending: false,
        resent: false,
        resendFailed: false,
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.status && this.props.status !== prevProps.status) {
            this.props.navigation.dispatch(NavigationService.resetAction('Home'))
        }
        if (prevProps.status === false && this.props.status !== prevProps.status) {
            this.showToast(`Error: ${prevProps.message}`, toastType.danger);
        }
        if (this.props.resent !== prevProps.resent) {
            if (prevProps.resent == true) {
                this.setState({ resent: true, resending: false, });
            } else {
                // this.setState({ resendFailed: true, resending: false, });
            }
        }
        if (prevProps.error && this.props.error !== prevProps.error) {
            this.showToast(`Error: ${prevProps.error}`, toastType.danger);
        }
        if (prevProps.resendError && this.props.resendError !== prevProps.resendError) {
            this.setState({ resendFailed: true, resending: false, resent: false, });
        }
    }

    verify = () => {
        const { navigation } = this.props;
        this.setState({ isProcessing: true, error: undefined, })
        this.props.verifyAccount({
            email: navigation.getParam('email', 'email'),
            key: navigation.getParam('key', 'email'),
            token: this.state.token,
        })
    }

    resend = () => {
        const { navigation } = this.props;
        this.setState({ resending: true, resendFailed: false, });
        this.props.resendToken({ email: navigation.getParam('email', 'email') })
    }

    showToast = (text, type) => {
        // ShowToast(text, type);
        this.setState({ error: text });
        this.setState({ isProcessing: false });
    }

    render() {
        const {
            resending,
            resent,
            resendFailed,
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, }}>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.bold, fontSize: 20, padding: 30, }}>Enter the 4-digit code sent to your email</Text>

                    {/* <Form style={{ width: '100%', marginTop: 50, }}>
                        <Item floatingLabel>
                            <Label style={{ fontFamily: fonts.default }}>OTP</Label>
                            <Input
                                onChangeText={otp => this.setState({ otp })}
                                keyboardType={'number-pad'}
                                maxLength={12}
                                style={{ fontFamily: fonts.default, fontSize: 16, }}
                            />
                        </Item>
                    </Form> */}

                    <OTPTextView
                        containerStyle={styles.textInputContainer}
                        handleTextChange={token => this.setState({ token })}
                        inputCount={4}
                        tintColor={colors.pink}
                        keyboardType="numeric"
                    />

                    <View
                        style={{ alignItems: 'center', marginTop: 10 }}
                    >
                        {!resending ? <TouchableOpacity
                            style={{ alignItems: 'center', marginTop: 10 }}
                            activeOpacity={0.7}
                            onPress={this.resend}
                        >
                            <Text style={styles.text1}>
                                Haven't gotten the code yet? <Text style={{ color: colors.success, }}>Resend</Text>
                            </Text>
                        </TouchableOpacity> :
                            <Text style={styles.text1}>Loading...</Text>}
                        {resent && <Text style={styles.text2}>Sent</Text>}
                        {resendFailed && <Text style={[styles.text2, { color: colors.danger, }]}>An error occured while sending token</Text>}
                    </View>

                    {this.state.error && <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontFamily: fonts.medium, fontSize: 14, color: colors.danger, }}>{this.state.error}</Text>
                    </View>}
                </View>
                <View style={{ padding: 30, marginVertical: 10, alignItems: 'center', }}>
                    <Button
                        onPress={this.verify}
                        btnTxt={"Verify"}
                        loading={this.state.isProcessing}
                        style={{ backgroundColor: colors.black, width: '40%', }}
                        btnTxtStyles={{ color: '#ffffff', fontFamily: fonts.bold, }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        alignItems: 'center',
    },
    textInputContainer: {
        alignContent: 'center',
        marginTop: 50,
    },
    text1: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray,
    },
    text2: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.success,
    }
})

const mapStateToProps = state => ({
    status: state.user.status,
    resent: state.user.resent,
    resendError: state.user.resendError,
    message: state.user.message,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Verify);