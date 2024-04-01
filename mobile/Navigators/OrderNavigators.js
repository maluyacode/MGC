import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Shared/Header';
import { createStackNavigator } from '@react-navigation/stack'
import Order from '../Screens/Order/Order';
const Stack = createStackNavigator();

export default function OrderNavigators() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >

            <Stack.Screen
                name='OrderScreen'
                component={Order}
                options={{
                    header: () => (
                        <Header headTitle={'My Orders'} />
                    ),
                    headerShown: true,
                }}
            />

        </Stack.Navigator >
    )
}