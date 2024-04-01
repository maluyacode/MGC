import "core-js/stable/atob";
import React, { useCallback, useState } from 'react'
import Container from '../../Shared/Container'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
// import Jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import SyncStorage from "sync-storage";
import { logoutAction } from '../../Redux/Actions/userActions'
import { TextInput } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "native-base";
import { ButtonGroup } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const buttons = ["My Reviews", "To Review"]

const Profile = ({ navigation }) => {

    const dispatch = useDispatch();

    const { token, userInfo } = useSelector(state => state.user);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [user, setUser] = useState({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
    });

    const [notEdit, setNotEdit] = useState(true);


    useFocusEffect(
        useCallback(() => {
            setUser(userInfo)
        }, [])
    )

    console.log(user)

    const handleChange = (value, name) => {
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = () => {
        console.log(user);
    }

    return (
        <Container style={styles.container}>
            <View style={styles.form}>
                <TextInput contentStyle={{ color: '#3D3B40D1' }} style={[styles.disabledInput]} label="Name" dense={'40dp'}
                    disabled={notEdit}
                    value={user?.name}
                    onChangeText={(value) => handleChange(value, 'name')}
                />

                <TextInput contentStyle={{ color: '#3D3B40D1' }} style={[styles.disabledInput]} label="Email" dense={'40dp'}
                    disabled={notEdit}
                    value={user?.email}
                    onChangeText={(value) => handleChange(value, 'email')}
                />

                <TextInput contentStyle={{ color: '#3D3B40D1' }} style={[styles.disabledInput]} label="Phone" dense={'40dp'}
                    disabled={notEdit}
                    value={user?.phone || ""}
                    onChangeText={(value) => handleChange(value, 'phone')}
                />

                <View style={styles.actions}>
                    {notEdit ?
                        <Button width={'100%'} colorScheme={'mycustom'} onPress={() => setNotEdit(false)}>Edit Profile</Button> :
                        <>
                            <Button variant={'outline'} borderColor={'#67729D'} width={'47%'} colorScheme={'mycustom'} onPress={() => {
                                setUser(userInfo);
                                setNotEdit(true)
                            }}>Cancel</Button>
                            <Button width={'47%'} colorScheme={'mycustom'} onPress={handleSubmit}>Save</Button>
                        </>
                    }
                </View>
                {/* <TouchableOpacity>
                    <Text style={{ marginTop: -10, color: 'rgb(12, 100, 100)' }}>Change Password</Text>
                </TouchableOpacity> */}
                <Button variant={'outline'} borderColor={'#67729D'} colorScheme={'mycustom'} onPress={() => dispatch(logoutAction())}>Logout</Button>
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '30%',
        height: 100,
        borderRadius: 10
    },
    conatainerCard: {
        width: '100%',
        // height: 150,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    buttonsStyle: {
        marginTop: 10,
        marginHorizontal: 0,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    disabledInput: {
        borderBottomWidth: 0
    },
    form: {
        display: 'flex',
        gap: 15
    },
    container: {
        padding: 10,
    }
})

export default Profile