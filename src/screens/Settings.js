import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { Container, Content, Button, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Text from '../config/AppText';
import { fonts } from '../constants/DefaultProps';

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

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Header
                            close={true}
                            title={'Settings'}
                        />

                        <Text style={{ fontFamily: fonts.bold, marginTop: 30, fontSize: 16, }}>Account</Text>
                        <View style={{ marginTop: 20, }}>
                            <View>
                                <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text>Edit Profile</Text>
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
                                    <Text>Change password</Text>
                                    <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                </View>
                                <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                            </View>
                        </View>


                        <Text style={{ fontFamily: fonts.bold, marginTop: 30, fontSize: 16, }}>Payment and pricing</Text>
                        <View style={{ marginTop: 20, }}>
                            <View>
                                <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text>Accepted payment methods</Text>
                                    <Icon style={{ fontSize: 20, }} name='ios-arrow-forward' />
                                </View>
                                <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // justifyContent: "center",
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);