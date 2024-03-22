import "core-js/stable/atob";
import React from 'react'
import Container from '../../Shared/Container'
import { Button, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
// import Jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import SyncStorage from "sync-storage";
import { logoutAction } from '../../Redux/Actions/userActions'

const Profile = ({ navigation }) => {

    const dispatch = useDispatch();
    const { token, userInfo } = useSelector(state => state.user);
    console.log(SyncStorage.get('token'))


    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Logout" onPress={() => dispatch(logoutAction())} />
        </Container>
    )
}

const styles = StyleSheet.create({

})

export default Profile