import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../Screens/Admin/Dashboard/Dashboard';
import ProductsList from '../Screens/Admin/Product/ProductsList';
import OrdersList from '../Screens/Admin/Order/OrdersList';
import CategoriesList from '../Screens/Admin/Category/CategoriesList';
import UsersList from '../Screens/Admin/User/UsersList';
import CategoryCreate from '../Screens/Admin/Category/CategoryCreate';
import CategoryUpdate from '../Screens/Admin/Category/CategoryUpdate';
import ProductCreate from '../Screens/Admin/Product/ProductCreate';
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
                name='ProductCreate'
                component={ProductCreate}
                options={{
                    title: 'Add New Product',
                    headerShown: true,
                    headerStyle: { height: 40 },
                    headerTitleStyle: { fontSize: 16, marginLeft: -15 },
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
                name='CategoryCreate'
                component={CategoryCreate}
                options={{
                    title: 'Create New Category',
                    headerShown: true,
                    headerStyle: { height: 40 },
                    headerTitleStyle: { fontSize: 16, marginLeft: -15 },
                }}
            />
            <Stack.Screen
                name='CategoryUpdate'
                component={CategoryUpdate}
                options={{
                    title: 'Create New Category',
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