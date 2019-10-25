import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { createAppContainer, NavigationActions, StackActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { Container, Header, Body, Image, Thumbnail, Content, Icon } from "native-base";
import AuthScreen from '../screens/Auth';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import HomeScreen from '../containers/HomeContainer';
import { HamburgerIcon } from './assets';
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

export const resetAction = (routeName) => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
});

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

const MyDrawerNavigator = createDrawerNavigator({
    Appointments: {
        screen: AppointmentScreen,
    },
    'Payment Methods': {
        screen: NoDebitScreen
    },
    'Gift Cards': {
        screen: NoDebitScreen
    },
    Help: {
        screen: ContactUsScreen
    },
    Settings: {
        screen: NoDebitScreen
    }
}, {
    contentComponent: drawerContentComponents,
});

const AppNavigator = createStackNavigator({
    InitializeApp: InitializeApp,
    Auth: AuthScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Stylers: StylersScreen,
    StylersCompleteReg: StylersCompleteRegScreen,
    Appointment: {
        screen: MyDrawerNavigator
    },
    Home: {
        screen: HomeScreen,
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
},
    {
        initialRouteName: "InitializeApp",
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