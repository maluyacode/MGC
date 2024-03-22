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

const Stack = createStackNavigator();

const UserNavigator = (props) => {
    // const [loading, setLoading] = useState(true); const [loadingText, setLoadingText] = useState('Loading'); const setLoader = (isEnable = false, text = 'Loading') => { setLoadingText(text); setLoading(isEnable) }

    // const [user, setUser] = useState();

    const { loading, userInfo, loadingText } = useSelector(state => state.user);
    // const getUserFromStorage = async () => {
    //     const user = await getUser();
    //     setUser(user);
    // }

    // useFocusEffect(
    //     useCallback(() => {
    //         getUserFromStorage();
    //     }, [])
    // )
    console.log(userInfo)
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
                                header: () => {
                                    return <Text>My account</Text>
                                }
                            }}
                        />

                    }
                </Stack.Navigator>
            }
        </>
    )
}

export default UserNavigator