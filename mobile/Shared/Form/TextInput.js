import React, { useRef } from 'react'
import { TextInput as TextField, StyleSheet, View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const TextInput = ({ style, errorText, touched, ...props }) => {
    const input = useRef();
    return (
        <>
            <View style={[styles.containerText, style, (errorText && touched) ? styles.errorColor : {}]} onPress={() => console.log("Asdad")}>
                {props?.icon}
                <TextField
                    ref={input}
                    {...props}
                    autoCapitalize='words'
                    style={[styles.input, style]}
                    cursorColor={'black'}
                    placeholder={props.placeholder}
                />
            </View>
            {(errorText && touched) ? <Text style={styles.error}>{errorText}</Text> : null}
        </>
    )
}

const styles = StyleSheet.create({
    containerText: {
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        // width: '100%',
        height: 50,
        backgroundColor: 'white',
        // margin: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        // padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#67729D'
    },
    input: {
        marginLeft: 4,
        width: '90%',
        fontSize: 16,
        height: '100%'
    },
    error: {
        fontSize: 10,
        marginTop: -5,
        color: '#EE4266',
        paddingHorizontal: 7,
        marginBottom: 5,
        // textTransform: ''
    },
    errorColor: {
        borderColor: '#EE4266'
    }
})

export default TextInput