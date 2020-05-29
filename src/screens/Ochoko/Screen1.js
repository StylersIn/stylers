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
} from 'native-base';
import Text from '../../config/AppText';
import { SafeAreaView } from 'react-navigation';

class Screen1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: undefined,
            options: ["Bar", "Restaurant", "Night Club"],
        }
    }

    handleSelect = selected => this.setState({ selected, });

    render() {
        const {
            options,
            selected,
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Content>
                        <Text style={styles.mainTxt}>Parlez nous de votre establissement</Text>
                        <Item>
                            <Input placeholder="Nom" />
                        </Item>

                        <View style={styles.buttonContainer}>
                            {options.map((option, i) => <View key={i}>
                                <Button
                                    style={[styles.buttonIcon, selected == i && styles.btnActive]}
                                    onPress={() => this.handleSelect(i)}
                                >
                                    <Icon
                                        name="ios-add"
                                        style={[styles.icon, selected == i && styles.active]}
                                    />
                                </Button>
                                <Text
                                    style={[styles.iconTxt, selected == i && styles.active]}
                                >
                                    {option}
                                </Text>
                            </View>)}
                        </View>

                        <Button style={styles.buttonMain}>
                            <Text style={styles.btnTxt}>Suivant</Text>
                        </Button>
                    </Content>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        // justifyContent: "center",
        // alignItems: "center",
    },
    mainTxt: {
        fontSize: 18,
        fontWeight: "800",
        textAlign: "center",
        marginVertical: 20,
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
    btnActive: {
        backgroundColor: "#fee028",
        borderColor: "#fee028",
    },
    active: {
        color: "#000000",
    },
    buttonMain: {
        marginTop: 40,
        backgroundColor: "#000000",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,
    },
    btnTxt: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
    },
    icon: {
        fontSize: 48,
        color: "#bbb",
    },
    iconTxt: {
        marginTop: 10,
        color: "#bbb",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "800",
    },
})

export default Screen1;