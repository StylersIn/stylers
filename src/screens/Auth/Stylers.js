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
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.styler.styler && nextProps.styler.styler != this.props.styler.styler) {
            this.props.navigation.dispatch(NavigationService.resetAction('StylersCompleteReg'))
        }
        if (nextProps.styler.error && nextProps.styler.error != this.props.styler.error) {
            this.showToast(`Error: ${nextProps.user.error}`, toastType.danger);
        }
    }
    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
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
                console.log(json)
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }
    addStyler = () => {
        this.setState({ isProcessing: true });
        let email = this.email,
            name = this.name,
            phone = this.phone,
            address = this.address,
            description = this.description,
            password = this.password,
            confirmPassword = this.confirmPassword,
            startingPrice = this.startingPrice;

        if (!name || !email || !phone || !address || !password || !startingPrice) {
            this.showToast('Invalid login credentials!', toastType.danger);
        } else if (password !== confirmPassword) {
            this.showToast('Password and Confirm Password does not match', toastType.danger);
        } else {
            return this.props.addStyler({
                name: name,
                email: email,
                phoneNumber: phone,
                address: address,
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
        this.props.navigation.navigate('StylersCompleteReg')
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
                            placeholder='Your name' />
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
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.address = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Address' />
                    </Item>
                    <Form style={{ marginTop: 10, }} regular>
                        <Textarea
                            onChangeText={e => this.description = e}
                            rowSpan={5}
                            style={{ fontFamily: fonts.medium, fontSize: 13, borderRadius: 5, }}
                            bordered
                            placeholder="Description" />
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

                    <View style={{ alignItems: "center", paddingVertical: 10 }}>
                        <Text style={{ fontFamily: fonts.bold }}>OR</Text>
                    </View>

                    <LoginButton
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
                        onLogoutFinished={() => console.log("logout.")} />
                    {/* <View>
                        <Button
                            // onPress={this.handleClick.bind(this)}
                            // onPress={() => alert('Sorry, we are currently fixing this module!')}
                            size={"lg"}
                            Icon={<FacebookIcon />}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                        />
                    </View> */}
                    <View style={{ marginTop: 20 }}>
                        <Button
                            // onPress={this.handleClick.bind(this)}
                            // onPress={() => alert('Sorry, we are currently fixing this module!')}
                            size={"lg"}
                            Icon={<GoogleIcon />}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.default }}
                        />
                    </View>

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
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);