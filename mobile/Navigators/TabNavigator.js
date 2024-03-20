import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet } from 'react-native'

import UserNavigator from './UserNavigator'
import Home from '../Screens/Home'
import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import Cart from '../Screens/Cart/Cart'
import Order from '../Screens/Order/Order'

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='User'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarPressColor: 'transparent',
            }}
            backBehavior='history'
            tabBarPosition='top'
        >

            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name='home'
                            style={{ position: 'relative' }}
                            color={color}
                            size={25}
                        />
                    },
                }}
            />

            <Tab.Screen
                name='Cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name='shopping-cart'
                            style={{ position: 'relative' }}
                            color={color}
                            size={25}
                        />
                    },
                }}
            />

            <Tab.Screen
                name='Order'
                component={Order}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name='dropbox'
                            style={{ position: 'relative' }}
                            color={color}
                            size={25}
                        />
                    },
                }}
            />

            <Tab.Screen
                name='User'
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name='user'
                            style={{ position: 'relative' }}
                            color={color}
                            size={25}
                        />
                    },
                }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        paddingTop: 20,
        backgroundColor: '#FED9ED'
    }
})

export default TabNavigator