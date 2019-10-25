import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.register.created && nextProps.register.created != this.props.register.created) {
            this.showToast('Account has been created successfully. Kindly proceed to login.', 'success');
            setTimeout(() => {
                this.props.navigation.dispatch(resetAction('OnBoard'));
            }, 2000);
        }
    }

    doRegister = () => {
        this.setState({ isProcessing: true });
        let email = this.email;
        let username = this.username;
        let password = this.password;
        if (!username || !email || !password) {
            this.showToast('Invalid user credentials!', 'danger');
        } else {
            return this.props.doRegister({
                email: email,
                username: username,
                password: password,
                role: 'admin'
            })
        }
    }

    handleClick = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ paddingVertical: 20, }}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Create {"\n"}Your Account</Text>
                </View>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                    <Input
                        style={{ fontFamily: fonts.default, fontSize: 13 }}
                        placeholder='Your name' />
                </Item>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                    <Input
                        style={{ fontFamily: fonts.default, fontSize: 13 }}
                        placeholder='Email' />
                </Item>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                    <Input
                        style={{ fontFamily: fonts.default, fontSize: 13 }}
                        placeholder='Password' />
                </Item>

                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={this.handleClick.bind(this)}
                        btnTxt={"SIGN UP"}
                        size={"lg"}
                        styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                        btnTxtStyles={{ color: colors.black, fontFamily: fonts.default }}
                    />
                </View>

                <View style={{ alignItems: "center", paddingVertical: 10 }}>
                    <Text style={{ fontFamily: fonts.bold }}>OR</Text>
                </View>

                <View>
                    <Button
                        onPress={this.handleClick.bind(this)}
                        size={"lg"}
                        Icon={<FacebookIcon />}
                        btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={this.handleClick.bind(this)}
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    }
})

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);