import React from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity, View } from 'react-native';

const Button = ({ mode, style, ...props }) => {
    const { onPress, title = 'Save' } = props;
    return (
        <TouchableOpacity {...props}>
            <View style={[styles.button, style]} >
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        // elevation: 3,
        backgroundColor: '#67729D',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Button