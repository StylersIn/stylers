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
import { Spinner, Icon } from 'native-base';
import NavigationService from '../../navigation/NavigationService';

const propTypes = {
    onSelect: PropTypes.func,
}

class MyServices extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <AppointmentIcon tintColor={"none"} />
        )
    }

    state = {
        fetching: true,
        processing: false,
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stylerServices && nextProps.stylerServices != this.props.stylerServices) {
            nextProps.stylerServices.map(e => this.props.servicePrice({ serviceId: e.serviceId, subServiceId: e.subServiceId, child: e.child, adult: e.adult, }));
        }
        if (nextProps.service__list && nextProps.service__list != this.props.service__list) {
            this.setState({ fetching: false, });
        }
        if (nextProps.updated && nextProps.updated != this.props.updated) {
            this.setState({ fetching: false });
            this.props.navigation.dispatch(NavigationService.resetAction('Requests'));
        }
    }

    componentDidMount() {
        this.props.listStylerServices();
        this.props.listService();
    }

    filterCheck = (item, price = []) => {
        return price.some(e => item._id === e.serviceId);
    }

    updateStyler = () => {
        this.setState({ processing: true });
        this.props.updateStyler({ services: this.props.price || [] });
    }

    render() {
        const _keyExtractor = (item, index) => item.name;
        const { fetching, processing } = this.state;
        const { price } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={styles.container}>
                        <View style={{ padding: 0, }}>
                            <Header
                                hamburger={true}
                                title={"My Services"}
                                action={<Text style={{ fontFamily: fonts.bold, color: colors.pink, }}>EDIT</Text>}
                            />
                        </View>

                        {fetching && <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Spinner color={colors.pink} />
                        </View>}

                        {this.props.service__list && this.props.service__list.map((item, i) => <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ServicePrice', { service: item, })}
                            activeOpacity={0.8}
                            key={i}
                            style={styles.serviceList}>
                            <Text style={{ color: colors.white, fontFamily: fonts.medium, }}>{item.name}</Text>
                            {/* <Icon style={{ color: colors.pink, }} name='ios-arrow-forward' /> */}
                            {this.filterCheck(item, price) && this.filterCheck(item, price) ?
                                <Icon style={{ color: colors.success, }} name='ios-checkmark-circle' /> : <Icon style={{ color: colors.pink, }} name='ios-arrow-forward' />}
                        </TouchableOpacity>)}

                        {this.props.service__list && <View style={{ marginVertical: 0, padding: 20 }}>
                            <Button
                                onPress={price ? () => this.updateStyler() : () => { }}
                                btnTxt={"Update"}
                                size={"lg"}
                                loading={processing}
                                styles={{ backgroundColor: !price ? colors.btnDisabled : colors.white, borderWidth: 1, borderColor: !price ? colors.btnDisabled : "#000000" }}
                                btnTxtStyles={!price ? { color: colors.white, } : { color: colors.black }, { fontFamily: fonts.bold }}
                            />
                        </View>}
                        {/* {this.props.stylerServices ? <>
                            <View style={styles.child__container}>
                                <View style={styles.grid__main}>
                                    <FlatList
                                        data={this.props.stylerServices}
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
                                                        source={{ uri: item.serviceId.imageUrl || imgUrl }} />
                                                    <View style={[styles.overlay]} />
                                                    <View style={{ position: "relative", bottom: "50%" }}>
                                                        <Text style={styles.overlayTxtMain}>{item.serviceId.name}</Text>
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
                        </> : <View style={{ flex: 1, }}>
                                <Spinner size={80} color={colors.pink} />
                            </View>} */}
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
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
    },
    serviceList: {
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.black,
        marginBottom: 1,
    },
})

const mapStateToProps = state => ({
    service__list: state.service.services,
    stylerServices: state.styler.stylerServices,
    price: state.styler.servicePrice,
    updated: state.styler.updated,
})

const mapDispatchToProps = dispatch => bindActionCreators(actionAcreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyServices);