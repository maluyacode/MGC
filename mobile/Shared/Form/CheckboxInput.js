import { HStack } from 'native-base';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';;

const CheckboxGroup = ({
    containerStyle,
    options,
    selectedOptions,
    onSelect
}) => {
    return (
        <HStack w={'100%'} style={containerStyle}>
            {options.map(option => (
                <CheckBox
                    key={option.value}
                    title={option.label}
                    checked={selectedOptions.includes(option.value)}
                    onPress={() => onSelect(option.value)}
                    containerStyle={{
                        padding: 0,
                        backgroundColor: 'transparent',
                        margin: 0,
                        borderWidth: 0,
                        width: 'auto',
                        // marginLeft: -0.5
                    }}
                    textStyle={{ marginLeft: -1, marginTop: -2 }}
                />
            ))}
        </HStack>
    );
};

export default CheckboxGroup