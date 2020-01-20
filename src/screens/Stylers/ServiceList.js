import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { fonts, colors, imgUrl } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Spinner } from 'native-base';

const propTypes = {
    onSelect: PropTypes.func,
}

const ServiceList = (props) => {
    const {
        selected,
        service__list,
    } = props;

    const _keyExtractor = (item, index) => item.name;
    return (
        <View style={styles.child__container}>
            {/* <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>By Service</Text> */}
            <View style={styles.grid__main}>
                {/* <FlatList
                    // contentContainerStyle={{ backgroundColor:"red" }}
                    data={service__list && service__list.credentials.message}
                    numColumns={2}
                    keyExtractor={_keyExtractor}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1 / 2, paddingEnd: 10, justifyContent: "space-between" }}>
                            <TouchableOpacity
                                disabled={selected.findIndex(e => e.serviceId === item._id) === -1 ? false : true}
                                onPress={() => props.onSelect(item)}
                                activeOpacity={0.7}>
                                <Image
                                    style={[styles.img]}
                                    source={{ uri: item.imageUrl || imgUrl }} />
                                <View style={[styles.overlay, { backgroundColor: selected.findIndex(e => e.serviceId === item._id) === -1 ? 'rgba(0,0,0,0.5)' : 'rgba(200,160,200.5,0.5)' }]} />
                                <View style={{ position: "relative", bottom: "50%" }}>
                                    <Text style={styles.overlayTxtMain}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                /> */}
                {service__list ? service__list.credentials.message.map((item, i) => <TouchableOpacity
                    onPress={() => props.onSelect(item)}
                    activeOpacity={0.8}
                    key={i}
                    style={styles.serviceList}>
                    <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{item.name}</Text>
                    <Icon style={{ color: colors.pink, }} name='ios-arrow-forward' />
                </TouchableOpacity>) : <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Spinner color={colors.pink} />
                    </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    child__container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 50,
    },
    grid__main: {
        flex: 1,
        marginTop: 0,
    },
    serviceList: {
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.black,
        marginBottom: 1,
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
    overlayTxtMain: {
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