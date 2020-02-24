import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { Container, Content, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Text from '../config/AppText';
import { fonts, colors, } from '../constants/DefaultProps';
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
        try {
            await this.props.logout();
            NavigationService.navigate('Auth');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
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
                                <View>
                                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('EditProfile')}
                                        >
                                            <Text>Edit Profile</Text>
                                        </TouchableOpacity>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </View>
                                <View>
                                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text>Manage services</Text>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </View>
                                <View>
                                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('ChangePassword')}
                                        >
                                            <Text>Change password</Text>
                                        </TouchableOpacity>
                                        <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </View>
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
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);