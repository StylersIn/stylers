import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { Container, Header, Body, Image, Thumbnail, Content } from "native-base";
import AuthScreen from '../screens/Auth';

const AppNavigator = createStackNavigator({
    Auth: AuthScreen,
},
    {
        initialRouteName: "Auth",
        headerMode: "none"
    }
);

// const drawerContentComponents = (props) => (
//     <Container style={{ backgroundColor: colors.default }}>
//         <Header style={{ height: 200, backgroundColor: colors.default }}>
//             <Body>
//                 <Thumbnail source={require('../imgs/avatar.png')} />
//             </Body>
//         </Header>
//         <Content>
//             <DrawerNavigatorItems labelStyle={{ color: "white" }} {...props} />
//         </Content>
//     </Container>
// );

// const MyDrawerNavigator = createDrawerNavigator({
//     Home: {
//         screen: AppNavigator,
//     },
//     Profile: {
//         screen: ProfileScreen
//     },
//     Payment: {
//         screen: CardScreen
//     },
// }, {
//     contentComponent: drawerContentComponents,
// });

export default createAppContainer(AppNavigator);