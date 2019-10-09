import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { fonts, colors } from '../../constants/DefaultProps';
import {
    Item,
    Input,
    Icon,
    Thumbnail,
} from 'native-base';
import Service1 from '../../../assets/imgs/photo-1529982412356-901cc3a363cf.jpeg';
import Service2 from '../../../assets/imgs/ricardo-mancia-214428-unsplash.jpg';
import nail__fixing from '../../../assets/imgs/nail__fixing.jpeg';
import hair__dressing from '../../../assets/imgs/hair__dressing.jpeg';
import hair__cut from '../../../assets/imgs/hair__cut.jpeg';
import make__up from '../../../assets/imgs/make__up.jpeg';
import eye__lashes from '../../../assets/imgs/eye__lashes.jpeg';
import Text from '../../config/AppText';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

const ServiceList = (props) => {
    const services = [
        {
            name: "HAIRCUTS",
            img: hair__cut,
        },
        {
            name: "HAIR DRESSING",
            img: hair__dressing,
        },
        {
            name: "EYE LASHES",
            img: eye__lashes,
        },
        {
            name: "MAKE-UP",
            img: make__up,
        }
        , {
            name: "MANICURE & PEDICURE",
            img: hair__cut,
        }
        , {
            name: "NAIL FIXING",
            img: nail__fixing,
        },
        {
            name: "CONTACT LENSES",
            img: hair__cut,
        }
    ]
    const _keyExtractor = (item, index) => item.name;
    return (
        <View style={styles.child__container}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>By Service</Text>
            <View style={styles.grid__main}>
                <FlatList
                    // contentContainerStyle={{ backgroundColor:"red" }}
                    data={services}
                    numColumns={2}
                    keyExtractor={_keyExtractor}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1 / 2, paddingEnd: 10, justifyContent: "space-between" }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('Service')}
                                activeOpacity={0.7}>
                                <Image
                                    style={styles.img}
                                    source={item.img} />
                                <View style={styles.overlay} />
                                <View style={{ position: "relative", bottom: "50%" }}>
                                    <Text style={styles.genderTxt}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    child__container: {
        // flex: 1,
        marginTop: 20,
    },
    grid__main: {
        marginTop: 10,
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
    }
})

export default ServiceList;