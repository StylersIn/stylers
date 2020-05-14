import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { fonts, colors } from '../../constants/DefaultProps';
import Service1 from '../../../assets/imgs/photo-1529982412356-901cc3a363cf.jpeg';
import Service2 from '../../../assets/imgs/ricardo-mancia-214428-unsplash.jpg';
import nail__fixing from '../../../assets/imgs/nail__fixing.jpeg';
import hair__dressing from '../../../assets/imgs/hair__dressing.jpeg';
import hair__cut from '../../../assets/imgs/hair__cut.jpeg';
import make__up from '../../../assets/imgs/make__up.jpeg';
import eye__lashes from '../../../assets/imgs/eye__lashes.jpeg';
import Text from '../../config/AppText';
import { FlatList } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { EmptyAppointment } from '../Appointments/AppointmentAssets';

const ServiceList = (props) => {
    const {
        services,
        isProcessing,
        filterErr,
    } = props;
    const _keyExtractor = (item, index) => item.name;
    return (
        <View style={styles.child__container}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>By Service</Text>
            <View>
                <Text style={styles.basic__1}>Select a service and</Text>
                <Text style={styles.basic__2}>proceed to the styler page</Text>
                <Text style={styles.basic__2}>for booking</Text>
            </View>
            {filterErr && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <EmptyAppointment />
                <Text style={{ fontSize: 18, paddingVertical: 40, fontFamily: fonts.medium, textAlign: 'center', }}>{filterErr}</Text>
            </View>}
            {!isProcessing && services && !filterErr && <View style={styles.grid__main}>
                <FlatList
                    data={services}
                    numColumns={2}
                    keyExtractor={_keyExtractor}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1 / 2, paddingEnd: 10, justifyContent: "space-between" }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('Service', { service: item })}
                                activeOpacity={0.9}>
                                <Image
                                    style={styles.img}
                                    // loadingIndicatorSource={true}
                                    source={{ uri: item.imageUrl }} />
                                <View style={styles.overlay} />
                                <View style={{ position: "relative", bottom: "50%" }}>
                                    <Text style={styles.genderTxt}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>}

            {isProcessing && Loader()}

        </View>
    )
}

const styles = StyleSheet.create({
    child__container: {
        flex: 1,
        marginTop: 0,
    },
    grid__main: {
        marginTop: 20,
    },
    grid__child: {
        // flexDirection: "row",
        marginTop: -8,
        // justifyContent: "space-between",
    },
    img: {
        width: "100%",
        height: 100,
        borderRadius: 5,
        resizeMode: "cover",
    },
    genderTxt: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white,
        textAlign: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: 100,
        // marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
    },
    Input___shadow: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000000',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        borderLeftWidth: 12,
        borderLeftColor: "#000000",
        borderTopColor: 'transparent',
    },
    basic__1: {
        color: "#979797",
        marginTop: 10,
    },
    basic__2: {
        color: "#979797",
    },
})

export default ServiceList;