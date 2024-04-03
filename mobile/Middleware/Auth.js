import { View, Text } from 'react-native'
import React from 'react'
import SyncStorage from 'sync-storage'
import { useNavigation } from '@react-navigation/native';

export default function Auth({ children }) {

    const navigation = useNavigation();
    const user = SyncStorage.get('user');


    if (user) {
        return children;
    } else {
        navigation.navigate('Login')
    }
}