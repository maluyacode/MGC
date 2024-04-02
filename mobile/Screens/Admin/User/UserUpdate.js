import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import axios from 'axios';
import SyncStorage from 'sync-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import baseURL from '../../../assets/common/baseUrl';
import ToastEmmitter from '../../../Shared/ToastEmmitter';
import Mime from 'mime';

export default function UserUpdate({ route }) {


    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
    })

    const onChange = (value, name) => {
        setUser({ ...user, [name]: value })
    }

    const choosePhoto = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            Alert.alert("", "You did not select any image")
        }
    }

    const update = async (values) => {
        try {

            const { data } = await axios.put(`${baseURL}/users/${route.params._id}`, values, {
                headers: {
                    'Authorization': SyncStorage.get('token'),
                    "Content-Type": 'multipart/form-data'
                },
            })

            if (data.success) {
                ToastEmmitter.success(data.message);
                navigation.navigate('UsersList')
            } else {
                ToastEmmitter.error("Please try again later")
            }
        } catch (err) {
            ToastEmmitter.error("Please try again later")
            console.log(err.response)
            // Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    const handleSubmit = async () => {

        let values = { ...user, image };

        const formData = new FormData();

        if (image !== route.params.image) {
            const newImageUri = "file:///" + image.split("file:/").join("");
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

        update(formData)
    }

    useFocusEffect(
        useCallback(() => {
            setUser({
                name: route.params.name,
                email: route.params.email,
                isAdmin: route.params.isAdmin
            })
            setImage(route.params.image)
        }, [])
    )



    return (
        <View style={styles.conatiner}>
            <TextInput value={user.name} onChangeText={(value) => onChange(value, 'name')} mode={'flat'} label={'Name'} dense={'40dp'} />
            <TextInput value={user.email} onChangeText={(value) => onChange(value, 'email')} mode={'flat'} label={'Email'} dense={'40dp'} />
            <TextInput value={user.password} onChangeText={(value) => onChange(value, 'password')} mode={'flat'} label={'Password'} dense={'40dp'} />
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Button onPress={() => onChange(false, 'isAdmin')} borderColor={'#67729D'} size={'sm'} width={'48%'} colorScheme={'mycustom'} variant={user.isAdmin ? 'outline' : 'solid'}>User</Button>
                <Button onPress={() => onChange(true, 'isAdmin')} borderColor={'#67729D'} size={'sm'} width={'48%'} colorScheme={'mycustom'} variant={user.isAdmin ? 'solid' : 'outline'}>Admin</Button>
            </View>
            {image ?
                <Button onPress={() => setImage(null)} borderColor={'#67729D'} variant={'outline'} colorScheme={'mycustom'}>Remove Photo</Button>
                :
                <Button onPress={choosePhoto} borderColor={'#67729D'} variant={'outline'} colorScheme={'mycustom'}>Upload Photo</Button>
            }
            <View style={styles.imageContainer}>
                {image ?
                    <Image style={styles.image} source={{ uri: image }} />
                    : <Text style={styles.textImage}>Image will appear here</Text>
                }
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button onPress={() => {
                    setUser({
                        name: '',
                        email: '',
                        password: '',
                    })
                    setImage(null)
                }} width={'47%'} borderColor={'#67729D'} variant={'outline'} colorScheme={'mycustom'}>Clear</Button>
                <Button onPress={handleSubmit} width={'47%'} colorScheme={'mycustom'}>Submit</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 180,
        width: '100%',
        borderRadius: 10,
        objectFit: 'contain'
    },
    conatiner: {
        padding: 10,
        flex: 1,
        gap: 20,
    },
    imageContainer: {
        width: '100%',
        borderWidth: 1,
        minHeight: 200,
        borderRadius: 10,
        padding: 10
    },
    textImage: {
        marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'
    }
})