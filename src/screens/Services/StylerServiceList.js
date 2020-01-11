import React from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import {
    Card,
    List,
    ListItem,
    CheckBox,
    Icon,
} from 'native-base';
import Text from '../../config/AppText';
import { fonts } from '../../constants/DefaultProps';

const services = ['Barbing', 'Shaving', 'Relaxing', 'Hair Dye'];
const StylerServiceList = ({
    styler,
    selected,
    // adult,
    // child,
    onSelectService,
    onChangeOption,
}) => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>Services</Text>
            <Card style={styles.cardStyle}>
                <List>
                    {styler.services.map((service, i) => {
                        const { _id, name, } = service.serviceId;
                        const single = selected.find(e => e.serviceId === _id);
                        const adult = single && single['adult'] || 0;
                        const child = single && single['child'] || 0;
                        return (
                            <ListItem key={i} style={{ marginVertical: -5, }}>
                                {/* {alert(selected.includes(_id))} */}
                                <View style={{ marginRight: 10, }}>
                                    <CheckBox
                                        // onPress={() => onSelectService(_id)}
                                        color={"#606060"}
                                        style={{ width: 18, height: 18, alignSelf: "center", }}
                                        checked={selected.findIndex(e => e.serviceId === _id) === -1 ? false : true}
                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontFamily: fonts.bold, }}>{name}</Text>
                                <Text style={styles.service__txt__0}>Adult</Text>
                                <TouchableOpacity
                                    onPress={() => onChangeOption(_id, 'adult', 'add')}
                                >
                                    <Icon
                                        style={{ fontSize: 16, color: "#606060", }}
                                        type="Ionicons"
                                        name="ios-add-circle" />
                                </TouchableOpacity>

                                <View style={styles.selector__input}>
                                    <Text style={{ fontSize: 12 }}>{adult}</Text>
                                </View>
                                <TouchableOpacity
                                    disabled={adult === 0 ? true : false}
                                    onPress={() => onChangeOption(_id, 'adult', 'sub')}
                                >
                                    <Icon
                                        style={{ fontSize: 16, color: "#606060", }}
                                        type="Ionicons"
                                        name="ios-remove-circle" />
                                </TouchableOpacity>
                                <Text style={styles.service__txt__0}>Child</Text>
                                <TouchableOpacity
                                    onPress={() => onChangeOption(_id, 'child', 'add')}
                                >
                                    <Icon
                                        style={{ fontSize: 16, color: "#606060", }}
                                        type="Ionicons"
                                        name="ios-add-circle" />
                                </TouchableOpacity>
                                <View style={styles.selector__input}>
                                    <Text style={{ fontSize: 12 }}>{child}</Text>
                                </View>
                                <TouchableOpacity
                                    disabled={child === 0 ? true : false}
                                    onPress={() => onChangeOption(_id, 'child', 'sub')}
                                >
                                    <Icon
                                        style={{ fontSize: 16, color: "#606060", }}
                                        type="Ionicons"
                                        name="ios-remove-circle" />
                                </TouchableOpacity>
                            </ListItem>
                        )
                    })}
                </List>
            </Card>
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
        paddingRight: 12,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 10,
    },
    service__txt__0: {
        fontSize: 14,
        fontFamily: fonts.bold,
        paddingHorizontal: 8,
        color: "#4F4F4F",
    },
    selector__input: {
        padding: 1,
        paddingHorizontal: 3,
        margin: 5,
        backgroundColor: "#E4E3E3",
        borderRadius: 3,
    },
})

export default StylerServiceList;