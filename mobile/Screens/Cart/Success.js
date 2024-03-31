import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Alert, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Box, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')
const imgInfo = 'https://cdn.dribbble.com/users/2572904/screenshots/17169793/media/ed801ffe0fbeb4b95ca246ba1f5ea398.gif'

export default function Success() {

    const navigation = useNavigation();

    return (
        <Box safeArea style={styles.container}>
            <Text style={[styles.title, { fontWeight: 900 }]}>Order Successfully Placed. Thank you for your purchase!</Text>
            <Image style={styles.imageInfo} source={{ uri: imgInfo }} />

            <View style={[styles.actionContainer, { position: 'absolute', bottom: 0, left: '3%', backgroundColor: '#FED9ED', paddingTop: 20 }]}>
                <Button onPress={() => console.log('Goto my orders')} colorScheme='mycustom' style={{ width: '100%' }}>My Orders</Button>
                <Button borderColor={'#67729D'} variant={'outline'} colorScheme='mycustom' onPress={() => navigation.navigate('Home')} style={{ width: '100%' }}>Home</Button>
            </View>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        width: width,
        backgroundColor: '#FED9ED',
        padding: 10,
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
        color: '#67729D',
        marginTop: 80,
    },
    imageInfo: {
        width: 320,
        height: 320,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})