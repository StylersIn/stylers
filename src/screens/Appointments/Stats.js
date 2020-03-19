import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    Card,
    CardItem,
    Spinner,
} from 'native-base';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { RatingIcon, BankIcon, ClientIcon } from './AppointmentAssets';

export default function (props) {
    const appnts = props.appointments && props.appointments.filter(e => e.completed === true) || {};
    return (
        <View style={{ flex: 1, }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, }}
                horizontal={true}
            >
                <Card style={[styles.cardStyle,]}>
                    <CardItem style={[{ borderRadius: 4 }, styles.card1]}>
                        <View style={styles.card__child}>
                            <View>
                                <RatingIcon />
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.txt__one}>Your rating</Text>
                                {/* <Text style={styles.txt__two}>3.5</Text> */}
                                {!props.stats ? <View>
                                    <Text style={{ color: colors.white, marginTop: 5, fontSize: 10, }}>Loading...</Text>
                                </View> : <Text style={styles.txt__two}>{props.stats && props.stats.rating}</Text>}
                            </View>
                        </View>
                    </CardItem>
                </Card>

                <Card style={[styles.cardStyle,]}>
                    <CardItem style={[{ borderRadius: 4 }, styles.card2]}>
                        <View style={styles.card__child}>
                            <View>
                                <BankIcon />
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.txt__one}>Bank (NGN)</Text>
                                <View>
                                    {!props.stats ? <View>
                                        <Text style={{ color: colors.white, marginTop: 5, fontSize: 10, }}>Loading...</Text>
                                    </View> : <Text style={styles.txt__two}>{props.stats && props.stats.totalAmount}</Text>}
                                </View>
                            </View>
                        </View>
                    </CardItem>
                </Card>

                <Card style={[styles.cardStyle,]}>
                    <CardItem style={[{ borderRadius: 4 }, styles.card3]}>
                        <View style={styles.card__child}>
                            <View>
                                <ClientIcon />
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.txt__one}>Clients served</Text>
                                <View>
                                    {!props.stats ? <View>
                                        <Text style={{ color: colors.white, marginTop: 5, fontSize: 10, }}>Loading...</Text>
                                    </View> : <Text style={styles.txt__two}>{props.stats && props.stats.clients}</Text>}
                                </View>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    txt__one: {
        fontFamily: fonts.bold,
        color: 'white'
    },
    txt__two: {
        fontFamily: fonts.bold,
        color: 'white',
        fontSize: 24,
        marginTop: 5,
    },
    cardStyle: {
        borderWidth: 1,
        width: 250,
        borderRadius: 4,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
    },
    card1: {
        backgroundColor: '#E6750C',
        height: 100,
    },
    card2: {
        backgroundColor: '#0E5B02',
        height: 100,
    },
    card3: {
        backgroundColor: '#DE408B',
        height: 100,
    },
    card__child: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});