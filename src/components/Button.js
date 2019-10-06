import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types'
import {
    Button,
} from 'native-base';
import Text from '../config/AppText';
import { fonts } from '../constants/DefaultProps';

const propTypes = ({
    btnTxt: PropTypes.string,
    Icon: PropTypes.element,
    size: PropTypes.string,
    btnTxtStyles: PropTypes.object,
})

const CustomButton = ({ btnTxt, Icon, size = "lg", styles, btnTxtStyles, onPress, }) => {
    const mainStyles = [{
        width: size === 'sm' ? 103 : "100%",
        height: size === 'sm' ? 36 : 48,
        backgroundColor: '#000000',
        borderRadius: 5,
        justifyContent: "center",
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
            style={mainStyles}
            onPress={() => onPress()}
        // full={size = "lg" ? true : false}
        >
            {Icon ? Icon : null}
            {btnTxt ? <Text style={txtStyles, btnTxtStyles}>{btnTxt}</Text> : null}
        </Button>
    )
}

Button.propTypes = propTypes;
export default CustomButton;