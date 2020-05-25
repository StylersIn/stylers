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
    Card,
    CardItem,
    Body,
    Left,
    Spinner,
} from 'native-base';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import Header from '../../components/Header';
import RescheduleStylers from './RescheduleStylers';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Modal from '../../components/Modal';

class Reschedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selected: 0,
            isProcessing: true,
        }
    }

    componentDidMount() {
        const { navigation, location, } = this.props;
        const param = navigation.getParam('param', '');
        if (param) {
            this.props.getStylerWithException(param.service, param.styler, JSON.stringify([location.longitude, location.latitude]));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.props.data) {
            this.setState({ isProcessing: false });
        }
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    handleChange = () => {
        this.setState({ showList: !this.state.showList });
    }

    selectListItem = (index, value) => {
        const { serviceId, location, } = this.props;
        this.props.sortStylersService(
            value,
            serviceId,
            JSON.stringify([location.longitude, location.latitude])
        );
        this.setState({
            selected: index,
            // showList: false,
        })
    }

    render() {
        const { showList, selected, isProcessing, } = this.state;
        const { navigation, data, } = this.props;
        const param = navigation.getParam('param', '');
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {!isProcessing ? <View style={{ flex: 1, elevation: 5 }}>
                    <Header
                        close
                        search
                        title={data.service.name}
                        onChange={this.handleChange}
                    />
                    <View style={styles.container}>
                        <RescheduleStylers {...this.props} />
                    </View>
                </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <Spinner />
                    </View>}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    }
})

const mapStateToProps = state => ({
    location: state.user.location,
    data: state.styler.serviceStylers,
    message: state.styler.message,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reschedule);