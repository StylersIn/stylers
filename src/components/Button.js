import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types'
import {
    Button, Spinner,
} from 'native-base';
import Text from '../config/AppText';
import { fonts, colors } from '../constants/DefaultProps';

const propTypes = ({
    btnTxt: PropTypes.string,
    Icon: PropTypes.element,
    size: PropTypes.string,
    btnTxtStyles: PropTypes.object,
    onPress: PropTypes.func,
    loading: PropTypes.bool,
})

const CustomButton = ({ btnTxt, Icon, size = "lg", styles, btnTxtStyles, onPress, loading, disabled, }) => {
    const mainStyles = [{
        width: size === 'sm' ? 103 : "100%",
        height: size === 'sm' ? 36 : 48,
        backgroundColor: '#000000',
        borderRadius: 5,
        justifyContent: "center"
    }];

    const txtStyles = {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: fonts.bold,
    }

    if (styles) {
        if (Array.isArray(styles)) {
            mainStyles = mainStyles.concat(styles)
        } else {
            mainStyles.push(styles)
        }
    }
    return (
        <Button
            light
            disabled={loading || disabled ? true : false}
            style={[mainStyles, disabled ? { backgroundColor: colors.btnDisabled } : null]}
            onPress={() => onPress()}
        >
            {Icon ? <View style={{ paddingHorizontal: 10, }}>{Icon}</View> : null}
            {btnTxt && !loading ? <Text style={txtStyles, btnTxtStyles}>{btnTxt}</Text> : null}
            {loading ? <Spinner color={colors.info} size="large" /> : null}
        </Button>
    )
}

Button.propTypes = propTypes;
export default CustomButton;