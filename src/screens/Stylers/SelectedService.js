import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { fonts, colors, imgUrl } from '../../constants/DefaultProps';
import {
    Icon,
} from 'native-base';
import Text from '../../config/AppText';
import { ScrollView } from 'react-native-gesture-handler';

const propTypes = {
    selected: PropTypes.array,
    removeSelected: PropTypes.func,
}
const GenderList = (props) => {
    return (
        <View style={styles.childContainer}>
            {/* <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>By Gender</Text> */}
            <View style={{ flexDirection: "row", marginTop: 10, }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal>
                    {props.selected.length ? props.selected.map((selected, i) => <View key={i} style={{ paddingRight: 10 }}>
                        <View>
                            <Image
                                style={styles.img}
                                source={{ uri: selected.imageUrl || imgUrl }} />
                            <View style={styles.overlay}>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        height: 25,
                                        width: 25,
                                        borderRadius: 25 / 2,
                                        backgroundColor: "#ffffff",
                                        marginTop: 4,
                                        elevation: 500,
                                        alignSelf: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={() => props.removeSelected(selected.serviceId)}
                                    activeOpacity={0.7}>
                                    <Icon style={{ textAlign: "center", marginTop: -2, }} type="Ionicons" name="ios-close" />
                                </TouchableOpacity>
                                <View style={styles.overlayTxtBody}>
                                    <Text style={styles.overlayTxtMain}>{selected.name}</Text>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={styles.overlayTxtSub}>{`adult/NGN${selected.adult}`}</Text>
                                        <Text style={styles.overlayTxtSub}>{`child/NGN${selected.child}`}</Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </View>) : <View style={{ width: "50%" }}>
                            <Text style={styles.basic__1}>Pick a service from the list below. Example Haircuts, Hair dressing</Text>
                        </View>}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    childContainer: {
        // flex: 1,
        marginTop: 20,
    },
    basic__1: {
        color: "#979797",
    },
    img: {
        width: 130,
        height: 150,
        borderRadius: 5,
        resizeMode: "cover",
        // backgroundColor: "red"
    },
    overlayTxtBody: {
        flex: 1,
        position: "relative",
        top: "50%",
        alignItems: 'center',
    },
    overlayTxtMain: {
        fontSize: 14,
        color: colors.white,
        fontFamily: fonts.bold,
        textAlign: "center"
    },
    overlayTxtSub: {
        fontSize: 10,
        color: colors.white,
        fontFamily: fonts.bold,
        textAlign: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
    }
})

GenderList.propTypes = propTypes;

export default GenderList;