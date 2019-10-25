import React from 'react';
import { 
    View,
 } from 'react-native';
import { Spinner, } from 'native-base';

export default function () {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Spinner />
        </View>
    )
}