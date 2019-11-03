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
import { colors, fonts } from '../../constants/DefaultProps';
import { ScrollView } from 'react-native-gesture-handler';

class Stylers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
    }

    handleSelect = (selected) => {
        this.setState((prevState) => {
            if (this.state.selected.findIndex(e => e.name === selected.name) === -1) {
                return {
                    selected: [selected, ...prevState.selected]
                }
            }
        })
    }

    removeSelected = (key) => {
        var temp = this.state.selected;
        temp.splice(key, 1);
        this.setState({ selected: temp });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Header
                        title={"My Services"}
                    />
                    <SelectedService
                        {...this.props}
                        selected={this.state.selected}
                        removeSelected={this.removeSelected}
                    />
                    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                        <ServiceList
                            {...this.props}
                            onSelect={this.handleSelect}
                        />

                        <View style={{ marginVertical: 20 }}>
                            <Button
                                onPress={() => this.props.navigation.navigate('Appointment')}
                                btnTxt={"Complete Sign Up"}
                                size={"lg"}
                                styles={{ backgroundColor: colors.white, borderWidth: 1, borderColor: "#000000" }}
                                btnTxtStyles={{ color: colors.black, fontFamily: fonts.bold }}
                            />
                        </View>
                    </ScrollView>
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

export default Stylers;