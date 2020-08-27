import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity,
    ScrollView,
    PermissionsAndroid,
    Permission,
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
    Spinner,
    List,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FacebookIcon, GoogleIcon } from './AuthAssets';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import ShowToast from '../../components/ShowToast';
import { SafeAreaView } from 'react-navigation';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import NavigationService from '../../navigation/NavigationService';
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

    componentDidMount() {
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.current && nextProps.user.current != this.props.user.current) {
            this.props.navigation.dispatch(NavigationService.resetAction('AddAvatar'))
        }
        if (nextProps.user.status && nextProps.user.status != this.props.user.status) {
            this.showToast(nextProps.user.message, toastType.danger);
        }
        if (nextProps.styler.created == false && nextProps.styler.created != this.props.styler.created) {
            // alert(nextProps.styler.message);
            this.setState({ isProcessing: false, });
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
        const { callingCode, countryCode, } = this.state;
        this.setState({ isProcessing: true });
        let email = this.email,
            name = this.name,
            phone = this.phone,
            gender = this.gender,
            // address = this.address,
            description = this.description,
            password = this.password,
            confirmPassword = this.confirmPassword;
            // startingPrice = this.startingPrice;

        if (!name || !email || !phone || !password || !gender) {
            this.showToast('Invalid login credentials!', toastType.danger);
        } else if (password !== confirmPassword) {
            this.showToast('Password and Confirm Password does not match', toastType.danger);
        } else {
            const { selectedAddress, } = this.props;
            if (!selectedAddress) {
                this.showToast('Please select a valid city', toastType.danger);
                return;
            }
            return this.props.addStyler({
                name: name,
                email: email,
                phoneNumber: phone,
                gender,
                description: description,
                password: password,
                // startingPrice: startingPrice,
                callingCode,
                countryCode,
                location:{
                    name: selectedAddress.name,
                    coordinates: [selectedAddress.location.longitude, selectedAddress.location.latitude],
                },
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

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }
    openModal = () => {
        this.setState({ visible: true });
    }

    render() {
        const onSelect = value => {
            // this.props.countryCode(value.cca2);
            this.setState({ cca2: value.cca2, callingCode: value.callingCode, countryCode: value.cca2, visible: true, });
        }
        const onClose = _ => this.setState({ visible: false, });
        const handleSelectedAddress = (placeID) => {
            getSelectedAddress(placeID)
        }
        const handleSearch = (val) => {
            getInputData({
                value: val
            });
            getAddressPredictions();
        }
        _keyExtractor = (item, index) => item.name;
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

        const {
            getAddressPredictions,
            getInputData,
            inputData,
            searching,
            predictions,
            error,
            getSelectedAddress,
            selectedAddress,
            clearInputData
        } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={styles.container}>
                    {/* <View style={{ flex: 1, }}>
                        <List
                            style={{ backgroundColor: "red" }}
                            dataArray={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,]}
                            keyExtractor={(item, index) => index.toString()}
                            renderRow={(item) =>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => alert("111")}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 2, padding: 20, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Icon style={{ fontSize: 20, color: colors.pink }} name='ios-pin' />
                                        <View style={{ paddingLeft: 30, paddingRight: 10 }}>
                                            <Text style={styles.primaryText}>{item}</Text>
                                            <Text style={styles.secondaryText}>{item}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View> */}
                    <View style={{ paddingVertical: 20, }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Create {"\n"}Your Account</Text>
                    </View>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.name = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            autoCorrect={false}
                            placeholder='Fullname' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.email = e}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Email' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, height: 50, }} regular>
                        <TouchableOpacity
                            style={styles.inputAddon}
                            onPress={this.openModal}
                        >
                            <CountryPicker
                                {...{
                                    countryCode,
                                    withFilter,
                                    withFlag,
                                    // withCountryNameButton,
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
                            onChangeText={e => this.phone = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Phone Number' />
                    </Item>
                    <Item style={{ marginTop: 10, borderRadius: 5, height: 50, }} regular>
                        <Input
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            onChangeText={handleSearch.bind(this)}
                            placeholder={'Enter city name'}
                            autoCorrect={false}
                            placeholderTextColor='#9BABB4'
                            autoFocus={false}
                            editable={selectedAddress ? false : true}
                            value={!inputData && selectedAddress ? selectedAddress.name : inputData}
                        />
                        {searching && <View style={{ marginRight: 10, }}>
                            <Spinner style={{ fontSize: 10, }} size='small' />
                        </View>}
                        {selectedAddress && <TouchableOpacity
                            onPress={() => clearInputData()}
                            activeOpacity={0.7}
                            style={{ marginRight: 10, zIndex: 1000, elevation: 8, }}>
                            <Icon style={{ fontSize: 30 }} name="ios-close" />
                        </TouchableOpacity>}
                    </Item>
                    {predictions && <View style={{ width: '100%',  backgroundColor: "#FCFCFC", borderRadius: 5, zIndex: 1000, elevation: 2, }}>
                        {error && !searching && <View style={{ width: "90%", marginTop: 30, alignItems: "center", padding: 20, flexDirection: "row" }}>
                            <Icon type='Ionicons' name='ios-information-circle-outline' />
                            <Text style={{ paddingLeft: 20 }}>{error}</Text>
                        </View>}

                        <View style={styles.searchResultsWrapper}>
                            <List
                                dataArray={predictions}
                                keyExtractor={(item, index) => index.toString()}
                                renderRow={(item) =>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => handleSelectedAddress(item.placeID)}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 2, padding: 20, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Icon style={{ fontSize: 20, color: colors.pink }} name='ios-pin' />
                                            <View style={{ paddingLeft: 30, paddingRight: 10 }}>
                                                <Text style={styles.primaryText}>{item.primaryText}</Text>
                                                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                    </View>}
                    
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
                    <Form style={{ marginTop: 10, }} regular>
                        <Textarea
                            onChangeText={e => this.description = e}
                            rowSpan={5}
                            style={{ fontFamily: fonts.medium, fontSize: 13, borderRadius: 5, }}
                            bordered
                            placeholder="Please tell us about the service you render (Optional)" />
                    </Form>
                    {/* <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                        <Input
                            onChangeText={e => this.startingPrice = e}
                            style={{ fontFamily: fonts.medium, fontSize: 13 }}
                            placeholder='Starting Price' />
                    </Item> */}
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
        paddingBottom: 80,
        marginTop: 50,
        justifyContent: "center",
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
    searchResultsWrapper:{
        // elevation: 8,
        // zIndex: 1000,
        // position:"relative",
    }
})

const mapStateToProps = state => ({
    styler: state.styler,
    user: state.user,
    location: state.map.location,
    inputData: state.map.inputData,
    searching: state.map.searching,
    predictions: state.map.predictions,
    selectedAddress: state.map.selectedAddress,
    error: state.map.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);