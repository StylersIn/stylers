import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import {
    Item,
    Input,
} from 'native-base';
import Button from '../../components/Button';
import { fonts } from '../../constants/DefaultProps';
import Text from '../../config/AppText';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ paddingVertical: 20, }}>
                    <Text style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 30 }} >Log Into {"\n"}Your Account</Text>
                </View>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                    <Input
                        style={{ fontFamily: fonts.default, fontSize: 13 }}
                        placeholder='Email' />
                </Item>
                <Item style={{ marginTop: 10, borderRadius: 5, }} regular>
                    <Input
                        style={{ fontFamily: fonts.default, fontSize: 13 }}
                        placeholder='Password' />
                </Item>

                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={this.handleClick.bind(this)}
                        btnTxt={"LOG IN"}
                        size={"lg"}
                        btnTxtStyles={{ color: "white", fontFamily: fonts.default }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    }
})

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);