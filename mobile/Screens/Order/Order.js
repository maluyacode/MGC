import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, Text, Dimensions } from 'react-native'
import SyncStorage from 'sync-storage'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import baseURL from '../../assets/common/baseUrl'
import Container from '../../Shared/Container'

const Order = ({ navigation }) => {

    const [orders, setOrders] = useState([]);

    const userJson = SyncStorage.get('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const getAllOrders = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/order?user=${user._id}`, {
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
            Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllOrders()
        }, [])
    )

    return (
        <Container>

        </Container>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default Order