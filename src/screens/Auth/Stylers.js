import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
    Icon,
    Form,
    Textarea,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import ShowToast from '../../components/ShowToast';
import { SafeAreaView } from 'react-navigation';
// import Toast from 'react-native-root-toast';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import NavigationService from '../../navigation/NavigationService';

const { width, height } = Dimensions.get('screen');

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            validationErr: false,
            mainErr: undefined,
            verify: false,
            social_user: {},
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.props.navigation.dispatch(NavigationService.resetAction('AddAvatar'))
        }
        if (nextProps.user.status && nextProps.user.status != this.props.user.status) {
            this.showToast(nextProps.user.message, toastType.danger);
        }
        if (nextProps.styler.error && nextProps.styler.error != this.props.styler.error) {
            this.showToast(`Error: ${nextProps.user.error}`, toastType.danger);
        }
    }
    initUser(token) {
        fetch('https://graph.facebook.com/v2.10/me?fields=id,name,first_name,last_name,email,gender,link,locale,timezone,updated_time,verified&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ social_user: json });
                setTimeout(() => {
                    console.log(json.email)
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
    addStyler = () => {
        this.setState({ isProcessing: true });
        let email = this.email,
            name = this.name,
            phone = this.phone,
            gender = this.gender,
            // address = this.address,
            description = this.description,
            password = this.password,
            confirmPassword = this.confirmPassword,
            startingPrice = this.startingPrice;

        if (!name || !email || !phone || !password || !startingPrice || !gender) {
            this.showToast('Invalid login credentials!', toastType.danger);
        } else if (password !== confirmPassword) {
            this.showToast('Password and Confirm Password does not match', toastType.danger);
        } else {
            return this.props.addStyler({
                name: name,
                email: email,
                phoneNumber: phone,
                gender,
                // address: address,
                description: description,
                password: password,
                startingPrice: startingPrice,
            })
        }
    }

    showToast = (text, type) => {
        ShowToast(text, type);
        this.setState({ isProcessing: false });
    }

    handleClick = () => {
        this.props.navigation.navigate('StylerService')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Create {"\n"}Your Account</Text>
                    </View>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.name = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Business name' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.email = e}
                            autoCapitalize={"none"}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Email' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
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
                    {/* <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.address = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Address' />
                    </Item> */}
                    <Form style={{ marginTop: 10, }} regular>
                        <Textarea
                            onChangeText={e => this.description = e}
                            rowSpan={5}
                            style={{ fontFamily: fonts.medium, fontSize: 13, borderRadius: 5, }}
                            bordered
                            placeholder="Please tell us about your business (Optional)" />
                    </Form>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.startingPrice = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Starting Price' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.password = e}
                            secureTextEntry={true}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Password' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.confirmPassword = e}
                            secureTextEntry={true}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Re-Password' />
                    </Item>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            // onPress={this.addStyler}
                            onPress={this.addStyler}
                            btnTxt={"SIGN UP"}
                            size={"lg"}
                            loading={this.state.isProcessing ? true : false}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{ color: colors.black, fontFamily: fonts.default }}
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

                    {/* <LoginButton
                        style={{ height: 48, width: '100%', backgroundColor: colors.facebook }}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    console.log(result)
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            console.log(data.accessToken.toString())
                                            this.initUser(data.accessToken.toString())
                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")} /> */}
                    {/* <View>
                        <Button
                            // onPress={this.handleClick.bind(this)}
                            // onPress={() => alert('Sorry, we are currently fixing this module!')}
                            size={"lg"}
                            Icon={<FacebookIcon />}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                        />
                    </View> */}
                    {/* <View style={{ marginTop: 20 }}>
                        <Button
                            // onPress={this.handleClick.bind(this)}
                            // onPress={() => alert('Sorry, we are currently fixing this module!')}
                            size={"lg"}
                            Icon={<GoogleIcon />}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.default }}
                        />
                    </View> */}

                    <View style={{ marginVertical: 20, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Already a member? Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 30,
        marginTop: 50,
        justifyContent: "center",
    }
})

const mapStateToProps = state => ({
    styler: state.styler,
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);