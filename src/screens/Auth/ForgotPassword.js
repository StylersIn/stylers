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

class ForgotPassword extends React.Component {
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
        if (nextProps.user.codeSent && nextProps.user.codeSent != this.props.user.codeSent) {
            this.setState({ isProcessing: false, });
            this.props.navigation.navigate('ConfirmForgotPassword');
            // alert('An authorization code has been sent to your email ');
        }
        if (nextProps.user.error && nextProps.user.error != this.props.user.error) {
            this.setState({ isProcessing: false, });
            alert(nextProps.user.error);
            // this.showToast(`Error: ${nextProps.user.error}`, toastType.danger);
        }
    }

    send = () => {
        this.setState({ isProcessing: true, });
        return this.props.sendConfirmationCode({ email: this.email })
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
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        // error={(this.phone === undefined || this.phone === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.email = e}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            placeholder='Email address' />
                    </Item>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={this.send}
                            btnTxt={"Send confirmation code"}
                            size={"lg"}
                            loading={this.state.isProcessing ? true : false}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{
                                color: colors.black, fontFamily: fonts.medium
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 20, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfirmForgotPassword')}>
                            <Text style={{ color: colors.danger }}>Already have a code? Here</Text>
                        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);