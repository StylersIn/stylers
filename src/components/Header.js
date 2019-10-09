import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { HamburgerIcon } from '../navigation/assets';
import { View, Item, Icon, Input, Card, CardItem, Body, Left, Radio, CheckBox } from 'native-base';
import { ListIcon } from './assets';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import { fonts } from '../constants/DefaultProps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

const propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.bool,
    onChange: PropTypes.func,
    showList: PropTypes.bool,
    selectListItem: PropTypes.func,
    selected: PropTypes.number,
}

const options = ['Rating', 'Location', 'Price'];

const Header = ({
    title,
    list = false,
    onChange,
    showList,
    selectListItem,
    selected,
}) => {
    return (
        <View>
            <HamburgerIcon />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, }}>
                <View>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 24, }}>{title}</Text>
                </View>
                {list ? <TouchableOpacity
                    onPress={() => onChange()}
                    activeOpacity={0.5}>
                    <ListIcon />
                </TouchableOpacity> : null}
                {showList ? <View style={{ position: "absolute", right: -20, top: 25, zIndex: 1, }}>
                    <Card style={styles.cardStyle}>
                        <RadioGroup
                            size={15}
                            thickness={2}
                            color='#606060'
                            // selectedIndex={1}
                            onSelect={(index, value) => selectListItem(index, value)}
                        >
                            {options.map((option, i) =>
                                <RadioButton
                                    style={{ margin: 3, padding: 1, paddingHorizontal: 5, }}
                                    value={'item1'} >
                                    <Text style={{ fontSize: 12, fontFamily: fonts.bold }}>{option}</Text>
                                </RadioButton>)}
                        </RadioGroup>
                    </Card>
                </View> : null}
            </View>
            <View style={{ zIndex: -1 }}>
                <Item style={{ marginTop: 10, borderRadius: 5, backgroundColor: "#C4C4C4", }} regular>
                    <Icon type="Ionicons" name="ios-search" />
                    <Input
                        style={{
                            fontFamily: fonts.default,
                            fontSize: 13,
                            height: 35,
                        }}
                        placeholder='' />
                </Item>
            </View>
        </View>
    )
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

export default Header;