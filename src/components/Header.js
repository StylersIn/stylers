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
import { View, Item, Icon, Input, Card, CardItem, Body, Left, Radio, CheckBox } from 'native-base';
import { ListIcon } from './assets';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import { fonts } from '../constants/DefaultProps';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import NavigationService from '../navigation/NavigationService';

const propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.bool,
    onChange: PropTypes.func,
    showList: PropTypes.bool,
    selectListItem: PropTypes.func,
    selected: PropTypes.number,
    hamburger: PropTypes.bool,
    search: PropTypes.bool,
}

const { width, height } = Dimensions.get('screen');
const options = ['Rating', 'Location', 'Price'];
class Header extends React.Component {
    render() {
        return (
            <View style={{ marginTop: Platform.OS === 'ios' ? 20 : null }}>
                {this.props.hamburger ? <TouchableOpacity
                    onPress={() => NavigationService.toggleDrawer()}
                    activeOpacity={0.7}
                >
                    <HamburgerIcon />
                </TouchableOpacity> : null}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, }}>
                    <View>
                        <Text style={{ fontFamily: fonts.bold, fontSize: 24, }}>{this.props.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ marginRight: 15, marginTop: -4, }}>
                            <TouchableOpacity
                                onPress={() => this.props.logout()}
                                activeOpacity={0.5}>
                                <Icon name='ios-log-out' />
                            </TouchableOpacity>
                        </View>
                        {this.props.list ? <View>
                            <TouchableOpacity
                                onPress={() => this.props.onChange()}
                                activeOpacity={0.5}>
                                <ListIcon />
                            </TouchableOpacity></View> : null}
                    </View>
                    {this.props.showList ? <View style={{ position: "absolute", right: -20, top: 25, zIndex: 1, }}>
                        <Card style={styles.cardStyle}>
                            <RadioGroup
                                size={15}
                                thickness={2}
                                color='#606060'
                                // selectedIndex={1}
                                onSelect={(index, value) => this.props.selectListItem(index, value)}
                            >
                                {options.map((option, i) =>
                                    <RadioButton
                                        key={i}
                                        style={{ margin: 3, padding: 1, paddingHorizontal: 5, }}
                                        value={'item1'} >
                                        <Text style={{ fontSize: 12, fontFamily: fonts.bold }}>{option}</Text>
                                    </RadioButton>)}
                            </RadioGroup>
                        </Card>
                    </View> : null}
                </View>
                {this.props.search ? <View style={{ zIndex: -1 }}>
                    <Item style={{ marginTop: 20, borderRadius: 5, backgroundColor: "#C4C4C4", }} regular>
                        <Icon type="Ionicons" name="ios-search" />
                        <Input
                            style={{
                                fontFamily: fonts.medium,
                                fontSize: 13,
                                height: 35,
                            }}
                            placeholder='' />
                    </Item>
                </View> : null}
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
})

Header.propTypes = propTypes;

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);