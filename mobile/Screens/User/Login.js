import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Button as RNButton, Pressable, TouchableOpacity } from 'react-native'
import Container from '../../Shared/Container'
import TextInput from '../../Shared/Form/TextInput'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../Shared/Form/Button';
import { Formik } from 'formik';
import LoginValidation from '../../Validations/LoginValidation';
import { useNavigation } from '@react-navigation/native';
import WanderLoader from '../../Shared/Loader/WanderLoader';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import Toast from 'react-native-toast-message';
import { authenticate, getToken, getUser } from '../../utils/user';
import { clearErrors, loginAction } from '../../Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux'
import ToastEmmitter from '../../Shared/ToastEmmitter';
import * as userAction from '../.././Redux/Constants/userContstants'

const Login = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch();

    const { success, loading, loadingText, errorText, successMessage } = useSelector(state => state.user);

    const handleSubmit = values => {
        dispatch(loginAction(values))
    }

    useEffect(() => {

        if (success) {
            navigation.navigate('Home');
            ToastEmmitter.success(successMessage)
        } else {
            ToastEmmitter.error(errorText);
            // dispatch(clearErrors())
        }

    }, [success])


    return (
        <Container>
            <Formik
                validationSchema={LoginValidation}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <Image style={styles.image} source={require('../../assets/mgc-logo.png')} />
                        <Text style={styles.title}>Welcome back!</Text>
                        <TextInput placeholder="Username/Email" icon={<AntDesign name="user" size={20} color="#67729D" />}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            name='email'
                            errorText={errors.email}
                            touched={touched.email}
                            textContentType='emailAddress'
                        />
                        <TextInput placeholder="Password" icon={<MaterialCommunityIcons name="onepassword" size={20} color="#67729D" />}
                            onChangeText={handleChange('password')}
                            name='password'
                            value={values.password}
                            secureTextEntry={true}
                            errorText={errors.password}
                            textContentType='password'
                            touched={touched.password}
                        />
                        <Button onPress={handleSubmit} title='Login' style={{ marginTop: 15 }} />
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                            <Text>Already have and account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.signUp}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </Container>
    )
}

const styles = StyleSheet.create({
    signUp: {
        color: '#67729D',
        fontWeight: '500'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        marginTop: 60,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 20,
        color: '#67729D'
    },
    scrollView: {
        margin: 20,
        marginTop: 100
    },
    image: {
        width: 320,
        height: 175,
        marginHorizontal: 'auto'
    }
})

export default Login