import React, { useState } from 'react'
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

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false); const [loadingText, setLoadingText] = useState('Please wait...'); const setLoader = (isEnable = false, text = 'Loading') => { setLoadingText(text); setLoading(isEnable) }


    const login = async (values) => {
        try {

            const { data } = await axios.post(`${baseURL}/users/login`, values);

            Toast.show({
                topOffset: 60,
                type: "success",
                text1: data.message,
            });

            authenticate(data)
            setLoader(false)

            navigation.navigate('Home');

        } catch (err) {
            console.log(err)
            setLoader(false)
            Toast.show({
                position: 'bottom',
                bottomOffset: 20,
                type: "error",
                text1: err?.response?.data?.message || 'Please try again later',
            });
        }
    }

    const handleSubmit = values => {
        setLoader(true, 'Please wait...')
        login(values)
    }

    return (
        <>
            {loading ? <WanderLoader loadingText={loadingText} /> :
                <Container>
                    <Formik
                        validationSchema={LoginValidation}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.form}>
                                <Image style={styles.image} source={require('../../assets/mgc-logo.png')} />
                                {/* <Text style={styles.title}>Welcome back!</Text> */}
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
            }
        </>
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