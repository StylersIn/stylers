import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Container, Content, ListItem, Icon, Left, Body, Right, Switch, Card } from 'native-base';
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

class Wallet extends React.Component {
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
                <View style={styles.container}>
                    <View style={styles.nav}>
                        <View style={styles.navContent}>
                            <Text style={styles.txtWal}>Wallet Balance</Text>
                            <Text style={styles.txtBal}>NGN2,000</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        {/* <Card style={[styles.Input___shadow]}>
                            <View>
                                <Text>Transactions</Text>
                            </View>
                        </Card> */}
                        
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    nav: {
        zIndex: 1000,
        height: '35%',
        width: '100%',
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    },
    txtBal: {
        fontFamily: fonts.medium,
        fontSize: 28,
        color: colors.white,
        textAlign: "center",
    },
    txtWal: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.gray,
        textAlign: "center",
    },
    cardContainer: {
        marginHorizontal: 30,
        // marginTop: -30,
        // zIndex: 1000,
    },
    Input___shadow: {
        backgroundColor: colors.white,
        padding: 30,
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
    socket: state.socket,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);