import React, { useCallback, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import Container from '../Shared/Container'
import { useFocusEffect } from '@react-navigation/native'
import { getProductsAPI } from '../API/productAPI'
import ToastEmmitter from '../Shared/ToastEmmitter'
import ProductsList from './ProductsList'

const Home = () => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {

        const { data } = await getProductsAPI();

        if (data.success) {
            setProducts(data.products);
        } else {
            ToastEmmitter.error("Cannot get products", "Balik ka bukas baka okay na");
        }

    }

    useFocusEffect(
        useCallback(() => {
            getAllProducts()
        }, [])
    )

    return (
        <Container>
            <Text style={[styles.title, { fontWeight: 600 }]} >Trend Special</Text>
            <ProductsList items={products} />

            <Text style={[styles.title, { fontWeight: 600 }]}>New Product</Text>
            <ProductsList items={products.reverse()} />
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#67729D', marginHorizontal: 18, marginVertical: 10, fontSize: 20,
        // fontWeight: 700
    }
})

export default Home