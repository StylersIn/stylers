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
import ListView from 'deprecated-react-native-listview';

class Screen2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(['Creation complete du profile', 'Informations clefs', 'Comptes multiples']),
        };
    }

    renderRow(data, strike = false) {
        return (
            <Text>{`\u2022 `}<Text style={[strike && styles.txtStrike]}>{`${data}`}</Text></Text>
        );
    }

    render() {
        const {
            dataSource,
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Content>
                        <Text style={styles.mainTxt1}>Chioisissez une offre</Text>
                        <Text style={styles.mainTxt2}>pour faire partie de la communaute</Text>

                        <Content
                            contentContainerStyle={styles.scroller}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {[0, 1].map((item, i) => <View key={i} style={styles.mainCard}>
                                <Text style={styles.text1}>Brown Bear</Text>
                                <Text style={styles.text2}>39,90/mois</Text>
                                <Text style={styles.text3}>406,98/an</Text>
                                <Text style={styles.text4}>Brown Bear</Text>

                                <Button style={styles.buttonMain}>
                                    <Text style={styles.btnTxt}>Go Brown</Text>
                                </Button>

                                <View>
                                    <ListView
                                        style={{ marginVertical: 30 }}
                                        dataSource={dataSource}
                                        renderRow={this.renderRow}
                                    />
                                </View>
                            </View>)}
                        </Content>
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
    },
    scroller: {
        flexGrow: 1,
    },
    mainTxt1: {
        fontSize: 18,
        fontWeight: "800",
        textAlign: "center",
    },
    mainTxt2: {
        textAlign: "center",
    },
    mainCard: {
        marginTop: 40,
        marginRight: 20,
        width: 250,
        height: 600,
        borderWidth: 2,
        borderColor: "#4c3f36",
        borderRadius: 5,
        alignItems: "center",
    },
    text1: {
        fontSize: 24,
        fontWeight: "900",
        paddingVertical: 25,
    },
    text2: {
        fontSize: 18,
        fontWeight: "700",
        paddingVertical: 5,
    },
    text3: {
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 3,
    },
    text4: {
        fontSize: 10,
        fontWeight: "300",
        paddingVertical: 3,
    },
    buttonMain: {
        width: "70%",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#4c3f36",
    },
    btnTxt: {
        fontSize: 16,
        fontWeight: "800",
        color: "#fff",
    },
    txtStrike: {
        textDecorationLine: "line-through",
    },
})

export default Screen2;