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

const CustomButton = ({ btnTxt, Icon, size = "lg", styles, btnTxtStyles, }) => {
    const mainStyles = [{
        width: size === 'sm' ? 103 : 328,
        height: size === 'sm' ? 36 : 54,
        backgroundColor: '#000000',
        borderRadius: 5,
        justifyContent: "center",
    }];

    const txtStyles = {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: fonts.default,
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
        // full={size = "lg" ? true : false}
        >
            <Text style={txtStyles, btnTxtStyles}>{btnTxt}</Text>
        </Button>
    )
}

Button.propTypes = propTypes;
export default CustomButton;