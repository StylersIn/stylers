import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { Item, Input } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import Text from '../config/AppText';
import { fonts, colors } from '../constants/DefaultProps';
import Button from '../components/Button';
import NavigationService from '../navigation/NavigationService';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
        }
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.changedPassword && prevProps.changedPassword != this.props.changedPassword) {
            this.setState({ isProcessing: false, });
            alert('Password chaged successfully');
            NavigationService.goBack();
        }
        if (prevProps.changePasswordError && prevProps.changePasswordError != this.props.changePasswordError) {
            this.setState({ isProcessing: false, });
            alert(prevProps.changePasswordError);
        }
    }

    changePassword = () => {
        this.setState({ isProcessing: true, });
        if (!this.oldPassword || !this.newPassword) {
            alert('Please enter valid credentials');
            this.setState({ isProcessing: false, });
            return;
        }
        if (this.newPassword !== this.reNewPassword) {
            alert('New Password does not match the confirm new password');
            this.setState({ isProcessing: false, });
            return;
        }
        this.props.changePassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
        })
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Header
                            close={true}
                            title={'Change Password'}
                        />
                        <View style={{ marginTop: 20, paddingHorizontal: 20, }}>
                            <Item style={{ marginTop: 10, borderRadius: 5, }}
                                error={(this.email === undefined || this.email === '') && this.state.validationErr}
                                regular>
                                <Input
                                    onChangeText={e => this.oldPassword = e}
                                    autoCapitalize={'none'}
                                    secureTextEntry
                                    style={{ fontFamily: fonts.medium, fontSize: 12, height: 40, }}
                                    placeholder='Old password' />
                            </Item>
                            <Item style={{ marginTop: 10, borderRadius: 5, }}
                                error={(this.email === undefined || this.email === '') && this.state.validationErr}
                                regular>
                                <Input
                                    onChangeText={e => this.newPassword = e}
                                    autoCapitalize={'none'}
                                    secureTextEntry
                                    style={{ fontFamily: fonts.medium, fontSize: 12, height: 40, }}
                                    placeholder='New password' />
                            </Item>
                            <Item style={{ marginTop: 10, borderRadius: 5, }}
                                error={(this.email === undefined || this.email === '') && this.state.validationErr}
                                regular>
                                <Input
                                    onChangeText={e => this.reNewPassword = e}
                                    autoCapitalize={'none'}
                                    secureTextEntry
                                    style={{ fontFamily: fonts.medium, fontSize: 12, height: 40, }}
                                    placeholder='Confirm password' />
                            </Item>
                            <View style={{ marginTop: 20 }}>
                                <Button
                                    onPress={this.changePassword}
                                    btnTxt={"Change Password"}
                                    size={"lg"}
                                    loading={this.state.isProcessing}
                                    styles={{ height: 40, }}
                                    btnTxtStyles={{ color: colors.white, fontFamily: fonts.medium, }}
                                />
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
        // padding: 20,
        // justifyContent: "center",
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
    changedPassword: state.user.changedPassword,
    changePasswordError: state.user.changePasswordError,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);