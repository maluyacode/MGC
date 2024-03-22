import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../Screens/Admin/Dashboard/Dashboard';
import ProductsList from '../Screens/Admin/Product/ProductsList';
import OrdersList from '../Screens/Admin/Order/OrdersList';
import CategoriesList from '../Screens/Admin/Category/CategoriesList';
import UsersList from '../Screens/Admin/User/UsersList';
const Stack = createStackNavigator();

export default function AdminNavigators() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name='Home'
                component={Dashboard}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='OrdersList'
                component={OrdersList}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='ProductsList'
                component={ProductsList}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='CategoriesList'
                component={CategoriesList}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='UsersList'
                component={UsersList}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>

    )
}