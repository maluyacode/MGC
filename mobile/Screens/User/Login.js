import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Button as RNButton, Pressable, TouchableOpacity } from 'react-native'
import Container from '../../Shared/Container'
import TextInput from '../../Shared/Form/TextInput'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../Shared/Form/Button';
import { Formik } from 'formik';
import LoginValidation from '../../Validations/LoginValidation';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const route = useNavigation()

    return (
        <Container>
            <Formik
                validateOnChange={false}
                validationSchema={LoginValidation}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <Image style={styles.image} source={require('../../assets/mgc-logo.png')} />
                        <Text style={styles.title}>Login to your account</Text>
                        <TextInput placeholder="Username/Email" icon={<AntDesign name="user" size={20} color="#67729D" />}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            name='email'
                            errorText={errors.email}
                            textContentType='emailAddress'
                        />
                        <TextInput placeholder="Password" icon={<MaterialCommunityIcons name="onepassword" size={20} color="#67729D" />}
                            onChangeText={handleChange('password')}
                            name='password'
                            value={values.password}
                            secureTextEntry={true}
                            errorText={errors.password}
                            textContentType='password'
                        />
                        <Button onPress={handleSubmit} title='Login' style={{ marginTop: 15 }} />
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                            <Text>Already have and account? </Text>
                            <TouchableOpacity onPress={() => route.navigate('Register')}>
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
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '400',
        marginBottom: 20,
        color: '#BB9CC0'
    },
    scrollView: {
        margin: 20,
        marginTop: 100
    },
    image: {
        width: 320,
        height: 150,
        marginHorizontal: 'auto'
    }
})

export default Login