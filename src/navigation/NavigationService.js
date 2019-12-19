import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName,
                params,
            })],
        })
    );
}

function toggleDrawer(routeName, params) {
    _navigator.dispatch(
        DrawerActions.toggleDrawer()
    );
}

function goBack() {
    _navigator.dispatch(
        NavigationActions.back()
    );
}

const resetAction = (routeName) => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
});
// StackActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName })],
// });

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    resetAction,
    toggleDrawer,
    goBack,
};