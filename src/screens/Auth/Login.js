import React from 'react';
import {
    View,
    StyleSheet,
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
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
import ShowToast from '../../components/ShowToast';
import { resetAction } from '../../navigation';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.setState({ isProcessing: false });
            this.props.navigation.dispatch(resetAction('Home'));
        }
        if (nextProps.user.status == false && nextProps.user.status != this.props.user.status) {
            this.setState({ isProcessing: false });
            this.showToast(`Error: ${nextProps.user.message}`, toastType.danger);
        }
        if (nextProps.user.error && nextProps.user.error != this.props.user.error) {
            this.setState({ isProcessing: false });
            this.showToast(`Error: ${nextProps.user.error}`, toastType.danger);
        }
    }
    doLogin = () => {
        this.setState({ isProcessing: true });
        let email = this.email;
        let password = this.password;
        if (!email || !password) {
            this.showToast('Invalid login credentials!', toastType.danger);
        } else {
            return this.props.doLogin({
                email: email,
                password: password,
            })
        }
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
            <View style={styles.container}>
                <View style={{ paddingVertical: 20, }}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Log Into {"\n"}Your Account</Text>
                </View>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                    <Input
                        onChangeText={e => this.email = e}
                        autoCapitalize={'none'}
                        style={{ fontFamily: fonts.medium, fontSize: 13 }}
                        placeholder='Email' />
                </Item>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
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
                        btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                    />
                </View>

                <View style={{ marginVertical: 20, }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text>Dont't have an account? Sign up</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);