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

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Header
                            close={true}
                            title={'Change Password'}
                        />
                        <View style={{ marginTop: 20, }}>
                            <Item style={{ marginTop: 10, borderRadius: 5, }}
                                error={(this.email === undefined || this.email === '') && this.state.validationErr}
                                regular>
                                <Input
                                    onChangeText={e => this.email = e}
                                    autoCapitalize={'none'}
                                    style={{ fontFamily: fonts.medium, fontSize: 12, height: 40, }}
                                    placeholder='Old password' />
                            </Item>
                            <Item style={{ marginTop: 10, borderRadius: 5, }}
                                error={(this.email === undefined || this.email === '') && this.state.validationErr}
                                regular>
                                <Input
                                    onChangeText={e => this.email = e}
                                    autoCapitalize={'none'}
                                    style={{ fontFamily: fonts.medium, fontSize: 12, height: 40, }}
                                    placeholder='New password' />
                            </Item>
                            <Item style={{ marginTop: 10, borderRadius: 5, }}
                                error={(this.email === undefined || this.email === '') && this.state.validationErr}
                                regular>
                                <Input
                                    onChangeText={e => this.email = e}
                                    autoCapitalize={'none'}
                                    style={{ fontFamily: fonts.medium, fontSize: 12, height: 40, }}
                                    placeholder='Confirm password' />
                            </Item>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                // onPress={this.doLogin}
                                btnTxt={"Change Password"}
                                size={"lg"}
                                loading={this.state.isProcessing ? true : false}
                                styles={{ height: 40, }}
                                btnTxtStyles={{ color: colors.white, fontFamily: fonts.medium, }}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);