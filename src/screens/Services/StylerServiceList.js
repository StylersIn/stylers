import React from 'react';
import { View, StyleSheet, } from 'react-native';
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
const StylerServiceList = () => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>Services</Text>
            <Card style={styles.cardStyle}>
                <List>
                    {services.map((service, i) => <ListItem key={i} style={{ marginVertical: -5, }}>
                        <View style={{ marginRight: 10, }}>
                            <CheckBox
                                color={"#606060"}
                                style={{ width: 15, height: 15, alignItems: "center", justifyContent: "center", }}
                                checked={i === 1 ? true : false} />
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: fonts.bold, }}>{service}</Text>
                        <Text style={styles.service__txt__0}>Adult</Text>
                        <Icon
                            style={{ fontSize: 16, color: "#606060", }}
                            type="Ionicons"
                            name="ios-add-circle" />
                        <View style={styles.selector__input}>
                            <Text style={{ fontSize: 12 }}>1</Text>
                        </View>
                        <Icon
                            style={{ fontSize: 16, color: "#606060", }}
                            type="Ionicons"
                            name="ios-remove-circle" />
                        <Text style={styles.service__txt__0}>Child</Text>
                        <Icon
                            style={{ fontSize: 16, color: "#606060", }}
                            type="Ionicons"
                            name="ios-add-circle" />
                        <View style={styles.selector__input}>
                            <Text style={{ fontSize: 12 }}>0</Text>
                        </View>
                        <Icon
                            style={{ fontSize: 16, color: "#606060", }}
                            type="Ionicons"
                            name="ios-remove-circle" />
                    </ListItem>)}
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