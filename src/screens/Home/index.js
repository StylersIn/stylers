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
import AsyncStorage from '@react-native-community/async-storage';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.props.socket.on('appointment.accepted', () => {
        //     notify('Appointment Accepted', 'Styler has accepted your appointment');
        // })
    }

    componentDidMount() {
        const { user: { oneSignalId }, } = this.props;
        if (!oneSignalId) {
            AsyncStorage.getItem('oneSignalUserId', (err, Id) => {
                if (Id) {
                    this.props.updateOneSignal({ oneSignalUserId: Id });
                }
            })
        }
        return this.props.updateOneSignal({ oneSignalUserId: oneSignalId });
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