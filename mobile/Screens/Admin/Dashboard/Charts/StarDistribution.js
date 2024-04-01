import { View, Text, Dimensions, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import baseURL from '../../../../assets/common/baseUrl';
import axios from 'axios';
import SyncStorage from 'sync-storage'
import { PieChart } from "react-native-gifted-charts";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getProductsAPI } from '../../../../API/productAPI';
import { CheckIcon, Select } from 'native-base';

export default function StarDistribution() {

    const [result, setResult] = useState([]);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState();

    const getStarDistribution = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/chart/star-distribution?id=${id}`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                setResult(data.starDistribution)
            } else {
                // setLoading(false)
            }

        } catch (err) {
            console.log(err)
            Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    const getProducts = async () => {
        const { data } = await getProductsAPI();
        setProducts(data.products || [])
        setId(data.products[0]._id)
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        getStarDistribution();
    }, [id])

    const handleDetails = (item) => {
        Alert.alert(`${item.rating} star rating`, `Total Number: ${item.value}`)
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: '#332941', textAlign: 'center', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Star Ratings</Text>
            <View style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexDirection: 'row', marginBottom: 10, width: '100%', paddingHorizontal: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, }}>
                    <MaterialCommunityIcons name={'circle'} size={20} color={'red'} />
                    <Text>1 Star</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, }}>
                    <MaterialCommunityIcons name={'circle'} size={20} color={'green'} />
                    <Text>2 Star</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, }}>
                    <MaterialCommunityIcons name={'circle'} size={20} color={'yellow'} />
                    <Text>3 Star</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, }}>
                    <MaterialCommunityIcons name={'circle'} size={20} color={'blue'} />
                    <Text>4 Star</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, }}>
                    <MaterialCommunityIcons name={'circle'} size={20} color={'orange'} />
                    <Text>5 Star</Text>
                </View>
            </View>
            <PieChart
                data={result}
                showText
                textColor="black"
                radius={150}
                textSize={20}
                // focusOnPress
                onPress={(item) => handleDetails(item)}
                showValuesAsLabels
                showTextBackground
                textBackgroundRadius={26}
            />
            <Select width={'100%'} selectedValue={id} marginY={5} accessibilityLabel="Choose Service" placeholder="Choose Product" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setId(itemValue)}>
                {products?.map(product => (
                    <Select.Item key={product._id} label={product.name} value={product._id} />
                ))}
            </Select>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#67729D',
        padding: 10,
        borderRadius: 10,
        paddingBottom: 20
    },
});