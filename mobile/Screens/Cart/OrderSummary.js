import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Alert, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import { Box, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { totalItemPrice } from '../../utils/computations';
import SyncStorage from 'sync-storage'
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import ToastEmmitter from '../../Shared/ToastEmmitter';
import WanderLoader from '../../Shared/Loader/WanderLoader';
import { CLEAR_CART } from '../../Redux/Constants/cartConstants';

const { width } = Dimensions.get('window')
const imgInfo = 'https://cdn-icons-png.flaticon.com/512/3081/3081648.png'

export default function OrderSummary({ route }) {

    const navigation = useNavigation()
    const { cartItems } = useSelector(state => state.cart);
    const values = route.params;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const placeOrder = async ({ values, token }) => {
        try {

            const config = {
                headers: {
                    'Authorization': token
                }
            }

            const { data } = await axios.post(`${baseURL}/order`, { data: JSON.stringify(values) }, config)

            if (data.success) {
                setLoading(false)
                SyncStorage.remove('cartItems');
                dispatch({
                    type: CLEAR_CART,
                    payload: []
                })
                navigation.navigate('Success')

            } else {
                setLoading(false)
                ToastEmmitter.error('Please try again later')
            }

        } catch (err) {
            console.log(err);
            setLoading(false)
            ToastEmmitter.error('Please try again later')
        }
    }

    const handleSubmit = () => {

        setLoading(true)

        const orderItems = cartItems.map(item => {
            return {
                quantity: item.quantity,
                color: item.color,
                size: item.size,
                product: item.product._id,
            }
        })

        values.orderItems = orderItems;
        values.totalPrice = totalPrice(cartItems);

        const token = SyncStorage.get('token')
        placeOrder({ token, values })
    }

    return (
        <>
            {loading ? <WanderLoader loadingText={'Processing order...'} /> :
                <Box safeArea style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image style={styles.imageInfo} source={{ uri: imgInfo }} />
                        <Text style={[styles.title, { fontWeight: 900 }]}>Order Summary</Text>
                        {cartItems?.map((item, i) => (
                            <View key={i + item?.product?._id} style={[styles.cardContainer, { marginBottom: 20 }]}>
                                <Image style={styles.cardMedia} source={{ uri: sampleImg }} />
                                <View style={styles.cardBody}>
                                    <Text style={[styles.productName, { fontWeight: 600 }]}>{item.product.name}</Text>
                                    <Text style={{ color: '#45474BE1', fontSize: 12 }}>Size: {item.size}</Text>
                                    <Text style={{ color: '#45474BE1', fontSize: 12, textTransform: 'capitalize' }}>Color: {item.color.name}</Text>
                                    <Text style={{ color: '#45474BE1', fontSize: 12 }}>Price: ₱{totalItemPrice(1, item.size, item.product.price)}</Text>
                                    <Text style={{ color: '#45474BE1', fontSize: 12 }}>Quantity: {item.quantity}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 600, textAlign: 'right', marginTop: -10, position: 'absolute', bottom: 10, right: 10 }}>₱{totalItemPrice(item.quantity, item.size, item.product.price)}</Text>
                                </View>
                            </View>
                        ))}
                        <Divider style={{ marginBottom: 5, borderBottomWidth: 1 }} />
                        <View style={styles.containerTotal}>
                            <View style={styles.statusTotal}>
                                <Text style={[styles.textStatus, { fontWeight: 700 }]}>
                                    TOTAL:<Text style={styles.highlightText}> ₱{totalPrice(cartItems)}</Text>
                                </Text>
                                <Text style={[styles.textStatus, { fontWeight: 700 }]}>
                                    STATUS:<Text style={[styles.highlightText, { color: '#C07F00' }]}> PENDING</Text>
                                </Text>
                            </View>
                            <View style={styles.otherInfo}>
                                <Image style={styles.imgIcons} source={{ uri: deliverImg }} />
                                <View>
                                    <Text style={[styles.textStatus, { fontWeight: 700 }]}>DELIVER TO</Text>
                                    <Text style={[{ fontWeight: 700, textTransform: 'capitalize', width: '70%' }, styles.highlightText]}>{values?.shippingInfo?.address}</Text>
                                </View>
                            </View>
                            <View style={styles.otherInfo}>
                                <Image style={styles.imgIcons} source={{ uri: mopImg }} />
                                <View>
                                    <Text style={[styles.textStatus, { fontWeight: 700 }]}>Mode of Payment</Text>
                                    <Text style={[{ fontWeight: 700, }, styles.highlightText]}>{getMOP(values.paymentMethod)}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[styles.actionContainer, { position: 'absolute', bottom: 0, left: '3%', backgroundColor: '#FED9ED', paddingTop: 20 }]}>
                        <Button onPress={handleSubmit} colorScheme='mycustom' style={{ width: '100%' }}>Place Order</Button>
                        <Button borderColor={'#67729D'} variant={'outline'} colorScheme='mycustom' onPress={() => navigation.goBack()} style={{ width: '100%' }}>Back</Button>
                    </View>
                </Box>
            }
        </>
    )
}

const totalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((accumulator, item) => {
        return accumulator + totalItemPrice(item.quantity, item.size, item.product.price);
    }, 0);

    return totalPrice;
}

const getMOP = (value) => {
    switch (value) {
        case 'cod':
            return 'Cash on Delivery'
        case 'paypal':
            return 'Paypal'
        case 'gcash':
            return 'GCash'
    }
}
const sampleImg = 'https://law.jmc.edu.ph/wp-content/uploads/2019/01/tshirt-2.jpg'
const deliverImg = 'https://static.vecteezy.com/system/resources/previews/012/665/408/original/delivery-and-courier-motorbike-logo-free-vector.jpg'
const mopImg = 'https://as1.ftcdn.net/v2/jpg/02/32/39/02/1000_F_232390255_JEZsOtdmqMhrQcEQraYholH92UeHyqB7.jpg'

const styles = StyleSheet.create({
    textStatus: {
        color: '#45474B90'
    },
    highlightText: {
        color: '#45474B'
    },
    otherInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    imgIcons: {
        width: 40,
        height: 40,
        borderRadius: 10
    },
    statusTotal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerTotal: {
        marginBottom: 90,
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 15
    },
    cardBody: {
        height: '100%',
        width: '55%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        marginTop: 8
    },
    productName: {
        fontSize: 14
    },
    cardMedia: {
        width: '40%',
        height: '100%',
        borderRadius: 20,
    },
    cardContainer: {
        width: '100%',
        height: 130,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#E7BCDE',
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        gap: 10
    },
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
        marginTop: 30
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        marginVertical: 20,
        color: '#67729D',
    },
    imageInfo: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})