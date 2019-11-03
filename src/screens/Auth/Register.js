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
import { resetAction } from '../../navigation';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

class Register extends React.Component {
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
        if (nextProps.user.error && nextProps.user.error != this.props.user.error) {
            this.showToast(`Error: ${nextProps.user.error}`, toastType.danger);
        }
    }

    doRegister = () => {
        this.setState({ isProcessing: true });
        let email = this.email;
        let name = this.name;
        let phoneNumber = this.phone;
        let gender = this.gender;
        let password = this.password;
        let confirmPassword = this.confirmPassword;
        if (!name || !email || !password || !phoneNumber || !gender) {
            this.showToast('Invalid user credentials!', toastType.danger);
        } else if (password !== confirmPassword) {
            this.showToast('Password does not match with confirm password', toastType.danger);
        } else {
            return this.props.doRegister({
                email,
                name,
                phoneNumber,
                gender: 'M',
                password,
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
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Create {"\n"}Your Account</Text>
                    </View>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.name = e}
                            style={{ fontFamily: fonts.medium
                                , fontSize: 13 }}
                            placeholder='Your name' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.email = e}
                            autoCapitalize={'none'}
                            style={{ fontFamily: fonts.medium
                                , fontSize: 13 }}
                            placeholder='Email' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.phone = e}
                            keyboardType={'numeric'}
                            style={{ fontFamily: fonts.medium
                                , fontSize: 13 }}
                            placeholder='Phone' />
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
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            secureTextEntry={true}
                            onChangeText={e => this.password = e}
                            style={{ fontFamily: fonts.medium
                                , fontSize: 13 }}
                            placeholder='Password' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            secureTextEntry={true}
                            onChangeText={e => this.confirmPassword = e}
                            style={{ fontFamily: fonts.medium
                                , fontSize: 13 }}
                            placeholder='Re-Password' />
                    </Item>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={this.doRegister}
                            btnTxt={"SIGN UP"}
                            size={"lg"}
                            loading={this.state.isProcessing ? true : false}
                            styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                            btnTxtStyles={{ color: colors.black, fontFamily: fonts.medium
                             }}
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
    }
})

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);