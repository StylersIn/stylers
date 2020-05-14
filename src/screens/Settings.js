import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Container, Content, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import Text from '../config/AppText';
import { fonts, colors, roles, } from '../constants/DefaultProps';
import { SettingsIcon, AppointmentIcon } from '../navigation/assets';
import NavigationService from '../navigation/NavigationService';
import Button from '../components/Button';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    signOut = async () => {
        const { user: { current: { publicId }, oneSignalId }, } = this.props;
        try {
            await this.props.socket.emit('removeOneSignalID', { publicId, oneSignalUserId: oneSignalId });
            await this.props.logout(oneSignalId);
            NavigationService.navigate('Auth');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { user: { current: { role } } } = this.props;
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Header
                            close={true}
                            title={'Settings'}
                        />

                        <View style={{ paddingHorizontal: 20, }}>
                            <Text style={{ fontFamily: fonts.bold, marginTop: 30, fontSize: 16, }}>Account</Text>
                            <View style={{ marginTop: 20, }}>
                                 <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => this.props.navigation.navigate('EditProfile')}
                                >
                                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text>Edit Profile</Text>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </TouchableOpacity>
                                {role == roles.styler && <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('MyServices')}
                                    activeOpacity={0.7}
                                >
                                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text>Manage services</Text>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </TouchableOpacity>}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => this.props.navigation.navigate('ChangePassword')}
                                >
                                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text>Change password</Text>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* <Text style={{ fontFamily: fonts.bold, marginTop: 30, fontSize: 16, }}>Payment and pricing</Text>
                        <View style={{ marginTop: 20, }}>
                            <View>
                                <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text>Accepted payment methods</Text>
                                    <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                </View>
                                <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                            </View>
                        </View> */}
                    </ScrollView>
                    <View style={{ padding: 20, marginBottom: 10 }}>
                        <Button
                            onPress={this.signOut}
                            size={"lg"}
                            btnTxt={"Sign out"}
                            styles={{ backgroundColor: colors.danger }}
                            btnTxtStyles={{ color: "white", fontFamily: fonts.bold }}
                        />
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        // justifyContent: "center",
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);