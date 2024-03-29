import React, { useCallback, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import Profile from '../Screens/User/Profile';
import PickImage from '../Screens/User/PickImage';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../utils/user';
import WanderLoader from '../Shared/Loader/WanderLoader';
import { useSelector } from 'react-redux';
import SyncStorage from 'sync-storage'
import Header from '../Shared/Header';
const Stack = createStackNavigator();

const UserNavigator = (props) => {

    const { loading, userInfo, loadingText, token } = useSelector(state => state.user);

    return (
        <>
            {loading ? <WanderLoader loadingText={loadingText} /> :
                <Stack.Navigator
                    initialRouteName='Login'
                >
                    {!userInfo ?
                        <>
                            <Stack.Screen
                                name='Login'
                                component={Login}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name='Register'
                                component={Register}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name='PickImage'
                                component={PickImage}
                                options={{
                                    headerShown: false
                                }}
                            />
                        </>
                        :
                        <Stack.Screen
                            name='Profile'
                            component={Profile}
                            options={{
                                headerShown: true,
                                header: () => (
                                    <Header headTitle={'Profile'} />
                                ),
                            }}
                        />

                    }
                </Stack.Navigator>
            }
        </>
    )
}

export default UserNavigator