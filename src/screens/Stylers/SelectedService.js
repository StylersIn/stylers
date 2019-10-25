import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { fonts, colors } from '../../constants/DefaultProps';
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
                                source={selected.img} />
                            <View style={styles.overlay}>
                                <TouchableOpacity
                                    onPress={() => props.removeSelected(i)}
                                    activeOpacity={0.7}>
                                    <View style={{
                                        height: 25,
                                        width: 25,
                                        borderRadius: 25 / 2,
                                        backgroundColor: "#ffffff",
                                        marginTop: 4,
                                        position: "absolute",
                                        alignSelf: "center",
                                        alignItems: "center",
                                    }}>
                                        <Icon style={{ textAlign: "center", marginTop: -2, }} type="Ionicons" name="ios-close" />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.genderTxt}>{selected.name}</Text>
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
        backgroundColor: "red"
    },
    genderTxt: {
        flex: 1,
        flexWrap: "wrap",
        position: "relative",
        top: "50%",
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white,
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