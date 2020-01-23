import React from 'react';
import {
    View,
    Image,
} from 'react-native';
import {
    Card,
    CardItem,
    Body,
    Left,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { BarberIcon } from './ServiceAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Loader from '../../components/Loader';
import { EmptyAppointment } from '../Appointments/AppointmentAssets';

export default ServiceStylers = (props) => {
    const {
        stylers,
        isProcessing,
    } = props;
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, }}>
                {!props.isProcessing && stylers.length === 0 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <EmptyAppointment />
                    <Text style={{ fontSize: 20, paddingVertical: 40, fontFamily: fonts.medium, }}>No stylers found</Text>
                </View>}
                {!isProcessing? <View style={{ marginTop: 20, }}>
                    {stylers.length ? <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text> : null}
                    {stylers && stylers.map((item, i) => <Card key={i}>
                        <CardItem>
                            <Left>
                                <Image
                                    style={{ width: 80, height: 80, borderRadius: 5, }}
                                    source={item.userId.imageUrl ? { uri: item.userId.imageUrl } : service__1}
                                />
                            </Left>
                            <Body style={{ position: "relative", right: 10, }}>
                                <Text style={{ fontFamily: fonts.bold }}>{item.name}</Text>
                                <Text style={{ fontSize: 10, marginTop: 10, }}>{item.address}</Text>
                                <Text style={{ fontSize: 10, }}>Starts at {`NGN${item.startingPrice}`} </Text>
                                <View style={{ marginTop: 7, flexDirection: "row" }}>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        imageSize={12}
                                        showRating={false}
                                    // onFinishRating={this.ratingCompleted}
                                    />
                                    <Text style={{ fontSize: 10, marginLeft: 7, }}>6 <Text style={{ fontSize: 10, }}>Reviews</Text> </Text>
                                </View>
                            </Body>
                            <View style={{ flexDirection: "column", justifyContent: "space-between", position: "relative", left: 10, }}>
                                <View style={{ alignSelf: "flex-end" }}>
                                    <BarberIcon />
                                </View>
                                <View style={{ marginTop: "30%" }}>
                                    <Button
                                        onPress={() => props.navigation.navigate('ServiceDetails', { styler: item })}
                                        btnTxt={"Place booking"}
                                        size={"sm"}
                                        btnTxtStyles={{ color: colors.white, fontSize: 10, fontFamily: fonts.bold, }}
                                        styles={{ height: 24 }}
                                    />
                                </View>
                            </View>
                        </CardItem>
                    </Card>)}
                </View> : Loader()}
            </View>
        </View>
    )
}