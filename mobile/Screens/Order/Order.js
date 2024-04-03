import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, Text, Dimensions, Image, ScrollView } from 'react-native'
import SyncStorage from 'sync-storage'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import baseURL from '../../assets/common/baseUrl'
import Container from '../../Shared/Container'
import { Button, View } from 'native-base'
import { Badge, ButtonGroup } from 'react-native-elements'
import { totalItemPrice } from '../../utils/computations'

const status = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
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

const Order = ({ navigation }) => {

    const [orders, setOrders] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const userJson = SyncStorage.get('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const getAllOrders = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/order?user=${user._id}&status=${status[selectedIndex]}`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                setOrders(data.orders)
            } else {
                // setLoading(false)
            }
        } catch (err) {
            console.log(err)
            // Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllOrders()
        }, [selectedIndex])
    )
    console.log(orders)

    return (
        <Container style={styles.container}>
            <ButtonGroup
                buttons={status}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    console.log(value)
                    setSelectedIndex(value);
                }}
                containerStyle={styles.buttonsStyle}
                textStyle={{ fontSize: 12 }}
            />
            {orders?.length > 0 ?
                <>
                    {orders?.map(order => (
                        <View style={styles.cardContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>ID: 109821903099a2344320809</Text>
                                <Badge status={getStatus(order.orderStatus)} value={order.orderStatus} />
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {order?.orderItems?.map(item => (
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginRight: 10 }}>
                                        <Image style={styles.image} source={{ uri: 'https://img.ws.mms.shopee.ph/0686b630fd91d124b7d737fd21dcea2b' }} />
                                        <View>
                                            <Text>{item?.product?.name}</Text>
                                            <Text>{item?.quantity}x</Text>
                                            {/* {console.log(item.size)} */}
                                            <Text>P{totalItemPrice(item?.quantity, item.size, item?.product?.price)}</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Payment: {getMOP(order?.paymentMethod)}</Text>
                                <Text>Total: P{totalPrice(order?.orderItems)}</Text>
                            </View>
                            {status[selectedIndex] === 'Pending' ?
                                <Button variant={'outline'} borderColor={'danger.500'} colorScheme={'danger'}>Cancel</Button>
                                :
                                status[selectedIndex] === 'Cancelled' ?
                                    <Button variant={'outline'} borderColor={'danger.500'} colorScheme={'danger'}>Remove</Button> :
                                    status[selectedIndex] === 'Delivered' ?
                                        <Button variant={'outline'} borderColor={'danger.500'} colorScheme={'danger'}>Remove</Button> :
                                        ""}
                        </View>
                    ))}
                </> :
                <Text style={{ textAlign: 'center', marginVertical: 10 }}> No {status[selectedIndex]} Orders Available </Text>
            }
        </Container>
    )
}

const totalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((accumulator, item) => {
        console.log(item);
        return accumulator + totalItemPrice(item.quantity, item.size, item.product.price);
    }, 0);

    return totalPrice;
}

const getStatus = (value) => {
    switch (value) {
        case "Pending":
            return "warning"
        case "Confirmed":
            return "success"
        case "Shipped":
            return "primary"
        case "Delivered":
            return "success"
        case "Cancelled":
            return "error"
        default:
            return "primary"
    }
}



const styles = StyleSheet.create({
    buttonsStyle: {
        marginVertical: 10,
        marginHorizontal: 0,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 10,
    },
    cardContainer: {
        // height: 170,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        gap: 10,
        marginVertical: 10,
    },
    container: {
        padding: 10,
    }
})

export default Order