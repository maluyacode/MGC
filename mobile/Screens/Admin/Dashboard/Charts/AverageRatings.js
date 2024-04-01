import { View, Text, Dimensions, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SyncStorage from 'sync-storage'
import baseURL from '../../../../assets/common/baseUrl';
import { BarChart } from "react-native-gifted-charts";

const colors = [
    '#1F1F1F',
    '#2C2C2C',
    '#333333',
    '#3A3A3A',
    '#444444',
    '#4D4D4D',
    '#555555',
    '#5C5C5C',
    '#666666',
    '#707070',
    '#777777',
    '#808080',
    '#8C8C8C',
    '#999999',
    '#A6A6A6',
    '#B3B3B3',
    '#B9B9B9',
    '#C0C0C0',
    '#CCCCCC',
    '#D9D9D9'
];

export default function AverageRatings() {

    const [result, setResult] = useState([]);

    const getAverageRating = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/chart/trend-products`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {

                const items = Object.keys(data.averageRatings).map((month) => ({
                    value: data.averageRatings[month],
                    label: month,
                    frontColor: colors[Math.floor(Math.random() * (19 - 1 + 1)) + 1]
                }));

                setResult(items)

            } else {
                // setLoading(false)
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    useEffect(() => {
        getAverageRating();
    }, [])



    return (
        <View style={styles.container}>
            <Text style={{ color: '#332941', textAlign: 'center', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Average Ratings</Text>
            <BarChart
                width={280}
                height={300}
                barWidth={50}
                noOfSections={5}
                barBorderRadius={4}
                frontColor="lightgray"
                data={result}
                maxValue={5}
                spacing={50}
                onPress={(item, index) => console.log('item', item)}
                initialSpacing={40}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#67729D',
        padding: 10,
        paddingTop: 20,
        borderRadius: 10,
        paddingBottom: 20
    },
});