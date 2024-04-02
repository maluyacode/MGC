import "core-js/stable/atob";
import React, { useCallback, useState } from 'react'
import Container from '../../Shared/Container'
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import Mime from "mime";
import axios from "axios";
import ToastEmmitter from "../../Shared/ToastEmmitter";
import baseURL from "../../assets/common/baseUrl";

const buttons = ["My Reviews", "To Review"]

const Profile = ({ navigation }) => {

    const dispatch = useDispatch();

    const { token, userInfo } = useSelector(state => state.user);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [id, setId] = useState(userInfo?._id)

    const [user, setUser] = useState({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        image: userInfo?.image || null
    });


    const [notEdit, setNotEdit] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const addPhoto = async (type) => {
        setModalVisible(false)

        let result;

        const c = await ImagePicker.requestCameraPermissionsAsync();

        if (c.status !== "granted") {
            Alert.alert("", "We need your permission to proceed")
            return;
        }

        if (type === 'uploadAPhoto') {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1
            })
        } else {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1
            })
        }

        if (!result.canceled) {
            setUser({ ...user, image: result.assets[0].uri });
        } else {
            Alert.alert("", "You did not select any image")
        }
    }

    const getUser = async () => {
        try {

            const { data: { userInfo } } = await axios.get(`${baseURL}/users/${id}`, {
                headers: {
                    'Authorization': SyncStorage.get('token'),
                    "Content-Type": 'multipart/form-data'
                },
            })

            setUser({
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                image: userInfo.image,
            })
            setId(userInfo?._id)
        } catch (err) {

        }
    }

    useFocusEffect(
        useCallback(() => {
            getUser()
        }, [])
    )

    const handleChange = (value, name) => {
        setUser({ ...user, [name]: value });
    }


    const update = async (values) => {
        try {

            const { data } = await axios.put(`${baseURL}/users/${id}`, values, {
                headers: {
                    'Authorization': SyncStorage.get('token'),
                    "Content-Type": 'multipart/form-data'
                },
            })

            if (data.success) {
                console.log(data.user)
                ToastEmmitter.success(data.message);
                // dispatch({
                //     type: "UPDATE_ME",
                //     data: data
                // })
            } else {
                ToastEmmitter.error("Please try again later")
            }
        } catch (err) {
            ToastEmmitter.error("Please try again later")
            console.log(err)
            // Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    const handleSubmit = () => {
        let values = { ...user, image: user.image };

        const formData = new FormData();

        if (user.image !== userInfo.image) {
            const newImageUri = "file:///" + user.image.split("file:/").join("");
            values.image = {
                uri: newImageUri,
                type: Mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            }

        } else {
            delete values.image;
        }

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        })

        console.log(values)

        update(values)
    }

    return (
        <Container style={styles.container}>

            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => addPhoto('takeAPhoto')}>
                            <Text style={styles.textStyle}>Take a photo</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => addPhoto('uploadAPhoto')}>
                            <Text style={styles.textStyle}>Upload photo</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styles.form}>
                <Image
                    style={{ width: 200, height: 200, borderRadius: 100, marginLeft: 'auto', marginRight: 'auto' }}
                    source={{ uri: user?.image }}
                />
                <Button colorScheme={'mycustom'} variant={'outline'} borderColor={'#67729D'} size={'sm'} onPress={() => setModalVisible(true)} >Upload</Button>
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
    },
    modalView: {
        margin: 20,
        marginTop: '100%',
        backgroundColor: '#E7BCDE',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: '100%',
        padding: 10,
        elevation: 2,
        margin: 3,
        borderRadius: 5,
    },
    buttonClose: {
        backgroundColor: '#67729D',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 8,
        width: 250,
        height: 250,
        borderRadius: 250,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 70,
        borderColor: '#67729D'
    },
    pickImage: {
        marginTop: 10,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#BB9CC0'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-evenly',
        marginTop: 50
    }
})

export default Profile