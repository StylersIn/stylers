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
    Icon,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
import ShowToast from '../../components/ShowToast';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import NavigationService from '../../navigation/NavigationService';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

const { width, height } = Dimensions.get('screen');
const COUNTRY = ['NG'];

class Register extends React.Component {
    constructor(props) {
        super(props);
        let userLocaleCountryCode = 'NG';
        let cca2 = userLocaleCountryCode;
        let callingCode = null;
        getAllCountries()
            .then((country) => country.filter(e => COUNTRY.includes(e.cca2)))
            .then((country) => {
                if (!cca2 || !country) {
                    this.setState({ callingCode: '234', countryCode: 'NG' })
                } else {
                    this.setState({ callingCode: country[0].callingCode[0] })
                }
            });

        this.state = {
            isProcessing: false,
            validationErr: false,
            mainErr: undefined,
            pwMatchErr: false,
            mainErr: undefined,
            social_user: {},
            verify: false,
            social_user: {},
            country: '',
            region: '',
            cca2,
            callingCode,
            visible: false,
            countryCode: 'NG',
            withFilter: true,
            withFlag: true,
            withCountryNameButton: true,
            withAlphaFilter: true,
            withCallingCode: true,
            withEmoji: true,
            editable: true,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
        //     this.setState({ isProcessing: false });
        //     this.props.navigation.dispatch(NavigationService.resetAction('Verify'));
        // }
        // if (nextProps.user.status === false && nextProps.user.status != this.props.user.status) {
        //     this.showToast(nextProps.user.message, toastType.danger);
        // }
        if (nextProps.register.created == false && nextProps.register.created != this.props.register.created) {
            alert(nextProps.register.message);
            this.setState({ isProcessing: false, });
        }
        if (nextProps.register.created == true && nextProps.register.created != this.props.register.created) {
            this.setState({ isProcessing: false });
            this.props.navigation.navigate('Verify', { email: this.email })
            // this.props.navigation.dispatch(NavigationService.resetAction('Verify'));
        }
        if (nextProps.register.message && nextProps.register.message != this.props.register.message) {
            this.showErr(nextProps.register.message);
        }
    }

    doRegister = () => {
        const { callingCode, countryCode, } = this.state;
        this.setState({ isProcessing: true });
        let email = this.email;
        let name = this.name;
        let phoneNumber = this.phone;
        let gender = this.gender;
        let password = this.password;
        let confirmPassword = this.confirmPassword;
        if (!name || !email || !password || !phoneNumber || !gender) {
            this.setState({ validationErr: true, isProcessing: false, })
        } else if (password !== confirmPassword) {
            this.setState({ pwMatchErr: true, isProcessing: false, })
        } else {
            return this.props.doRegister({
                email,
                name,
                phoneNumber,
                gender: 'M',
                password,
                callingCode,
                countryCode,
            })
        }
    }

    showErr = (err) => {
        // ShowToast(text, type);
        this.setState({ mainErr: err });
        this.setState({ isProcessing: false });
    }

    handleClick = () => {
        this.props.navigation.navigate('Home')
    }

    initUser(token) {
        fetch('https://graph.facebook.com/v2.10/me?fields=id,name,first_name,last_name,email,gender,link,locale,timezone,updated_time,verified&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ social_user: json });
                setTimeout(() => {
                    this.props.verifySocialMediaLogin({ email: json.email });
                }, 0);
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    fbLogin = () => {
        this.setState({ verify: true })
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
            (result) => {
                if (result.isCancelled) {
                    this.setState({ verify: false })
                    console.log('Login cancelled')
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            // console.log(data.accessToken.toString())
                            this.initUser(data.accessToken.toString())
                        }
                    )
                }
            },
            (error) => {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    openModal = () => {
        this.setState({ visible: true });
    }

    render() {
        const onSelect = value => {
            this.setState({ cca2: value.cca2, callingCode: value.callingCode, countryCode: value.cca2, visible: true, });
        }
        const onClose = _ => this.setState({ visible: false, });
        const {
            visible,
            callingCode,
            countryCode,
            withFilter,
            withFlag,
            withCountryNameButton,
            withAlphaFilter,
            withCallingCode,
            withEmoji,
            editable,
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Create {"\n"}Your Account</Text>
                    </View>
                    {this.state.mainErr && <Text style={{ color: colors.danger, fontFamily: fonts.bold }}>{this.state.mainErr}</Text>}
                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>}
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.name === undefined || this.name === '') && this.state.validationErr}
                        regular>
                        <Input
                            autoCorrect={false}
                            onChangeText={e => this.name = e}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            placeholder='Your name' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.email === undefined || this.email === '') && this.state.validationErr}
                        regular>
                        <Input
                            autoCorrect={false}
                            onChangeText={e => this.email = e}
                            autoCapitalize={'none'}
                            style={{
                                fontFamily: fonts.medium,
                                fontSize: 13,
                            }}
                            placeholder='Email' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, height: 50, }}
                        error={(this.phone === undefined || this.phone === '') && this.state.validationErr}
                        regular>
                        <TouchableOpacity
                            style={styles.inputAddon}
                            onPress={this.openModal}
                        >
                            <CountryPicker
                                {...{
                                    countryCode,
                                    withFilter,
                                    withFlag,
                                    withAlphaFilter,
                                    withCallingCode,
                                    withEmoji,
                                    onSelect,
                                    onClose,
                                }}
                                visible={visible}
                            />
                            <Text style={styles.addonTxt}>{callingCode}</Text>
                            <Icon style={styles.addonTxt} name="ios-arrow-down" />
                        </TouchableOpacity>
                        <Input
                            keyboardType={"numeric"}
                            onChangeText={e => this.phone = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Phone Number' />
                    </Item>
                    <View style={{ marginVertical: 8 }}>
                        <RadioGroup
                            size={18}
                            thickness={2}
                            color='#606060'
                            style={{ flexDirection: 'row' }}
                            // selectedIndex={1}
                            onSelect={(index, value) => this.gender = value}
                        >
                            <RadioButton
                                // style={{ margin: 3, padding: 1, paddingHorizontal: 5, }}
                                value={'M'} >
                                <Text style={{ fontSize: 12, fontFamily: fonts.medium, }}>{'Male'}</Text>
                            </RadioButton>
                            <RadioButton
                                // style={{ margin: 3, padding: 1, paddingHorizontal: 5, }}
                                value={'F'} >
                                <Text style={{ fontSize: 12, fontFamily: fonts.medium }}>{'Female'}</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.password === undefined || this.password === '') && this.state.validationErr}
                        regular>
                        <Input
                            secureTextEntry={true}
                            onChangeText={e => this.password = e}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            placeholder='Password' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.password !== this.confirmPassword) && this.state.validationErr}
                        regular>
                        <Input
                            secureTextEntry={true}
                            onChangeText={e => this.confirmPassword = e}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            placeholder='Re-Password' />
                    </Item>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={this.doRegister}
                            btnTxt={"SIGN UP"}
                            size={"lg"}
                            loading={this.state.isProcessing ? true : false}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{
                                color: colors.black, fontFamily: fonts.medium
                            }}
                        />
                    </View>

                    {/* <View style={{ alignItems: "center", paddingVertical: 10 }}>
                        <Text style={{ fontFamily: fonts.bold }}>OR</Text>
                    </View> */}

                    {/* <View>
                        <Button
                            onPress={this.fbLogin.bind(this)}
                            size={"lg"}
                            Icon={<FacebookIcon />}
                            styles={{ backgroundColor: colors.facebook }}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                        />
                    </View> */}
                    {/* <View style={{ marginTop: 20 }}>
                        <Button
                            // onPress={this.handleClick.bind(this)}
                            onPress={() => alert('Sorry, we are currently fixing this module!')}
                            size={"lg"}
                            Icon={<GoogleIcon />}
                            styles={{ backgroundColor: colors.google }}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.default }}
                        />
                    </View> */}

                    <View style={{ marginVertical: 20, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Already a member? Login</Text>
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
        // marginTop: 100,
        // justifyContent: "center",
    },
    inputAddon: {
        height: '100%',
        width: 95,
        backgroundColor: colors.pink,
        // borderTopLeftRadius: 50 / 2,
        // borderBottomLeftRadius: 50 / 2,
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    addonTxt: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.medium,
    },
    primaryText: {
        fontFamily: fonts.bold,
        color: '#222B2F',
        fontSize: 13,
        marginBottom: 3
    },
    secondaryText: {
        color: '#9BABB4',
        fontSize: 11,
    },
})

const mapStateToProps = state => ({
    user: state.user,
    register: state.register,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);