import React, { useCallback, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home'
import Header from '../Shared/Header'
import ProductDetails from '../Screens/Product/ProductDetails';
import StacktTopHeader from '../Shared/StacktTopHeader';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >

            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    header: () => (
                        <Header headTitle={'Home'} />
                    ),
                    headerShown: true,
                }}
            />

            <Stack.Screen
                name='ProductDetails'
                component={ProductDetails}
                options={{
                    header: ({ navigation, route, options }) => (
                        <StacktTopHeader route={route} navigation={navigation} />
                    ),
                    headerShown: true,
                }}
            />

        </Stack.Navigator >
    )
}