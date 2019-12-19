import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actionAcreators from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fonts, colors, imgUrl } from '../../constants/DefaultProps';
import Text from '../../config/AppText';
import { FlatList } from 'react-native-gesture-handler';
import { AppointmentIcon } from '../../navigation/assets';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Button from '../../components/Button';

const propTypes = {
    onSelect: PropTypes.func,
}

class MyServices extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    componentDidMount() {
        this.props.listService();
    }

    render() {
        const _keyExtractor = (item, index) => item.name;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={styles.container}>
                        <Header
                            hamburger={true}
                            title={"My Services"}
                            action={<Text style={{ fontFamily: fonts.bold, color: colors.pink, }}>EDIT</Text>}
                        />
                        <View style={styles.child__container}>
                            {/* <Text style={{ fontFamily: fonts.bold, fontSize: 18, }}>By Service</Text> */}
                            <View style={styles.grid__main}>
                                <FlatList
                                    data={this.props.service__list && this.props.service__list.credentials.message}
                                    numColumns={2}
                                    columnWrapperStyle={{ flex: 1, justifyContent: 'space-around', }}
                                    keyExtractor={_keyExtractor}
                                    renderItem={({ item }) =>
                                        <View style={{ flex: 1 / 2, margin: 5, marginBottom: -8 }}>
                                            <TouchableOpacity
                                                onLongPress={() => alert('haa!')}
                                                // onPress={() => this.props.onSelect(item)}
                                                activeOpacity={0.7}>
                                                <Image
                                                    style={[styles.img]}
                                                    source={{ uri: item.imageUrl || imgUrl }} />
                                                <View style={[styles.overlay]} />
                                                <View style={{ position: "relative", bottom: "50%" }}>
                                                    <Text style={styles.overlayTxtMain}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Button
                                onPress={() => this.props.navigation.navigate('StylerService')}
                                btnTxt={"Add New Service"}
                                size={"lg"}
                                btnTxtStyles={{ color: colors.white, fontFamily: fonts.bold }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    child__container: {
        // flex: 1,
        marginTop: 10,
    },
    grid__main: {
        marginTop: 10,
    },
    grid__child: {
        // flexDirection: "row",
        marginTop: -8,
        // justifyContent: "space-between",
    },
    img: {
        width: "100%",
        height: 100,
        borderRadius: 5,
        resizeMode: "cover",
    },
    overlayTxtMain: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white,
        textAlign: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: 100,
        // marginLeft: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
    }
})

const mapStateToProps = state => ({
    service__list: state.service.services,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyServices);