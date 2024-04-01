import { View, Text, Dimensions, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import MonthlyIncome from './Charts/MonthlyIncome';
import AverageRatings from './Charts/AverageRatings';
import { useFocusEffect } from '@react-navigation/native'
import WanderLoader from '../../../Shared/Loader/WanderLoader'
import { Divider } from 'native-base';
import StarDistribution from './Charts/StarDistribution';

export default function Dashboard() {

    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }, [])
    )

    return (
        <>
            {loading ? < WanderLoader loadingText={'Please wait...'} /> : (
                <View style={{ width: Dimensions.get('window').width, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <MonthlyIncome />
                        <Divider marginY={5} />
                        <AverageRatings />
                        <Divider marginY={5} />
                        <StarDistribution />
                    </ScrollView>
                </View>
            )}
        </>
    )
}