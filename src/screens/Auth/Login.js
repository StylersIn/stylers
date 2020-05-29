import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
    Spinner,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType, roles } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
import ShowToast from '../../components/ShowToast';
import NavigationService from '../../navigation/NavigationService';
import { LoginButton, AccessToken, LoginManager, } from 'react-native-fbsdk';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

class Login extends React.Component {
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
            // this.setState({ isProcessing: false });
            if (nextProps.user.current.role === 'styler') {
                this.props.checkStylerRegStatus();
            } else {
                this.props.navigation.dispatch(NavigationService.resetAction('Home'))
            }
        }
        if (nextProps.user.authenticated === false && nextProps.user.authenticated !== this.props.user.authenticated) {
            this.setState({ isProcessing: false });
            alert(nextProps.user.message);
        }
        if (nextProps.user.status == false && nextProps.user.status != this.props.user.status) {
            this.setState({ isProcessing: false, });
            if (nextProps.role == roles.styler) {
                alert("Sorry, this account has not been verified. If this error persists 48hours after regsitration, kindly contact the administrator.");
                return;
            }
            return this.props.navigation.navigate('Verify', {
                email: this.email || this.state.social_user.id,
                key: this.email ? 'email' : 'socialId'
            })
        }
        if (nextProps.styler.status != this.props.styler.status) {
            if (typeof nextProps.styler.status !== 'undefined') {
                if (nextProps.styler.status === true) {
                    this.props.navigation.dispatch(NavigationService.resetAction('Requests'))
                } else {
                    this.props.navigation.dispatch(NavigationService.resetAction('StylerService'))
                }
            }
        }

        // if (nextProps.user.error && nextProps.user.error !== this.props.user.error) {
        if (nextProps.user.error) {
            this.showErr(nextProps.user.error);
        }
        if (nextProps.socialAccount == false && nextProps.socialAccount != this.props.socialAccount) {
            this.props.navigation.navigate('FbRegister', { user: this.state.social_user });
            // if (nextProps.social_login_status === true) {
            //     this.props.navigation.navigate('FbRegister', { user: this.state.social_user });
            // }
            // if (nextProps.social_login_status === 0) {
            //     this.props.navigation.dispatch(NavigationService.resetAction('Home'))
            // }
            // if (nextProps.social_login_status === 1) {
            //     this.setState({ verify: false, })
            //     this.showErr(`Email address tied to this account already exists`);
            //     // this.showToast(`Error: Email address tied to this account already exists`, toastType.danger);
            // }
        }
    }
    doLogin = () => {
        this.setState({ isProcessing: true, mainErr: undefined, });
        let email = this.email;
        let password = this.password;
        if (!email || !password) {
            this.setState({ validationErr: true, isProcessing: false, })
        } else {
            return this.props.doLogin({
                email: email,
                password: password,
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
                // Some user object has been set up somewhere, build that user here
                // user.name = json.name
                // user.id = json.id
                // user.user_friends = json.friends
                // user.email = json.email
                // user.username = json.name
                // user.loading = false
                // user.loggedIn = true
                // user.avatar = setAvatar(json.id)
                this.setState({ social_user: json });
                setTimeout(() => {
                    console.log(json.email)
                    this.props.verifySocialMediaLogin({ socialId: json.id });
                }, 0);
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    fbLogin = () => {
        this.setState({ verify: true })
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
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

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.state.verify ? <Spinner size="large" /> : <>
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Log Into {"\n"}Your Account</Text>
                    </View>
                    {this.state.mainErr && <Text style={{ color: colors.danger, fontFamily: fonts.bold }}>{this.state.mainErr}</Text>}
                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.email === undefined || this.email === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.email = e}
                            autoCapitalize={'none'}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Email' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.password === undefined || this.password === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.password = e}
                            secureTextEntry={true}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Password' />
                    </Item>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={this.doLogin}
                            btnTxt={"LOG IN"}
                            size={"lg"}
                            loading={this.state.isProcessing ? true : false}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{ color: colors.black, fontFamily: fonts.medium }}
                        />
                    </View>

                    <View style={{ alignItems: "center", paddingVertical: 10 }}>
                        <Text style={{ fontFamily: fonts.bold }}>OR</Text>
                    </View>

                    <View>
                        <Button
                            onPress={this.fbLogin.bind(this)}
                            size={"lg"}
                            Icon={<FacebookIcon />}
                            btnTxt={"(Client)"}
                            styles={{ backgroundColor: colors.facebook }}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                        />
                    </View>
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
                                        
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")} /> */}
                    {/* <View style={{ marginTop: 20 }}>
                        <Button
                            // onPress={this.fbLogin.bind(this)}
                            onPress={() => alert('Sorry, we are currently fixing this module!')}
                            size={"lg"}
                            Icon={<GoogleIcon />}
                            styles={{ backgroundColor: colors.google }}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                        />
                    </View> */}
                    {/* <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this._signIn}
                        disabled={this.state.isSigninInProgress} /> */}

                    <View style={{ marginTop: 20, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text>Dont't have an account? Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10, }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={{ color: colors.danger }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </>}
            </ScrollView>
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
    role: state.user.role,
    styler: state.styler,
    verified: state.user.verified,
    socialAccount: state.login.socialAccount,
    error: state.login.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);