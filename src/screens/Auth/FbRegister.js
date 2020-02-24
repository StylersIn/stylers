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

class FbRegister extends React.Component {
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
        // if (nextProps.user.authenticated && nextProps.user.current && nextProps.user.current != this.props.user.current) {
        //     this.setState({ isProcessing: false });
        //     this.props.navigation.dispatch(NavigationService.resetAction('Home'));
        // }
        if (nextProps.register.created && nextProps.register.created != this.props.register.created) {
            const { navigation } = this.props;
            const user = navigation.getParam('user', '');
            this.setState({ isProcessing: false });
            this.props.navigation.navigate('Verify', { email: user.email })
        }
        if (nextProps.user.error && nextProps.user.error != this.props.user.error) {
            this.showToast(`Error: ${nextProps.user.error}`, toastType.danger);
        }
    }

    doRegister = () => {
        const { navigation } = this.props;
        const user = navigation.getParam('user', '');
        this.setState({ isProcessing: true });
        let email = user.email;
        let name = user.name;
        let phoneNumber = this.phone;
        let gender = this.gender;
        let password = 'facebook';
        return this.props.doRegister({
            email,
            name,
            phoneNumber,
            gender,
            password,
            type: 'social-login',
        })
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
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Complete {"\n"}User Registration</Text>
                    </View>
                    {this.state.validationErr && <Text style={{ color: colors.danger }}>One or more fields are missing</Text>}
                    {this.state.pwMatchErr && <Text style={{ color: colors.danger }}>Password and confirm password does not match</Text>}
                    <Item style={{ marginTop: 10, borderRadius: 5, }}
                        error={(this.phone === undefined || this.phone === '') && this.state.validationErr}
                        regular>
                        <Input
                            onChangeText={e => this.phone = e}
                            keyboardType={'numeric'}
                            style={{
                                fontFamily: fonts.medium
                                , fontSize: 13
                            }}
                            placeholder='Phone' />
                    </Item>
                    <View style={{ marginVertical: 8 }}>
                        <RadioGroup
                            size={18}
                            thickness={2}
                            color='#606060'
                            style={{ flexDirection: 'row' }}
                            onSelect={(index, value) => this.gender = value}
                        >
                            <RadioButton
                                value={'M'} >
                                <Text style={{ fontSize: 12, fontFamily: fonts.medium, }}>{'Male'}</Text>
                            </RadioButton>
                            <RadioButton
                                value={'F'} >
                                <Text style={{ fontSize: 12, fontFamily: fonts.medium }}>{'Female'}</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>

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
        justifyContent: "center",
    }
})

const mapStateToProps = state => ({
    user: state.user,
    register: state.register,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FbRegister);