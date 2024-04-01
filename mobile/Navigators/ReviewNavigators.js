import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Reviews from '../Screens/Reviews/Reviews';
import Header from '../Shared/Header';

const Stack = createStackNavigator();

export default function ReviewNavigators() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >

            <Stack.Screen
                name='RevewScreen'
                component={Reviews}
                options={{
                    header: () => (
                        <Header headTitle={'Reviews'} />
                    ),
                    headerShown: true,
                }}
            />

        </Stack.Navigator >
    )
}