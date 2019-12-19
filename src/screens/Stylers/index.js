import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Header from '../../components/Header';
import SelectedService from './SelectedService';
import ServiceList from './ServiceList';
import Button from '../../components/Button';
import { colors, fonts, toastType } from '../../constants/DefaultProps';
import Modal from '../../components/Modal';
import { Item, Input } from 'native-base';
import ShowToast from '../../components/ShowToast';
import NavigationService from '../../navigation/NavigationService';

class Stylers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            current: {},
            isVisible: false,
            isProcessing: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.updated && nextProps.updated != this.props.updated) {
            this.setState({ isProcessing: false });
            this.props.navigation.dispatch(NavigationService.resetAction('Appointments'));
        }
        // if (this.props.error && this.props.error != this.props.styler.error) {
        //     this.showToast(`Error: ${nextProps.styler.error}`, toastType.danger);
        // }
    }

    showToast = (text, type) => {
        ShowToast(text, type);
        this.setState({ isProcessing: false });
    }

    handleSelect = (selected) => {
        this.setState({ isVisible: true, current: selected, });
    }

    removeSelected = (serviceId) => {
        this.props.removeStylerService(serviceId);
    }

    addServiceCategory = () => {
        this.props.updateStylerService({
            serviceId: this.state.current._id,
            name: this.state.current.name,
            imageUrl: this.state.current.imageUrl,
            adult: this.adult,
            child: this.child,
        });
        this.setState({ isVisible: false, });
    }

    updateStyler = () => {
        this.setState({ isProcessing: true });
        this.props.updateStyler({ services: this.props.stylerService || [] });
    }

    closeModal = () => this.setState({ isVisible: false, });

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={styles.container}>
                        <Header
                            title={"My Services"}
                        />
                        <SelectedService
                            selected={this.props.stylerService || []}
                            removeSelected={this.removeSelected}
                        />
                        <ServiceList
                            selected={this.props.stylerService || []}
                            service__list={this.props.service__list}
                            onSelect={this.handleSelect}
                        />
                        <View style={{ marginVertical: 0 }}>
                            <Button
                                onPress={this.updateStyler}
                                btnTxt={"Complete Sign Up"}
                                size={"lg"}
                                loading={this.state.isProcessing ? true : false}
                                styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                                btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                <Modal
                    closeModal={this.closeModal}
                    // hideCloseBtn={true}
                    isVisible={this.state.isVisible}
                >
                    <View style={{ paddingVertical: 20, }}>
                        <Item style={{ marginTop: 10, borderRadius: 5, height: 45, }} regular>
                            <Input
                                onChangeText={e => this.adult = e}
                                keyboardType='numeric'
                                autoCapitalize={'none'}
                                style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                placeholder='Adult Price' />
                        </Item>
                        <Item style={{ marginTop: 10, borderRadius: 5, height: 45, }} regular>
                            <Input
                                onChangeText={e => this.child = e}
                                keyboardType='numeric'
                                style={{ fontFamily: fonts.medium, fontSize: 13 }}
                                placeholder='Child Price' />
                        </Item>
                        <View style={{ marginTop: 10, width: '100%' }}>
                            <Button
                                onPress={this.addServiceCategory}
                                btnTxt={"Add"}
                                size={"lg"}
                                styles={{ height: 40, }}
                                btnTxtStyles={{ color: colors.white, fontSize: 12, fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
})

export default Stylers;