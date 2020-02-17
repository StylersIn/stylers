import React from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import {
    Card,
    List,
    ListItem,
    CheckBox,
    Icon,
    Item,
    Input,
} from 'native-base';
import Text from '../../config/AppText';
import { fonts, colors } from '../../constants/DefaultProps';

const services = ['Barbing', 'Shaving', 'Relaxing', 'Hair Dye'];
const StylerServiceList = ({
    styler,
    selected,
    // adult,
    // child,
    onSelectService,
    onChangeOption,
}) => {
    console.log(styler)
    return (
        <View style={{ marginTop: 0 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>Select Services</Text>
            <Item style={[{ marginTop: 10, borderRadius: 5, backgroundColor: colors.white, }, styles.cardStyle]} regular>
                <Icon style={{ fontSize: 20, }} type="Ionicons" name="ios-search" />
                <Input
                    // onChangeText={(e) => this.handleSearch(e)}
                    style={{
                        fontFamily: fonts.medium,
                        fontSize: 13,
                        height: 35,
                    }}
                    placeholder='' />
                {/* {this.state.searchInput && <View style={{ marginRight: 10 }}>
                                <Icon type="Ionicons" name="ios-close" />
                            </View>} */}
            </Item>
            {/* <Card style={styles.cardStyle}> */}
            <View>
                {styler.services.map((service, i) => {
                    const { _id, name, } = service.subServiceId;
                    const single = selected.find(e => e.subServiceId === _id);
                    console.log("======3=3=3=3===============")
                    console.log(selected)
                    const adult = single && single['adult'] || 0;
                    const child = single && single['child'] || 0;
                    return (
                        <View key={i} style={{ marginBottom: 10, }}>
                            <Text style={{ fontSize: 14, fontFamily: fonts.bold, marginVertical: 10, }}>{name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View>
                                    <Text style={styles.service__txt__0}>Adult</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.selectorBtn}
                                            disabled={adult === 0 ? true : false}
                                            onPress={() => onChangeOption(_id, 'adult', 'sub')}
                                        >
                                            <Icon style={styles.iconRemove} name='ios-remove' />
                                        </TouchableOpacity>

                                        <View style={styles.selector__input}>
                                            <Text style={{ fontSize: 12 }}>{adult}</Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.selectorBtn}
                                            onPress={() => onChangeOption(_id, 'adult', 'add')}
                                        >
                                            <Icon style={styles.iconAdd} name='ios-add' />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.service__txt__0}>Child</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.selectorBtn}
                                            disabled={child === 0 ? true : false}
                                            onPress={() => onChangeOption(_id, 'child', 'sub')}
                                        >
                                            <Icon style={styles.iconRemove} name='ios-remove' />
                                        </TouchableOpacity>
                                        <View style={styles.selector__input}>
                                            <Text style={{ fontSize: 12 }}>{child}</Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.selectorBtn}
                                            onPress={() => onChangeOption(_id, 'child', 'add')}
                                        >
                                            <Icon style={styles.iconAdd} name='ios-add' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
            {/* </Card> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    service__txt__0: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: "#4F4F4F",
        marginTop: 5,
    },
    selector__input: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#E4E3E3",
        borderRadius: 3,
        marginRight: 7,
    },
    selectorBtn: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
        borderRadius: 3,
        marginRight: 7,
    },
    iconAdd: {
        color: colors.pink,
    },
    iconRemove: {
        color: colors.white,
    },
})

export default StylerServiceList;