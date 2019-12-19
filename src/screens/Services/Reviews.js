import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Card,
    CardItem,
    Body,
} from 'native-base';
import { fonts, colors } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { Rating, AirbnbRating } from 'react-native-ratings';
import moment from 'moment';

export default function (props) {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: 18 }}>Reviews</Text>
            {!props.styler__data.review.length ? <Text style={{ fontSize: 12, color: '#bbb' }}>No Reviews yet!</Text> : <Card style={styles.cardStyle}>
                <CardItem>
                    <Body>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontFamily: fonts.bold, fontSize: 15 }}>{props.styler__data.review[0].userId.name}</Text>
                            <Text style={{ paddingLeft: 10, fontSize: 10, color: "#979797", marginTop: 4, }}>{moment(props.styler__data.review[0].CreatedAt).fromNow()}</Text>
                        </View>
                        <View style={{ marginVertical: 7, flexDirection: "row", }}>
                            <Rating
                                type='star'
                                ratingCount={3}
                                imageSize={14}
                                showRating={false}
                                onFinishRating={this.ratingCompleted}
                            />
                        </View>
                        <Text style={{ fontFamily: fonts.medium, fontSize: 12 }}>{props.styler__data.review[0].message}</Text>
                        <Text style={{ alignSelf: "flex-end", fontSize: 11, fontStyle: "italic", color: "#1E1C95", }}>All Reviews</Text>
                    </Body>
                </CardItem>
            </Card>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        paddingRight: 12,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 10,
    },
    Input___shadow: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
    date__card: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
})