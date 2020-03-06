import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ScrollView,
} from "react-native";
import {
    Item,
    Input,
    InputGroup,
    Icon,
    Card,
    CardItem,
    List,
    Spinner
} from "native-base";
import Text from '../../config/AppText';
import PropTypes from 'prop-types';
import { fonts } from "../../constants/DefaultProps";
import { colors } from "../../constants/DefaultProps";
import Button from '../../components/Button';
import NavigationService from "../../navigation/NavigationService";

const { width, height, } = Dimensions.get('window');
const propTypes = {
    // toggleSearchModal: PropTypes.func.isRequired,
    getAddressPredictions: PropTypes.func.isRequired,
    getInputData: PropTypes.func.isRequired,
    // inputData: PropTypes.object.isRequired,
}

const truncateLength = 28;
const MapSearch = ({
    getAddressPredictions,
    getInputData,
    inputData,
    searching,
    predictions,
    error,
    getSelectedAddress,
    selectedAddress,
    clearInputData,
}) => {
    function handleSelectedAddress(placeID) {
        getSelectedAddress(placeID)
    }
    function handleSearch(val) {
        getInputData({
            value: val
        });
        getAddressPredictions();
    }
    _keyExtractor = (item, index) => item.name;
    return (
        <View style={styles.searchBox}>
            <View style={{ marginTop: 20, padding: 15 }}>
                <Card style={[{ padding: 20 }, styles.cardShadow]}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 0, padding: 10 }}>
                            <View style={styles.locationCircle}>
                                <View style={styles.locationCircleSub}></View>
                            </View>
                            <View style={{ marginLeft: 2.5, }}>
                                <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                                <Text style={{ lineHeight: 5, color: "#D1D2D2" }}>.</Text>
                            </View>
                            <View>
                                <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 22, color: "#000000", marginLeft: -1.5 }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 10, marginLeft: 0, }}>
                            <View style={{ marginTop: 0 }}>
                                <Item style={[{ backgroundColor: "#F7F7F7", height: 40, }, styles.cardShadow]} rounded>
                                    <Input
                                        style={styles.input}
                                        onChangeText={handleSearch.bind(this)}
                                        placeholder={'Select Location'}
                                        placeholderTextColor='#9BABB4'
                                        autoFocus={false}
                                        value={!inputData && selectedAddress ? selectedAddress.name : inputData}
                                    />
                                    {/* {inputData && inputData.length > 0 && <TouchableOpacity onPress={() => clearInputData()}>
                                        <Icon style={{ color: colors.gray, fontSize: 30, marginRight: 5, }} type='Ionicons' name='ios-close' />
                                    </TouchableOpacity>} */}
                                    {searching && <View style={{ marginRight: 10, }}>
                                        <Spinner style={{ fontSize: 10, }} size='small' />
                                    </View>}
                                </Item>
                            </View>
                        </View>
                    </View>

                    <View style={predictions && predictions.length && styles.predictions}>
                        {error && !searching && <View style={{ width: "90%", marginTop: 30, alignItems: "center", padding: 20, flexDirection: "row" }}>
                            <Icon type='Ionicons' name='ios-information-circle-outline' />
                            <Text style={{ paddingLeft: 20 }}>{error}</Text>
                        </View>}

                        {predictions && <View style={styles.searchResultsWrapper}>
                            <List
                                dataArray={predictions}
                                keyExtractor={(item, index) => index.toString()}
                                renderRow={(item) =>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => handleSelectedAddress(item.placeID)}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', marginTop: 2, padding: 20, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Icon style={{ fontSize: 20, color: colors.pink }} name='ios-pin' />
                                            <View style={{ paddingLeft: 30, paddingRight: 10 }}>
                                                <Text style={styles.primaryText}>{item.primaryText}</Text>
                                                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                            </View>
                                        </View>
                                        {/* <View>
                                            <Icon style={{ color: colors.yellow, fontSize: 20, }} name='ios-heart' />
                                        </View> */}
                                    </TouchableOpacity>
                                }
                            />
                        </View>}

                        {selectedAddress && <View style={{ padding: 10, flex: 1, justifyContent: 'flex-end' }}>
                            <Button
                                onPress={() => NavigationService.goBack()}
                                btnTxt={"Confirm"}
                                styles={{ backgroundColor: colors.black, borderRadius: 50, width: '60%', height: 40, alignSelf: 'center', }}
                                btnTxtStyles={{ color: '#ffffff', fontFamily: fonts.bold }}
                            />
                        </View>}
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
    input: {
        fontFamily: fonts.medium,
        fontSize: 12,
        marginLeft: 5,
        color: colors.black,
    },
    cardShadow: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        // shadowRadius: 2,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    searchBox: {
        bottom: 50,
        position: "absolute",
        width: width
    },
    locationCircle: {
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        marginLeft: -1.8,
        borderWidth: 1,
        borderColor: colors.pink,
        alignItems: "center",
        justifyContent: "center"
    },
    locationCircleSub: {
        height: 6,
        width: 6,
        borderRadius: 6 / 2,
        borderWidth: 1,
        borderColor: colors.pink,
        backgroundColor: colors.pink
    },
    primaryText: {
        fontFamily: fonts.bold,
        color: '#222B2F',
        fontSize: 13,
        marginBottom: 3
    },
    secondaryText: {
        color: '#9BABB4',
        fontSize: 11,
    },
    predictions:{
        height:300
    }
})

MapSearch.propTypes = propTypes;
export default MapSearch;