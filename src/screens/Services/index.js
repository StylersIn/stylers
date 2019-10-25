import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    SafeAreaView,
} from 'react-native';
import {
    Card,
    CardItem,
    Body,
    Left,
    Right,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import Header from '../../components/Header';
import { BarberIcon } from './ServiceAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ServiceStylers from './ServiceStylers';

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selected: 0,
        }
    }

    componentDidMount() {
        // this.
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    handleChange = () => {
        this.setState({ showList: !this.state.showList });
    }

    selectListItem = (index, value) => {
        this.setState({
            selected: index
        })
    }

    render() {
        const { showList } = this.state;
        const { navigation } = this.props;
        const service = navigation.getParam('service', '');
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={{ zIndex: 1 }}>
                        <Header
                            list
                            title={service.name}
                            onChange={this.handleChange}
                            showList={this.state.showList}
                            selectListItem={this.selectListItem}
                            selected={this.state.selected}
                        />
                    </View>
                    <ServiceStylers {...this.props} />
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

export default Services;