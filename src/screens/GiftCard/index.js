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
import {
    Item,
    Input,
    Icon,
    Card,
    CardItem,
    Body,
    Left,
    Right,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { BarberIcon } from './ServiceAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';

class GiftCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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