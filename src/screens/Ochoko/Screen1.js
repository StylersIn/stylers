import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Content,
    Item,
    Input,
    Button,
    Icon,
    Thumbnail,
} from 'native-base';
import Text from '../../config/AppText';
import { SafeAreaView } from 'react-navigation';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerMenu: undefined,
        }
    }

    render() {
        const {
            hamburgerMenu,
        } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <TouchableOpacity onPress={() => this.setState({ hamburgerMenu: true, })}>
                    <Icon style={{ marginTop: 60, alignSelf: "flex-end", paddingHorizontal: 30, }} name="ios-menu" />
                </TouchableOpacity>
                {hamburgerMenu && <View style={styles.hamburgerMenu}>
                    <View style={styles.hamburgerMenuHeader}>
                        <TouchableOpacity>
                            <Icon style={styles.hamburgerMenuHeaderIcon} name="ios-power" />
                        </TouchableOpacity>
                        <Text style={styles.brandTxt}>Albear</Text>
                        <TouchableOpacity
                            style={{ alignItems: "center", }}
                            onPress={() => this.setState({ hamburgerMenu: false, })}
                        >
                            <Icon style={styles.hamburgerMenuHeaderIcon2} name="ios-close" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hamburgerMenuContent}>
                        <View>
                            <Button style={styles.actionBtn1}>
                                <Icon
                                    name="ios-add"
                                    style={styles.icon}
                                />
                            </Button>
                        </View>
                        <View>
                            <Progress.Circle
                                style={styles.progress}
                                progress={0.8}
                                unfilledColor={"#bbb"}
                                color={"#fee028"}
                                borderColor={"#fee028"}
                                strokeCap={"round"}
                                thickness={5}
                                indeterminate={false}
                                size={105}
                            >
                                <Thumbnail
                                    style={styles.hamburgerMenuImg}
                                    source={require('../../../assets/imgs/make__up.jpeg')}
                                />
                                <View style={styles.avatarCaption}>
                                    <Text style={styles.captionTxt}>Lil'bear</Text>
                                </View>
                            </Progress.Circle>
                        </View>
                        <View>
                            <Button style={styles.actionBtn1}>
                                <Icon
                                    name="ios-add"
                                    style={styles.icon}
                                />
                            </Button>
                        </View>

                    </View>
                    <Text style={styles.termsTxt}>Termes et conditions</Text>
                </View>}
                <View style={styles.container}>
                    <Content contentContainerStyle={styles.subContainer}>
                        <Progress.Circle
                            style={styles.progress}
                            progress={0.8}
                            unfilledColor={"#bbb"}
                            color={"#fee028"}
                            borderColor={"#fee028"}
                            strokeCap={"round"}
                            thickness={5}
                            indeterminate={false}
                            size={135}
                        >
                            <Thumbnail
                                style={styles.img}
                                source={require('../../../assets/imgs/make__up.jpeg')}
                            />
                            <View style={styles.avatarBrand}>
                                <Icon style={styles.brandIcon} name="ios-add" />
                            </View>
                            <View style={styles.avatarCaption}>
                                <Text style={styles.captionTxt}>Lil'bear</Text>
                            </View>
                        </Progress.Circle>
                        <View>
                            <Text style={styles.text1}>Marcus450</Text>
                            <Text style={styles.text2}>marcus450@gmail.com</Text>
                        </View>
                        <Button style={styles.buttonMain}>
                            <Text style={styles.btnTxt}>Editer mon profil</Text>
                        </Button>

                        <View style={styles.actionComponent}>
                            <View style={styles.actionBtnContent}>
                                <Button style={styles.actionBtn}>
                                    <Icon
                                        name="ios-add"
                                        style={styles.icon}
                                    />
                                </Button>
                                <Text style={styles.actionTxt1}>9</Text>
                                <Text style={styles.actionTxt2}>Demandes</Text>
                            </View>
                            <View style={styles.actionBtnContent}>
                                <Button style={styles.actionBtn}>
                                    <Icon
                                        name="ios-add"
                                        style={styles.icon}
                                    />
                                </Button>
                                <Text style={styles.actionTxt1}>1200</Text>
                                <Text style={styles.actionTxt2}>M'honey</Text>
                            </View>
                            <View style={styles.actionBtnContent}>
                                <Button style={styles.actionBtn}>
                                    <Icon
                                        name="ios-add"
                                        style={styles.icon}
                                    />
                                </Button>
                                <Text style={styles.actionTxt1}>2</Text>
                                <Text style={styles.actionTxt2}>Cadeaux</Text>
                            </View>
                        </View>
                    </Content>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 50,
    },
    subContainer: {
        flexGrow: 1,
        alignItems: "center",
    },
    img: {
        width: 110,
        height: 110,
        alignSelf: "center",
        position: "absolute",
        borderRadius: 110 / 2,
    },
    imgBorderDefault: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        borderWidth: 5,
        borderColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    imgBorder: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        borderWidth: 5,
        borderColor: "#fee028",
        alignItems: "center",
        justifyContent: "center",
        // position:"relative"
    },
    text1: {
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5,
    },
    text2: {
        fontSize: 16,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 30,
    },
    buttonIcon: {
        width: 92,
        height: 92,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 92 / 2,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#bbb",
    },
    buttonMain: {
        marginTop: 40,
        backgroundColor: "#000000",
        justifyContent: "center",
        height: 50,
        width: "70%",
        borderRadius: 10,
    },
    btnTxt: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
    },
    progress: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatarCaption: {
        // padding: 5,
        width: 80,
        height: 25,
        backgroundColor: "#fee028",
        position: "absolute",
        bottom: 0,
        borderRadius: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    captionTxt: {
        fontWeight: "900",
        alignSelf: "flex-end",
    },
    avatarBrand: {
        // padding: 5,
        backgroundColor: "#000",
        position: "absolute",
        bottom: 0,
        zIndex: 500,
        width: 28,
        height: 28,
        borderRadius: 28 / 2,
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
    },
    actionComponent: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 40,
    },
    actionBtn: {
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fee028",
        backgroundColor: "transparent",
    },
    actionBtn1: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fee028",
    },
    icon: {
        color: "#000",
        fontSize: 40,
        textAlign: "center",
        alignSelf: "center",
    },
    brandIcon: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        color: "#fff",
        fontSize: 25,
    },
    actionTxt1: {
        fontSize: 20,
        fontWeight: "900",
        paddingVertical: 5,
    },
    actionTxt2: {
        color: "#bbb",
        fontWeight: "900",
    },
    actionBtnContent: {
        alignItems: "center",
    },
    hamburgerMenu: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        height: 280,
        width: "100%",
        backgroundColor: "#000",
        zIndex: 500,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 30,
    },
    hamburgerMenuHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    hamburgerMenuHeaderIcon: {
        color: "#fff",
        fontWeight: "900",
        fontSize: 30,
    },
    hamburgerMenuHeaderIcon2: {
        color: "#fff",
        fontWeight: "900",
        fontSize: 50,
        textAlign: "center",
        alignSelf: "center",
    },
    brandTxt: {
        color: "#fff",
        fontWeight: "900",
        fontSize: 20,
    },
    hamburgerMenuContent: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 20,
    },
    hamburgerMenuImg: {
        width: 80,
        height: 80,
        alignSelf: "center",
        position: "absolute",
        borderRadius: 80 / 2,
    },
    termsTxt: {
        color: "#bbb",
        marginTop: 20,
        fontWeight: "800",
        textDecorationLine: "underline",
    },
})

export default Screen1;