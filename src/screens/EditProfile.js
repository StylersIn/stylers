import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Container, Content, ListItem, Icon, Left, Body, Right, Switch, Thumbnail, Card, Input, Item, Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Text from '../config/AppText';
import { fonts, colors } from '../constants/DefaultProps';
import Button from '../components/Button';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
            userData: undefined,
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.user.current.publicId);
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.user.userData && prevProps.user.userData != this.props.user.userData) {
            this.setState({ userData: prevProps.user.userData });
        }
    }

    updateProfile = () => {
        this.props.updateProfile({
            image: this.state.avatar,
        })
    }

    render() {
        const { current, } = this.props.user;
        const { userData } = this.state;
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
                                source={userData && userData.imageUrl ? { uri: userData.imageUrl } : require('../../assets/imgs/user.png')}
                            />
                            <Text style={{ fontFamily: fonts.bold, marginTop: 10, }}>{userData && userData.name}</Text>
                        </View>
                        {userData ? <Card style={styles.card_shadow}>
                            <View style={{ marginVertical: 10, marginHorizontal: 20, }}>
                                <View>
                                    <View style={{ paddingVertical: 5, }}>
                                        <Item style={{ marginTop: 10, borderRadius: 5, }} inlineLabel>
                                            <Input
                                                onChangeText={e => this.name = e}
                                                autoCapitalize={'none'}
                                                defaultValue={userData && userData.name}
                                                style={{ fontFamily: fonts.medium, fontSize: 14, height: 40, color: '#3E4958', }}
                                                placeholder='Name' />
                                        </Item>
                                    </View>
                                    {/* <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View> */}
                                </View>
                                <View>
                                    <View style={{ paddingVertical: 5, }}>
                                        <Item style={{ marginTop: 10, borderRadius: 5, }} inlineLabel>
                                            <Input
                                                onChangeText={e => this.email = e}
                                                autoCapitalize={'none'}
                                                defaultValue={userData && userData.email}
                                                style={{ fontFamily: fonts.medium, fontSize: 14, height: 40, color: '#3E4958', }}
                                                placeholder='Email' />
                                        </Item>
                                    </View>
                                    {/* <View style={{ height: 0.5, backgroundColor: '#ccc', opacity: 0.5, }}></View> */}
                                </View>
                                <View>
                                    <View style={{ paddingVertical: 5, marginBottom: 10, }}>
                                        <Item style={{ marginTop: 10, borderRadius: 5, }} inlineLabel>
                                            <Input
                                                onChangeText={e => this.email = e}
                                                autoCapitalize={'none'}
                                                defaultValue={userData && userData.phoneNumber}
                                                style={{ fontFamily: fonts.medium, fontSize: 14, height: 40, color: '#3E4958' }}
                                                placeholder='Phone' />
                                        </Item>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Button
                                        onPress={this.updateProfile}
                                        size={"lg"}
                                        btnTxt={"Save"}
                                        styles={{ backgroundColor: colors.google }}
                                        btnTxtStyles={{ color: "white", fontFamily: fonts.medium }}
                                    />
                                </View>
                            </View>
                        </Card> : <View style={{ flex: 1, }}>
                                <Spinner color={colors.pink} style={{ fontSize: 80, }} />
                            </View>}
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