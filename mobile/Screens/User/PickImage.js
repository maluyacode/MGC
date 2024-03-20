import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Alert, Modal, Pressable, ActivityIndicator } from 'react-native'
import Container from '../../Shared/Container'
import Button from '../../Shared/Form/Button';
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import WanderLoader from '../../Shared/Loader/WanderLoader';

const PickImage = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Loading');
    const setLoader = (isEnable = false, text = 'Loading') => {
        setLoadingText(text)
        setLoading(isEnable)
    }

    const userData = route.params;

    const [imgPreview, setImgPreview] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png');
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
            setImgPreview(result.assets[0].uri);
        } else {
            Alert.alert("", "You did not select any image")
        }
    }

    const register = async (formData) => {
        setLoader(true, 'Creating your account...')
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }

        axios
            .post(`${baseURL}/users/register`, formData, config)
            .then((res) => {
                setLoader(false);
                if (res.status === 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Your account was successfully created",
                        text2: "Please login into your account",
                    });
                    
                    navigation.navigate("Login");
                }
            })
            .catch((error) => {
                setLoader(false);
                Toast.show({
                    position: 'bottom',
                    bottomOffset: 20,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
                console.log(error.message)
            })
    }

    const handleSubmit = () => {

        if (imgPreview.split(':')[0] !== 'file') {
            Alert.alert("", "Profile photo is required");
        }

        const formData = new FormData();

        const newImageUri = "file:///" + imgPreview.split("file:/").join("");
        userData.image = {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        }

        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value);
        })

        register(formData)

    }

    return (
        <>
            {loading ?
                <WanderLoader loadingText={loadingText} /> :
                <Container>
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
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: imgPreview }} />
                    </View>
                    <Button style={styles.pickImage} title='Add Photo' onPress={() => setModalVisible(true)} />
                    <View style={styles.buttonContainer}>
                        <Button title='Back' onPress={() => navigation.goBack()} />
                        <Button title='Confirm' onPress={handleSubmit} />
                    </View>
                </Container>
            }
        </>
    )
}

const styles = StyleSheet.create({
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
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 250,
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

export default PickImage