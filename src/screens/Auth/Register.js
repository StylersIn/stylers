import React from 'react';
import {
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

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Item regular>
                    <Input placeholder='Your name' />
                </Item>
                <Item regular>
                    <Input placeholder='Email' />
                </Item>
                <Item regular>
                    <Input placeholder='Password' />
                </Item>

                <View>
                    <Button
                        btnTxt={"SIGN UP"}
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
        justifyContent: "center",
    }
})

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);