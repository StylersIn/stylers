import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
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
            isProcessing: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.created && nextProps.created !== this.props.created) {
            this.setState({ isProcessing: false, })
            alert('Thank you for reaching out to us, we will get back to you in due time.');
            this.props.navigation.navigate('Home');
        }
        if (nextProps.error && nextProps.error !== this.props.error) {
            this.setState({ isProcessing: false, })
            alert(nextProps.error);
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <HelpIcon tintColor={"none"} />
        )
    }

    contact = () => {
        this.setState({ isProcessing: true, })
        this.props.contact({
            name: this.name,
            email: this.email,
            // topic: this.topic,
            message: this.message,
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={{ fontSize: 24, fontFamily: fonts.bold, }}>How can I asist you?</Text>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                style={{ fontSize: 24, color: "#606060" }}
                                type="Ionicons"
                                name="ios-call" />
                            <Text style={styles.basic__1}>(+234) 81 4555 8251</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                style={{ fontSize: 24, color: "#606060" }}
                                type="Ionicons"
                                name="ios-mail" />
                            <Text style={styles.basic__1}>contact@stylerin.com</Text>
                        </View>
                    </View>
                    <View>
                        <Form>
                            <Item floatingLabel>
                                <Label style={styles.label}>Name</Label>
                                <Input
                                    style={{ fontFamily: fonts.medium, fontSize: 14, }}
                                    onChangeText={e => this.name = e}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label style={styles.label}>Email</Label>
                                <Input
                                    disabled
                                    value={this.props.current.email}
                                    autoCapitalize={'none'}
                                    style={{ fontFamily: fonts.medium, fontSize: 14, color: "#bbb", }}
                                // onChangeText={e => this.email = e}
                                />
                            </Item>
                            {/* <Item floatingLabel last>
                                <Label style={styles.label}>Topic</Label>
                                <Input
                                    style={{ fontFamily: fonts.medium, fontSize: 14, }}
                                    onChangeText={e => this.topic = e}
                                />
                            </Item> */}
                            <Item floatingLabel last>
                                <Label style={styles.label}>Message</Label>
                                <Input
                                    style={{ fontFamily: fonts.medium, fontSize: 14, }}
                                    onChangeText={e => this.message = e}
                                />
                            </Item>
                        </Form>
                    </View>
                    <View style={{ marginVertical: 50 }}>
                        <Button
                            onPress={this.contact}
                            btnTxt={"Send"}
                            size={"lg"}
                            loading={this.state.isProcessing}
                            btnTxtStyles={{ color: colors.white, fontFamily: fonts.bold, }}
                        />
                    </View>
                </ScrollView>
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
    created: state.contact.created,
    current: state.user.current,
    error: state.contact.error,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);