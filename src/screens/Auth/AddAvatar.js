import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Form, Item, Label, Input, Thumbnail } from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors, toastType } from '../../constants/DefaultProps';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import NavigationService from '../../navigation/NavigationService';
import ImagePicker from 'react-native-image-crop-picker';
import user_img from '../../../assets/imgs/user.png';

class AddAvatar extends React.Component {
    state = {
        token: '',
        isProcessing: false,
        mobile: undefined,
        avatarPrev: undefined,
        avatar: {
            uri: undefined,
            type: undefined,
            name: undefined,
        },
        image: undefined,
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.avatar && nextProps.avatar != this.props.avatar) {
            this.setState({ isProcessing: false });
            this.props.navigation.dispatch(NavigationService.resetAction('StylerService'));
        }
        if (nextProps.error && nextProps.error != this.props.error) {
            this.setState({ isProcessing: false });
            alert(nextProps.error);
        }
    }

    openGallery = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            // cropping: true,
            includeBase64: true,
        })
        .then(image => {
            let pathParts = image.path.split('/');
            this.setState({
                // image: image.data,
                // avatarPrev: image.path,
                avatar: {
                    uri: image.path,
                    base64: image.data,
                    mime: image.mime
                }
                // avatar: {
                //     uri: image.path,
                //     type: image.mime,
                //     name: pathParts[pathParts.length - 1]
                // }
            });
        })
            .catch(err => console.log(err))
    }

    updateAvatar = () => {
        this.setState({ isProcessing: true, })
        this.props.updateAvatar({
            image: this.state.avatar,
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, }}>
                <View style={styles.container}>
                    <Header
                        title={'Add profile picture'}
                        hasLogout={false}
                        close={true}
                    />
                    <View style={{ flex: 1 / 1.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Thumbnail
                            style={{ width: 80, height: 80, borderRadius: 80 / 2, }}
                            source={this.state.avatar.uri ? { uri: this.state.avatar.uri } : user_img}
                        />
                        <View style={{ width: '100%', marginTop: 80, marginBottom: 30, }}>
                            {this.state.avatar.uri ? <Button
                                onPress={this.updateAvatar}
                                btnTxt={"Save"}
                                loading={this.state.isProcessing}
                                style={{ backgroundColor: colors.black, width: '40%', }}
                                btnTxtStyles={{ color: '#ffffff', fontFamily: fonts.bold, }}
                            /> : <Button
                                    onPress={this.openGallery}
                                    btnTxt={"Browse Gallery"}
                                    style={{ backgroundColor: colors.black, width: '40%', }}
                                    btnTxtStyles={{ color: '#ffffff', fontFamily: fonts.bold, }}
                                />}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => this.props.navigation.dispatch(NavigationService.resetAction('StylerService'))}
                        >
                            <Text style={{ fontFamily: fonts.bold, }}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        padding: 30,
        // alignItems: 'center',
    },
    textInputContainer: {
        alignContent: 'center',
        marginVertical: 50,
    }
})

const mapStateToProps = state => ({
    status: state.user.status,
    message: state.user.message,
    avatar: state.styler.avatar,
    error: state.styler.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddAvatar);