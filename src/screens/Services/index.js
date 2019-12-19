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
} from 'native-base';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import Header from '../../components/Header';
import ServiceStylers from './ServiceStylers';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        this.props.sortStylersService(value, this.props.serviceId);
        this.setState({
            selected: index
        })
    }

    render() {
        const { showList } = this.state;
        const { navigation } = this.props;
        const service = navigation.getParam('service', '');
        const options = ['Rating', 'Location', 'Price'];
        return (
            <SafeAreaView style={{ flex: 1, }}>
                    {this.state.showList && <View style={{ position: "absolute", right: 10, top: 125, zIndex: 1000, elevation: 5, }}>
                        <Card style={styles.cardStyle}>
                            <RadioGroup
                                size={15}
                                thickness={2}
                                color='#606060'
                                // selectedIndex={1}
                                onSelect={(index, value) => this.selectListItem(index, value)}
                            >
                                {options.map((option, i) =>
                                    <RadioButton
                                        key={i}
                                        style={{ margin: 3, padding: 1, paddingHorizontal: 5, }}
                                        value={option.toLowerCase()} >
                                        <Text style={{ fontSize: 12, fontFamily: fonts.bold }}>{option}</Text>
                                    </RadioButton>)}
                            </RadioGroup>
                        </Card>
                    </View>}
                <View style={styles.container}>
                    <View style={{ elevation: 5 }}>
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
        flex: 1,
        padding: 20,
    }
})

export default Services;