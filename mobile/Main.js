import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import DrawerNavigator from './Navigators/DrawerNavigator';
import TabNavigator from './Navigators/TabNavigator';
import Header from './Shared/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main() {

    const { userInfo } = useSelector(state => state.user);
    
    return (
        <>
            {userInfo?.isAdmin ?
                <DrawerNavigator /> :
                <>
                    <Header />
                    <TabNavigator />
                </>
            }
        </>
    )
}