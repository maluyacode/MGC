import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import React, { Fragment, useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import ToastEmmitter from '../../../Shared/ToastEmmitter';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';
import SyncStorage from 'sync-storage'
import { Button, Divider } from 'native-base';
import { totalItemPrice } from '../../../utils/computations';
import WanderLoader from '../../../Shared/Loader/WanderLoader';

const { width } = Dimensions.get('window');

export default function OrderDetails({ route }) {

    const id = route.params;
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false)

    const getOrder = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/order/${id}`, {
                headers: {
                    "Authorization": SyncStorage.get('token'),
                }
            })

            setOrder(data.order);

        } catch (err) {
            console.log(err)
            ToastEmmitter.error('System error', 'Cannot fetch order')
        }
    }

    useFocusEffect(
        useCallback(() => {
            getOrder()
        }, [])
    )

    const handleUpdate = async (status) => {
        setLoading(true)
        try {

            const { data } = await axios.put(`${baseURL}/order/${id}`, { status: status }, {
                headers: {
                    "Authorization": SyncStorage.get('token'),
                }
            })
            setOrder(data.order);
            setLoading(false)
            if (data.success) {
                ToastEmmitter.success(data.message)
            }

        } catch (err) {
            console.log(err)
            setLoading(false)

            ToastEmmitter.error('System error', 'Cannot update order')
        }
    }

    return (
        <>
            {loading ? <WanderLoader loadingText={'Updating order status...'} />
                :
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={[styles.title, { fontWeight: 800 }]}>Order Info</Text>
                        <Text style={{ marginBottom: 5 }}>
                            Order ID: {order._id}
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                            Total Amount: P2394
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                            Payment: {getMOP(order.paymentMethod)}
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                            Status: {order.orderStatus}
                        </Text>
                        <Text style={{ marginBottom: 5 }}>
                            Shipping Address: {order.shippingInfo?.address}
                        </Text>

                        <Divider marginY={2} />

                        <Text style={[styles.title, { fontWeight: 800 }]}>Order Items</Text>
                        {order?.orderItems?.map((item, i) => (
                            <Fragment key={i + item._id}>
                                <View style={[styles.cardContainer, { marginBottom: 20 }]}>
                                    <Image style={styles.cardMedia} source={{ uri: item?.product?.images[0]?.url }} />
                                    <View style={styles.cardBody}>
                                        <Text style={[styles.productName, { fontWeight: 600 }]}>{item.product.name}</Text>
                                        <Text style={{ color: '#45474BE1', fontSize: 12 }}>Size: {item.size}</Text>
                                        <Text style={{ color: '#45474BE1', fontSize: 12, textTransform: 'capitalize' }}>Color: {item.color.name}</Text>
                                        <Text style={{ color: '#45474BE1', fontSize: 12 }}>Price: ₱{totalItemPrice(1, item.size, item.product.price)}</Text>
                                        <Text style={{ color: '#45474BE1', fontSize: 12 }}>Quantity: {item.quantity}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: 600, textAlign: 'right', marginTop: -10, position: 'absolute', bottom: 10, right: 10 }}>₱{totalItemPrice(item.quantity, item.size, item.product.price)}</Text>
                                    </View>
                                </View>
                            </Fragment>
                        ))}
                        <Divider marginY={2} />

                        <Text style={[styles.title, { fontWeight: 800 }]}>Customer Info</Text>
                        <View style={styles.customerContainer}>
                            <Image style={styles.userImage} source={{ uri: userImg }} />
                            <View style={{ display: 'flex', gap: 5 }}>
                                <Text>{order?.user?.name}</Text>
                                <Text>{order?.user?.email}</Text>
                                <Text>Joined On {new Date(order?.user?.createdAt).toDateString()}</Text>
                            </View>
                        </View>
                        <Divider marginY={2} />

                    </ScrollView>
                    <View style={styles.actions}>
                        {getActions(order.orderStatus, handleUpdate)}
                    </View>
                </View>
            }
        </>
    )
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

const getActions = (status, handleUpdate) => {
    switch (status) {
        case 'Pending':
            return (
                <>
                    <Button variant={'outline'} onPress={() => handleUpdate('Cancelled')} colorScheme={'mycustom'} width={'47%'}>Cancel</Button>
                    <Button onPress={() => handleUpdate('Confirmed')} colorScheme={'mycustom'} width={'47%'}>Confirm</Button>
                </>
            )
        case 'Confirmed':
            return (
                <>
                    <Button onPress={() => handleUpdate('Shipped')} colorScheme={'mycustom'} width={'100%'}>Ship</Button>
                </>
            )
        case 'Shipped':
            return (
                <>
                    <Button onPress={() => handleUpdate('Delivered')} colorScheme={'mycustom'} width={'100%'}>Delivered</Button>
                </>
            )
        case 'Delivered':
            return (
                <>
                    <Button onPress={() => handleUpdate('Remove')} colorScheme={'danger'} width={'100%'}>Remove</Button>
                </>
            )
    }
}

const userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jGrY2LhgNRyNAK8DJ8JJk20nYe2yO-dzo_XOQZ8Q5Q&s'

const styles = StyleSheet.create({
    actions: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        left: '3%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '200',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    customerContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 50
    },
    userImage: {
        height: 100,
        width: 100
    },
    title: {
        fontSize: 16,
        marginBottom: 10
    },
    container: {
        width: width,
        minHeight: '100%',
        padding: 10,
    },
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
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        gap: 10
    },
})

