import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
    Icon,
    Form,
    Label,
} from 'native-base';
import Text from '../../config/AppText';
import { HelpIcon } from '../../navigation/assets';
import { fonts, colors } from '../../constants/DefaultProps';
import Button from '../../components/Button';

class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <HelpIcon tintColor={"none"} />
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={{ fontSize: 24, fontFamily: fonts.bold, }}>How can I asist you?</Text>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                style={{ fontSize: 24, color: "#606060" }}
                                type="Ionicons"
                                name="ios-call" />
                            <Text style={styles.basic__1}>(+234) 70 1235 3578</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                style={{ fontSize: 24, color: "#606060" }}
                                type="Ionicons"
                                name="ios-mail" />
                            <Text style={styles.basic__1}>support@mobilestylers.com</Text>
                        </View>
                    </View>
                    <View>
                        <Form>
                            <Item floatingLabel>
                                <Label style={styles.label}>Name</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label style={styles.label}>Email</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label style={styles.label}>Topic</Label>
                                <Input />
                            </Item>
                            <Item style={{ height: 150 }} floatingLabel last>
                                <Label style={styles.label}>Message</Label>
                                <Input />
                            </Item>
                        </Form>
                    </View>
                    <View style={{ marginVertical: 50 }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('ServiceDetails')}
                            btnTxt={"Send"}
                            size={"lg"}
                            btnTxtStyles={{ color: colors.white, fontFamily: fonts.bold, }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        marginTop: 40,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 12,
    },
    basic__1: {
        paddingLeft: 10,
        fontSize: 16,
    }
})

const mapStateToProps = state => ({
    services: state.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);