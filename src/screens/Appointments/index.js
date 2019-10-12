import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
} from 'react-native';
import {
    Icon,
    Card,
    CardItem,
} from 'native-base';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import { BarberIcon } from '../Services/ServiceAssets';
import { AppointmentIcon } from '../../navigation/assets';

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: ['Haircut', 'Manicure & Pedicure']
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        activeOpacity={0.7}>
                        <Icon
                            style={{ fontSize: 60, color: !this.state.isVisible ? "#000000" : "#ffffff", alignSelf: "flex-end", }}
                            type="Ionicons"
                            name="ios-close" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontFamily: fonts.bold, }}>Appointments</Text>

                    <View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text>
                            {this.state.services.map((service, i) => <Card key={i} style={styles.cardStyle}>
                                <CardItem style={{ borderRadius: 4 }}>
                                    <View style={{ borderRightWidth: 0.5, borderColor: "#979797", alignItems: "center", paddingRight: 10, }}>
                                        <Text style={{ fontFamily: fonts.bold, fontSize: 18, paddingVertical: 2, }}>08</Text>
                                        <Text style={{ fontSize: 12, paddingVertical: 2, }}>Thu</Text>
                                        <Text style={{ fontSize: 12, paddingVertical: 2, }}>3:00PM</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 10, }}>
                                        <Text style={{ fontFamily: fonts.bold }}>{service}</Text>
                                        <Text style={{ fontSize: 10, fontFamily: fonts.medium, paddingVertical: 5, }}>Thor Odinson </Text>
                                        <Text style={{ fontSize: 10, }}>No 9 Centenary City, Enugu</Text>
                                    </View>
                                    <View style={{ position: "absolute", top: 10, right: 10, }}>
                                        <BarberIcon />
                                    </View>
                                </CardItem>
                            </Card>)}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 4,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
        borderLeftWidth: 12,
        borderLeftColor: "#000000",
        // paddingRight: 12,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
});

export default Appointment;