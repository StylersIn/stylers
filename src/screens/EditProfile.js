import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Container, Content, Button, ListItem, Icon, Left, Body, Right, Switch, Thumbnail, Card } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Text from '../config/AppText';
import { fonts } from '../constants/DefaultProps';

class EditProfile extends React.Component {
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
                            title={'Edit Profile'}
                        />
                        <View style={{ alignItems: 'center', padding: 30, }}>
                            <Thumbnail
                                source={require('../../assets/imgs/user.png')}
                            />
                            <Text style={{ fontFamily: fonts.bold, marginTop: 10, }}>John</Text>
                        </View>
                        <Card style={styles.card_shadow}>
                            <View style={{ marginVertical: 10, marginHorizontal: 20, }}>
                                <View>
                                    <View style={{ paddingVertical: 15, }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('EditProfile')}
                                        >
                                            <Text>Edit Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </View>
                                <View>
                                    <View style={{ paddingVertical: 15, }}>
                                        <Text>Manage services</Text>
                                    </View>
                                    <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View>
                                </View>
                                <View>
                                    <View style={{ paddingVertical: 20, }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('ChangePassword')}
                                        >
                                            <Text>Change password</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Card>
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
    card_shadow: {
        // marginTop: 50,
        width: '100%',
        // height: 200,
        borderWidth: 1,
        borderRadius: 30 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    map_btn_icon: {
        borderRadius: 65 / 2,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);