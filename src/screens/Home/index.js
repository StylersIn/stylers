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
import { Card, CardItem, Icon } from 'native-base';
import { colors, fonts } from '../../constants/DefaultProps';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.props.socket.on('appointment.accepted', () => {
        //     notify('Appointment Accepted', 'Styler has accepted your appointment');
        // })
    }

    componentDidMount() {
        // const { user: { oneSignalId }, } = this.props;
        // if (!oneSignalId) {
        //     AsyncStorage.getItem('oneSignalUserId', (err, Id) => {
        //         if (Id) {
        //             this.props.updateOneSignal({ oneSignalUserId: Id });
        //         }
        //     })
        // }
        // return this.props.updateOneSignal({ oneSignalUserId: oneSignalId });
        AsyncStorage.getItem('oneSignalUserId', (err, Id) => {
            if (Id) {
                this.props.updateOneSignal({ oneSignalUserId: Id });
            }
        })
    }

    handleClick = () => {
        alert('Hi there!!');
    }

    // showNotification = (appointments) => {
    //     const {
    //         current: { publicId, }
    //     } = this.props;
    //     let newAppoinments = appointments.filter(e => e.status == (constants.BOOKED) && e.userId.publicId == publicId && e.seen == false).length;
    //     if (newAppoinments > 0) {
    //         setTimeout(() => {
    //             this.setState({ notify: undefined, })
    //         }, 5000);
    //         return (
    //             <Card style={styles.Input___shadow}>
    //                 <CardItem style={{ borderRadius: 4, backgroundColor: colors.pink, flexDirection: 'row', }}>
    //                     <View>
    //                         <Icon style={{ color: colors.white, }} name='ios-add' />
    //                     </View>
    //                     <View>
    //                         <Text style={{ color: colors.white, fontFamily: fonts.bold, fontSize: 18, }}>{`New Appointments`}</Text>
    //                         <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{`You have ${newAppoinments} new appointment(s)`}</Text>
    //                     </View>
    //                 </CardItem>
    //             </Card>
    //         )
    //     }
    // }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* {notify && requests && this.showNotification(requests || {})} */}
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