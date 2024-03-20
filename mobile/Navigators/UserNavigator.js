import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import Profile from '../Screens/User/Profile';
import PickImage from '../Screens/User/PickImage';

const Stack = createStackNavigator();

const UserNavigator = (props) => {
    return (
        <Stack.Navigator>

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

            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default UserNavigator