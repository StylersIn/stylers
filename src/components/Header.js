import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../actions';
import { connect } from 'react-redux';
import { HamburgerIcon } from '../navigation/assets';
import { View, Item, Icon, Input, Card, CardItem, Body, Left, Radio, CheckBox, Switch } from 'native-base';
import { ListIcon } from './assets';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import { fonts, colors } from '../constants/DefaultProps';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import NavigationService from '../navigation/NavigationService';
import { DrawerActions } from 'react-navigation-drawer';

const propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.bool,
    onChange: PropTypes.func,
    showList: PropTypes.bool,
    selectListItem: PropTypes.func,
    selected: PropTypes.number,
    hamburger: PropTypes.bool,
    search: PropTypes.bool,
    action: PropTypes.object,
    visible: PropTypes.bool,
}

const { width, height } = Dimensions.get('screen');
const options = ['Rating', 'Location', 'Price'];
class Header extends React.Component {
    state = {
        searchInput: undefined,
    }
    signOut = async () => {
        try {
            await this.props.logout();
            NavigationService.navigate('Auth');
        } catch (error) {
            console.log(error);
        }
    }
    handleSearch = (e) => {
        if (e) {
            this.setState({ searchInput: e, })
            this.props.filterService(e);
        } else {
            setTimeout(() => {
                this.props.listService();
            }, 500);
        }
    }
    render() {
        const {
            hamburger,
            close,
            statusBtn,
            isActive,
            setStatus,
            title,
            action,
            list,
            search,
            visible,
        } = this.props;
        return (
            <View style={{ marginTop: Platform.OS === 'ios' ? 30 : 40 }}>
                {hamburger ? <TouchableOpacity
                    onPress={() => NavigationService.toggleDrawer()}
                    activeOpacity={0.7}
                    style={{ paddingHorizontal: 20, width: '18%', paddingBottom: 20, }}
                >
                    <HamburgerIcon />
                </TouchableOpacity> : null}
                {/* 15 */}
                <View style={{ marginTop: 0, paddingBottom: 20, paddingHorizontal: 20, }}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        {close && <TouchableOpacity
                            onPress={() => NavigationService.goBack()}
                            activeOpacity={0.7}>
                            <Icon
                                style={{ fontSize: 60, color: visible ? "transparent" : "#000000", position: 'relative', bottom: 16, }}
                                type="Ionicons"
                                name="ios-close" />
                        </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <View>
                            <Text style={{ fontFamily: fonts.bold, fontSize: 24, }}>{title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            {action}
                            {list ? <TouchableOpacity
                                onPress={() => this.props.onChange()}
                                activeOpacity={0.5}>
                                <ListIcon />
                            </TouchableOpacity> : null}
                            {statusBtn && isActive != undefined && <Switch
                                ios_backgroundColor={colors.danger}
                                value={isActive}
                                onValueChange={setStatus}
                            />}
                            {statusBtn && isActive == undefined && <Text>Loading...</Text>}
                        </View>
                    </View>
                    {search ? <View style={{ zIndex: -1 }}>
                        <Item style={[{ marginTop: 20, borderRadius: 5, backgroundColor: colors.white, }, styles.cardStyle]} regular>
                            <Icon type="Ionicons" name="ios-search" />
                            <Input
                                onChangeText={(e) => this.handleSearch(e)}
                                style={{
                                    fontFamily: fonts.medium,
                                    fontSize: 13,
                                    height: 35,
                                }}
                                placeholder='' />
                            {this.state.searchInput && <View style={{ marginRight: 10 }}>
                                <Icon type="Ionicons" name="ios-close" />
                            </View>}
                        </Item>
                    </View> : null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
    }
})

Header.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);