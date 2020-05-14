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

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            toast: false,
            toastMsg: '',
            toastType: '',
            userData: undefined,
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(prevProps) {

    }

    render() {
        const { styler } = this.props;
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Header
                            close={true}
                            title={'All Reviews'}
                        />
                        <View style={{ alignItems: 'center', padding: 30, }}>
                            {!styler.review.length ?
                                <Text style={{ fontSize: 12, color: '#bbb' }}>No Reviews yet!</Text> : styler.review.map((review, i) => <Card key={i} style={styles.cardStyle}>
                                    <CardItem>
                                        <Body>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ fontFamily: fonts.bold, fontSize: 15 }}>{review.name}</Text>
                                                <Text style={{ paddingLeft: 10, fontSize: 8, color: "#979797", marginTop: 6, fontStyle: 'italic', }}>{moment(review.CreatedAt).fromNow()}</Text>
                                            </View>
                                            <View style={{ marginVertical: 7, flexDirection: "row", }}>
                                                <AirbnbRating
                                                    count={5}
                                                    starStyle={{ tintColor: colors.warning, margin: 1, }}
                                                    showRating={false}
                                                    size={10}
                                                />
                                            </View>
                                            <Text style={{ fontFamily: fonts.medium, fontSize: 10 }}>{review.message}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>)}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // justifyContent: "center",
    },
    card_shadow: {
        // marginTop: 50,
        width: '100%',
        // height: 200,
        borderWidth: 1,
        borderRadius: 30 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    map_btn_icon: {
        borderRadius: 65 / 2,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const mapStateToProps = state => ({
    user: state.user,
    styler: state.styler,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);