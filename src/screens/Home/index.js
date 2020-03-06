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
import OneSignal from 'react-native-onesignal';
import { updateProfile } from '../../actions/UserActions';
import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.socket.on('appointment.accepted', () => {
            notify('Appointment Accepted', 'Styler has accepted your appointment');
        })
    }

    componentDidMount() {
        AsyncStorage.getItem('oneSignalUserId', (err, Id) => {
            alert(Id)
            if (Id) {
                this.props.updateProfile({ oneSignalUserId: Id });
            }
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