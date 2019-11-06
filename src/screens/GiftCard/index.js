import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import { GiftCardIcon } from '../../navigation/assets';

class GiftCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <GiftCardIcon tintColor={"none"} />
        )
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    }
})

const mapStateToProps = state => ({
    services: state.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GiftCard);