import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import {
    Card,
    CardItem,
    Body,
    Left,
    Icon,
} from 'native-base';
import Button from '../../components/Button';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { BarberIcon } from './ServiceAssets';
import service__1 from '../../../assets/imgs/service__1.jpeg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Loader from '../../components/Loader';
import { EmptyAppointment } from '../Appointments/AppointmentAssets';
import { getRating } from '../../utils/stylersUtils';

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
                {!isProcessing ? <ScrollView>
                    {stylers.length ? <Text style={{ fontFamily: fonts.bold }}>Top Rated</Text> : null}
                    {stylers && stylers.map((item, i) => <TouchableWithoutFeedback key={i} onPress={() => props.navigation.navigate('ServiceDetails', { styler: item })}>
                        <Card>
                            <CardItem>
                                <Left>
                                    {item.userId.imageUrl ? <Image
                                        style={{ width: 80, height: 80, borderRadius: 5, }}
                                        source={item.userId.imageUrl ? { uri: item.userId.imageUrl } : service__1}
                                    /> : null}
                                    {!item.userId.imageUrl && <View style={styles.no_avatar}>
                                        <Text style={{ fontFamily: fonts.bold, fontSize: 25 }}>{item.name[0]}</Text>
                                    </View>}
                                </Left>
                                <Body style={{ position: "relative", right: 0, flexDirection: 'column', justifyContent: 'space-evenly', }}>
                                    <View>
                                        <Text style={{ fontFamily: fonts.bold }}>{item.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, marginTop: 5, }}>{item.address}</Text>
                                        <Text style={{ fontSize: 10, }}>Starts at {`NGN${item.startingPrice}`} </Text>
                                    </View>
                                    <View style={{ marginTop: 12, flexDirection: "row" }}>
                                        {/* {[0, 1, 2, 3, 4].map((e, n) => <Icon key={n} name='ios-star' style={{ color: colors.warning, fontSize: 13, }} />)} */}
                                        <AirbnbRating
                                            count={getRating(item.ratings)}
                                            starStyle={{ tintColor: colors.warning, margin: 1, }}
                                            reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                                            // defaultRating={5}
                                            showRating={false}
                                            size={10}
                                        />
                                        {/* <Rating
                                        type='star'
                                        ratingCount={2.5}
                                        imageSize={12}
                                        showRating={true}
                                    // onFinishRating={this.ratingCompleted}
                                    /> */}
                                        {/* <AirbnbRating
                                        count={5}
                                        reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                                        size={20}
                                    /> */}
                                        <Text style={[{ fontSize: 8, marginTop: 2, }, getRating(item.ratings) == 0 ? { marginLeft: 0 } : { marginLeft: 7 }]}>{item.review.length} <Text style={{ fontSize: 8, marginTop: 2, }}>Reviews</Text> </Text>
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
                        </Card>
                    </TouchableWithoutFeedback>)}
                </ScrollView> : Loader()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    no_avatar: {
        width: 80,
        height: 80,
        borderRadius: 5,
        backgroundColor: colors.pink,
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})