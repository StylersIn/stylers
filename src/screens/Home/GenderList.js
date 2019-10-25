import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { fonts, colors } from '../../constants/DefaultProps';
import {
    Item,
    Input,
    Icon,
    Thumbnail,
} from 'native-base';
import Gender1 from '../../../assets/imgs/photo-1508835277982-1c1b0e205603.jpeg';
import Gender2 from '../../../assets/imgs/ricardo-mancia-214428-unsplash.jpg';
import Text from '../../config/AppText';

const GenderList = () => {
    return (
        <View style={styles.childContainer}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>By Gender</Text>
            <View style={{ flexDirection: "row", marginTop: 10, }}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Image
                        style={styles.img}
                        source={Gender1} />
                    <View style={styles.overlay} />
                    <View style={{ position: "relative", bottom: 30 }}>
                        <Text style={styles.genderTxt}>HIM</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ paddingLeft: 10 }}>
                    <Image
                        style={styles.img}
                        source={Gender2} />
                    <View style={styles.overlay} />
                    <View style={{ position: "relative", bottom: 30 }}>
                        <Text style={styles.genderTxt}>HER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    childContainer: {
        // flex: 1,
        marginTop: 20,
    },
    img: {
        width: 130,
        height: 150,
        borderRadius: 5,
        resizeMode: "cover",
        backgroundColor: "red"
    },
    genderTxt: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.white,
        textAlign: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
    }
})

export default GenderList;