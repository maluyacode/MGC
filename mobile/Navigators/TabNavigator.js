import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, Text, View } from 'react-native'

import UserNavigator from './UserNavigator'
import Home from '../Screens/Home'
import Cart from '../Screens/Cart/Cart'
import Order from '../Screens/Order/Order'
import HomeNavigator from './HomeNavigator'

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return (
        <>
            <Tab.Navigator
                initialRouteName='HomeScreen'
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                    tabBarPressColor: 'transparent',
                    swipeEnabled: false,
                    animationEnabled: false,
                }}
                backBehavior='history'
                tabBarPosition='bottom'
            >

                <Tab.Screen
                    name='HomeScreen'
                    component={HomeNavigator}
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
                // initialParams={{ screen: 'Home' }}
                />


                <Tab.Screen
                    name='Order'
                    component={Order}
                    options={{
                        tabBarIcon: ({ color }) => {
                            return <Icon
                                name='heart'
                                style={{ position: 'relative' }}
                                color={color}
                                size={24}
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
        </>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#E7BCDE',
    },
})

export default TabNavigator