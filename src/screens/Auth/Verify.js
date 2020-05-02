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

class Verify extends React.Component {
    state = {
        token: '',
        isProcessing: false,
        mobile: undefined,
        error: undefined,
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.status && this.props.status !== prevProps.status) {
            this.props.navigation.dispatch(NavigationService.resetAction('Home'))
        }
        if (prevProps.status === false && this.props.status !== prevProps.status) {
            this.showToast(`Error: ${prevProps.message}`, toastType.danger);
        }
        if (prevProps.error && this.props.error !== prevProps.error) {
            this.showToast(`Error: ${prevProps.error}`, toastType.danger);
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

    showToast = (text, type) => {
        // ShowToast(text, type);
        this.setState({ error: text });
        this.setState({ isProcessing: false });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, }}>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.bold, fontSize: 20, padding: 30, }}>Enter the 4-digit code sent to your phone</Text>

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
    }
})

const mapStateToProps = state => ({
    status: state.user.status,
    message: state.user.message,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Verify);