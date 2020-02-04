import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import ServiceList from './ServiceList';
import GenderList from './GenderList';
import Header from '../../components/Header';
import { Spinner } from 'native-base';
import { notify } from '../../services';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.socket.on('appointment.accepted', () => {
            notify('Appointment Accepted', 'Styler has accepted your appointment');
        })
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <ScrollView contentContainerStyle={{ flexGrow: 1, }}> */}
                <View style={styles.container}>
                    <Header
                        search={true}
                        hamburger={true}
                        title={"Browse Services"}
                    />
                    {/* <GenderList {...this.props} /> */}
                    <View style={{ flex: 1, padding: 20, }}>
                        <ServiceList {...this.props} />
                    </View>
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    }
})

export default Home;