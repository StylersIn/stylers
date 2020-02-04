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
import Button from '../../components/Button';

const propTypes = {
    onSelect: PropTypes.func,
}

const ServiceList = (props) => {
    console.log(props)
    const {
        selected,
        service__list,
        fetching,
        error,
        reload,
        updateStyler,
        processing,
    } = props;

    const _keyExtractor = (item, index) => item.name;
    const filterCheck = (item, price = []) => {
        return price.some(e => item.subServices.findIndex(r => r._id == e.subServiceId) >= 0);
    }
    return (
        <>
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
                    {service__list && service__list.map((item, i) => <TouchableOpacity
                        onPress={() => props.onSelect(item)}
                        activeOpacity={0.8}
                        key={i}
                        style={styles.serviceList}>
                        <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{item.name}</Text>
                        {filterCheck(item, props.price) && filterCheck(item, props.price) ?
                            <Icon style={{ color: colors.success, }} name='ios-checkmark-circle' /> : <Icon style={{ color: colors.pink, }} name='ios-arrow-forward' />}
                    </TouchableOpacity>)}
                    {fetching && <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Spinner color={colors.pink} />
                    </View>}
                    {error && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.danger, fontFamily: fonts.medium, }}>{error}</Text>
                        <View style={{ marginTop: 20, }}>
                            <Button
                                onPress={() => reload()}
                                btnTxt={"Reload"}
                                size={"sm"}
                                btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold, }}
                                styles={{ height: 30, backgroundColor: colors.black }}
                            />
                        </View>
                    </View>}
                </View>
            </View>
            {service__list && <View style={{ marginVertical: 0, padding: 20 }}>
                <Button
                    onPress={props.price ? () => updateStyler() : () => { }}
                    btnTxt={"Complete Sign Up"}
                    size={"lg"}
                    loading={processing}
                    styles={{ backgroundColor: !props.price ? colors.btnDisabled : colors.white, borderWidth: 1, borderColor: !props.price ? colors.btnDisabled : "#000000" }}
                    btnTxtStyles={!props.price ? { color: colors.white, } : { color: colors.black }, { fontFamily: fonts.bold }}
            />
            </View>}
        </>
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