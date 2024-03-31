import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Alert, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import { Box, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window')

const imgInfo = 'https://cdn-icons-png.freepik.com/512/7148/7148201.png'
const gcash = 'https://1000logos.net/wp-content/uploads/2023/05/GCash-Logo.png'
const paypal = 'https://pngimg.com/uploads/paypal/paypal_PNG25.png'
const cod = 'https://static-00.iconduck.com/assets.00/cash-on-delivery-icon-1024x345-7sgjf338.png'
export default function Payment({ route }) {

    const navigation = useNavigation()
    const shippingInfo = route.params;

    const [paymentMethod, setPaymentMethod] = useState(null);

    const handleSubmit = () => {
        if (!paymentMethod) {
            Alert.alert('Select Payment Method', 'Please choose a payment method.')
            return;
        }
        navigation.navigate('Summary', {
            paymentMethod,
            shippingInfo
        })
    }

    return (
        <Box safeArea style={styles.container}>
            <Image style={styles.imageInfo} source={{ uri: imgInfo }} />
            <Text style={[styles.title, { fontWeight: 900 }]}>Payment Info</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableNativeFeedback onPress={() => setPaymentMethod('gcash')}>
                    <View style={[styles.boxMethod, paymentMethod === 'gcash' ? { backgroundColor: '#BB9CC0' } : {}]}>
                        {paymentMethod === 'gcash' &&
                            <MaterialCommunityIcons style={styles.icon} name={'check-bold'} color={'green'} size={25} />
                        }
                        <Image style={styles.imageMethod} source={{ uri: gcash }} />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => setPaymentMethod('paypal')}>
                    <View style={[styles.boxMethod, paymentMethod === 'paypal' ? { backgroundColor: '#BB9CC0' } : {}]}>
                        {paymentMethod === 'paypal' &&
                            <MaterialCommunityIcons style={styles.icon} name={'check-bold'} color={'green'} size={25} />
                        }
                        <Image style={styles.imageMethod} source={{ uri: paypal }} />
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => setPaymentMethod('cod')}>
                    <View style={[styles.boxMethod, paymentMethod === 'cod' ? { backgroundColor: '#BB9CC0' } : {}]}>
                        {paymentMethod === 'cod' &&
                            <MaterialCommunityIcons style={styles.icon} name={'check-bold'} color={'green'} size={25} />
                        }
                        <Image style={styles.imageMethod} source={{ uri: cod }} />
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
            <View style={styles.actionContainer}>
                <Button onPress={() => handleSubmit()} colorScheme='mycustom' style={{ width: '100%' }}>Next</Button>
                <Button variant={'outline'} borderColor={'#67729D'} colorScheme='mycustom' onPress={() => navigation.goBack()} style={{ width: '100%' }}>Back</Button>
            </View>
        </Box>
    )
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 5,
        top: 5
    },
    imageMethod: {
        height: '80%',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    boxMethod: {
        marginVertical: 10,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 80,
        backgroundColor: '#E7BCDE',
        elevation: 5,
        borderRadius: 10
    },
    imageInfo: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        minHeight: '100%',
        width: width,
        backgroundColor: '#FED9ED',
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        marginVertical: 20,
        color: '#67729D',
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 30
    },
})