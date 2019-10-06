import React from 'react';
import { HamburgerIcon } from '../navigation/assets';
import { View, Item, Icon, Input } from 'native-base';
import { ListIcon } from './assets';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import { fonts } from '../constants/DefaultProps';

const propTypes = {
    title: PropTypes.string.isRequired,
}

const Header = ({ title, list = false }) => {
    return (
        <View>
            <HamburgerIcon />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, }}>
                <View>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 24, }}>{title}</Text>
                </View>
                {list ? <ListIcon /> : null}
            </View>
            <View>
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

Header.propTypes = propTypes;

export default Header;