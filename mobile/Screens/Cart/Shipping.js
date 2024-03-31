import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-paper'

import * as Location from 'expo-location';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Box, Button } from 'native-base';
import { Formik } from 'formik';
import SyncStorage from 'sync-storage'

const { width } = Dimensions.get('window')

const imgInfo = "https://cdn.icon-icons.com/icons2/2785/PNG/512/shipping_information_icon_177388.png"

export default function Shipping() {

    const navigation = useNavigation()
    const shippingInfo = SyncStorage.get('shippingInfo') || null
    const [initialValues, setInitialValues] = useState({
        address: "",
        city: "",
        phoneNo: "",
        postalCode: "",
        country: "",
    })

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});

        if (coords) {
            let { longitude, latitude } = coords;

            let regionName = await Location.reverseGeocodeAsync({
                longitude,
                latitude,
            });

            const location = regionName[0];

            setInitialValues({
                address: location.formattedAddress || "",
                city: location.city || "",
                phoneNo: "",
                postalCode: location.postalCode || "",
                country: location.country || "",
            })
        }
    }

    const askInfo = () => {
        Alert.alert(
            'Shipping Information',
            'How would you like to fill it out?',
            [
                {
                    text: 'Get Current Location',
                    onPress: getLocation,
                },
                shippingInfo &&
                {
                    text: 'Use my Saved Shipping Info',
                    onPress: () => setInitialValues(shippingInfo),
                },
                {
                    text: 'Fill out manually',
                    onPress: () => console.log('Fill out manually')
                },
            ]
        );
    }

    const handleChange = (name, value) => {
        setInitialValues({ ...initialValues, [name]: value });
    }

    const handleNextStep = (values) => {
        navigation.navigate('Payment', values)
    }

    const handleSaveShippingInfo = (values) => {
        SyncStorage.set('shippingInfo', values)
        handleNextStep(values);
    }

    const handleSubmit = (values) => {
        const hasEmptyValue = Object.keys(values).some(key => !values[key]);
        if (hasEmptyValue) {
            Alert.alert("Validation: All Fields Required", "Please fill in all the required fields to proceed.")
            return;
        }

        Alert.alert('Save Shipping Info', "Would you like to saved your shipping info?",
            [
                {
                    text: 'No',
                    onPress: () => handleNextStep(values),
                },
                {
                    text: 'Yes',
                    onPress: () => handleSaveShippingInfo(values)
                },
            ]
        )
    }


    useFocusEffect(
        useCallback(() => {
            askInfo()
        }, [])
    );


    return (
        <Box safeArea style={styles.container}>
            <>
                <Image style={styles.imageInfo} source={{ uri: imgInfo }} />
                <Text style={[styles.title, { fontWeight: 700 }]}>Shipping Info</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput mode='outlined' style={styles.inputStyle} label={'Address'} dense={'52dp'}
                        value={initialValues.address}
                        onChangeText={(value) => handleChange('address', value)}
                    />
                    <TextInput mode='outlined' style={styles.inputStyle} label={'City'} dense={'52dp'}
                        value={initialValues.city}
                        onChangeText={(value) => handleChange('city', value)}
                    />
                    <TextInput mode='outlined' style={styles.inputStyle} label={'Phone No'} dense={'52dp'}
                        value={initialValues.phoneNo}
                        keyboardType={'number-pad'}
                        onChangeText={(value) => handleChange('phoneNo', value)}
                    />
                    <TextInput mode='outlined' style={styles.inputStyle} label={'Postal Code'} dense={'52dp'}
                        value={initialValues.postalCode}
                        keyboardType={'number-pad'}
                        onChangeText={(value) => handleChange('postalCode', value)}
                    />
                    <TextInput mode='outlined' style={styles.inputStyle} label={'Country'} dense={'52dp'}
                        value={initialValues.country}
                        onChangeText={(value) => handleChange('country', value)}
                    />
                </ScrollView>
                <View style={styles.actionContainer}>
                    <Button onPress={() => handleSubmit(initialValues)} colorScheme='mycustom' style={{ width: '100%' }}>Next</Button>
                    <Button variant={'outline'} borderColor={'#67729D'} colorScheme='mycustom' onPress={() => navigation.goBack()} style={{ width: '100%' }}>Back</Button>
                </View>
            </>
        </Box>
    )
}

const styles = StyleSheet.create({
    imageInfo: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        marginVertical: 10,
        color: '#67729D'
    },
    container: {
        minHeight: '100%',
        width: width,
        backgroundColor: '#FED9ED',
        padding: 10,
    },
    inputStyle: {
        marginVertical: 10,
    }
})