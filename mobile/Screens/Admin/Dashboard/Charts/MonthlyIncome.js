import { View, Text, Dimensions, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import baseURL from '../../../../assets/common/baseUrl';
import axios from 'axios';
import SyncStorage from 'sync-storage'
import { LineChart } from 'react-native-gifted-charts';
import { CheckIcon, Select } from 'native-base';


const years = [
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
]

export default function MonthlyIncome() {


    const [result, setResult] = useState([]);
    const [year, setYear] = useState(2024);

    const getMontlyIncome = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/chart/monthly-income?year=${year}`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })


            if (data.success) {

                const items = Object.keys(data.monthlyIncome).map((month) => ({
                    value: data.monthlyIncome[month],
                    label: month,
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
        console.log(year)
        getMontlyIncome();
    }, [year])

    return (
        <View style={styles.container}>
            <Text style={{ color: '#332941', textAlign: 'center', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Monthly Income 2024</Text>
            <LineChart
                data={result}
                width={270}
                height={300}
                gridColor="#ccc"
                noOfSections={5}
                dataPointsColor={'#332941'}
                color1='#332941'
            />
            {/* <Select width={'100%'} selectedValue={year} marginY={5} accessibilityLabel="Choose Service" placeholder="Choose Year" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setYear(itemValue)}>
                {years.reverse().map((year, i) => (
                    <Select.Item key={i + "year"} label={year.toString()} value={year} />
                ))}
            </Select> */}
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