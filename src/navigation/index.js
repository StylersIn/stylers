import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { createAppContainer, NavigationActions, StackActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { Container, Content, } from "native-base";
import SplashScreen from '../screens/Splash';
import AuthScreen from '../screens/Auth';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import HomeScreen from '../containers/HomeContainer';
import ServiceScreen from '../containers/ServiceContainer';
import ServiceDetails from '../screens/Services/Details';
import PaymentScreen from '../containers/PaymentContainer';
import NoDebitScreen from '../screens/Payment/NoDebit';
import AppointmentScreen from '../containers/AppointmentContainer';
import ContactUsScreen from '../screens/ContactUs';
import StylersScreen from '../screens/Auth/Stylers';
import StylersCompleteRegScreen from '../containers/StylersContainer';
import { colors } from '../constants/DefaultProps';
import Text from '../config/AppText';
import InitializeApp from '../screens/InitializeApp';
import GiftCardScreen from '../screens/GiftCard';
import RequestScreen from '../containers/RequestContainer';
import MyServices from '../screens/Stylers/MyServices';
import FbRegisterScreen from '../screens/Auth/FbRegister';
import VerifyScreen from '../screens/Auth/Verify';
import MapViewScreen from '../containers/MapContainer';
import StylerMapScreen from '../screens/MapView/StylerMap';
import SettingsScreen from '../screens/Settings';
import EditProfileScreen from '../screens/EditProfile';
import ChangePasswordScreen from '../screens/ChangePassword';

const drawerContentComponents = (props) => (
    <Container style={{ backgroundColor: colors.black }}>
        {/* <Header style={{ height: 200, backgroundColor: colors.black }}>
            <Body>
                <Thumbnail source={require('../imgs/avatar.png')} />
            </Body>
        </Header> */}
        <Content contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
            <DrawerNavigatorItems labelStyle={{ color: "white" }} {...props} />
            <View style={{ paddingVertical: 20, alignItems: "center", }}>
                <Text style={styles.basic}>Terms and conditions</Text>
                <Text style={styles.basic}>Privacy policy</Text>
            </View>
        </Content>
    </Container>
);

const StylerDrawerNavigator = createDrawerNavigator({
    Dashboard: {
        screen: RequestScreen,
    },
    Appointments: {
        screen: AppointmentScreen,
    },
    'My Services': {
        screen: MyServices
    },
    'Wallet': {
        screen: NoDebitScreen
    },
    // Help: {
    //     screen: ContactUsScreen
    // },
    Settings: {
        screen: NoDebitScreen
    }
}, {
    contentComponent: drawerContentComponents,
});

const ClientDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    Appointments: {
        screen: AppointmentScreen,
    },
    'Payment Methods': {
        screen: NoDebitScreen
    },
    'Gift Cards': {
        screen: GiftCardScreen
    },
    Help: {
        screen: ContactUsScreen
    },
    Settings: {
        screen: SettingsScreen
    }
}, {
    contentComponent: drawerContentComponents,
    initialRouteName: 'Home'
});

const AppNavigator = createStackNavigator({
    Splash: SplashScreen,
    InitializeApp: InitializeApp,
    Auth: AuthScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    FbRegister: FbRegisterScreen,
    Stylers: StylersScreen,
    Verify: VerifyScreen,
    StylerService: StylersCompleteRegScreen,
    Appointments: AppointmentScreen,
    Requests: {
        screen: StylerDrawerNavigator
    },
    Home: {
        screen: ClientDrawerNavigator,
        // navigationOptions: ({ navigation }) => ({
        //     title: "Home",
        //     headerLeft: <HamburgerIcon />
        //     // headerLeft: <Icon type="Ionicons" name="menu" size={35} onPress={() => navigation.toggleDrawer()} />
        // })
    },
    Service: ServiceScreen,
    ServiceDetails: ServiceDetails,
    Payment: PaymentScreen,
    NoDebit: NoDebitScreen,
    MapView: MapViewScreen,
    StylerMap: StylerMapScreen,
    EditProfile: EditProfileScreen,
    ChangePassword: ChangePasswordScreen,
},
    {
        initialRouteName: "Splash",
        headerMode: "none"
    }
);

const styles = StyleSheet.create({
    basic: {
        // flexGrow: 1,
        color: "#CECECE",
    }
})

export default createAppContainer(AppNavigator);