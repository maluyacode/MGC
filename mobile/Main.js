import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DrawerNavigator from './Navigators/DrawerNavigator';
import TabNavigator from './Navigators/TabNavigator';
import Header from './Shared/Header';
import { INITIALIZE_CART } from './Redux/Constants/cartConstants';
import SyncStorage from 'sync-storage'
import { Button } from 'native-base';
import { USER_LOGIN_SUCCESS } from './Redux/Constants/userContstants';

export default function Main() {

    const { userInfo } = useSelector(state => state.user);

    const dispatch = useDispatch()

    const initializeData = () => {
        
        const cartItems = SyncStorage.get('cartItems') || [];
        const user = SyncStorage.get('user') || null;
        const token = SyncStorage.get('token') || null;

        dispatch({
            type: INITIALIZE_CART,
            payload: cartItems
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
                user,
                token
            }
        })

    }

    useEffect(() => {
        initializeData()
    }, [])

    return (
        <>
            {userInfo?.isAdmin ?
                <DrawerNavigator /> :
                <>
                    {/* <Header /> */}
                    <TabNavigator />
                </>
            }
        </>
    )
}
