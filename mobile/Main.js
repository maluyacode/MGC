import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DrawerNavigator from './Navigators/DrawerNavigator';
import TabNavigator from './Navigators/TabNavigator';
import Header from './Shared/Header';
import { INITIALIZE_CART } from './Redux/Constants/cartConstants';
import SyncStorage from 'sync-storage'
import { Button } from 'native-base';

export default function Main() {

    const { userInfo } = useSelector(state => state.user);

    const dispatch = useDispatch()

    const initializeData = () => {
        const cartItems = SyncStorage.get('cartItems') || [];

        // console.log(cartItems)

        dispatch({
            type: INITIALIZE_CART,
            payload: cartItems
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
