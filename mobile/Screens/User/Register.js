import React from 'react'
import Container from '../../Shared/Container'
import { Formik } from 'formik'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import TextInput from '../../Shared/Form/TextInput'
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import Button from '../../Shared/Form/Button'
import RegisterValidation from '../../Validations/RegisterValidation'
import { useNavigation } from '@react-navigation/native'

const Register = () => {

    const route = useNavigation();

    const handleNext = (values) => {
        route.navigate('PickImage', values)
    }

    return (
        <Container>
            <Formik
                validationSchema={RegisterValidation}
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={(values) => handleNext(values)}
            >
                {({ handleBlur, handleSubmit, handleChange, values, errors }) => (
                    <View style={styles.form}>
                        <Image style={styles.image} source={require('../../assets/mgc-logo.png')} />
                        <Text style={styles.title}>Register</Text>
                        <TextInput placeholder='Name' icon={<AntDesign name="user" size={20} color="#67729D" />}
                            onChangeText={handleChange('name')}
                            value={values.name}
                            name='name'
                            errorText={errors.name}
                            textContentType='name'
                        />
                        <TextInput placeholder="Username/Email" icon={<Entypo name="email" size={20} color="#67729D" />}
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
                        <Button onPress={handleSubmit} title='Next' style={{ marginTop: 15 }} />
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                            <Text>Already have and account? </Text>
                            <TouchableOpacity onPress={() => {
                                route.navigate('Login')
                            }}>
                                <Text style={styles.signUp}>Sign In</Text>
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
        fontWeight: '600',
        marginBottom: 20,
        color: '#BB9CC0'
    },
    image: {
        width: 320,
        height: 150,
        marginHorizontal: 'auto'
    }
})

export default Register