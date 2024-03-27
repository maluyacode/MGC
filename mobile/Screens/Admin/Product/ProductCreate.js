import { View, Text, StyleSheet, TextComponent, Alert } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Box, Button, CheckIcon, Divider, FormControl, Input, Modal, ScrollView, Select, Stack } from 'native-base'
import { Button as RNButton } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Chip, TextInput } from 'react-native-paper'
import colors from '../.././../utils/colors.json'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SelectMultiple from 'react-native-dropdown-listpicker';
import ColorPicker from './ColorPicker'
import { getCategoriesAPI } from '../../../API/categoryApi'
import { useFocusEffect } from '@react-navigation/native'
import FilePicker from '../../../Shared/Form/FilePicker'
import CheckboxInput from '../../../Shared/Form/CheckboxInput'
import { Formik } from 'formik'
import ProductValidation from '../../../Validations/ProductValidation'
import { productCreateAPI } from '../../../API/productAPI'
import ToastEmmitter from '../../../Shared/ToastEmmitter'

const options = [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },
];

export default function ProductCreate({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [groupValues, setGroupValues] = React.useState([]);
    const [categories, setCategories] = useState([]);
    const formik = useRef()

    const getAllCategories = async () => {

        const { data } = await getCategoriesAPI();

        if (data.success) {
            setCategories(data.categories);
        } else {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllCategories()
        }, [])
    )

    const [selectedOptions, setSelectedOptions] = useState([]);


    const handleSelect = (value, selectedOptions) => {
        if (selectedOptions.includes(value)) {
            // setSelectedOptions(selectedOptions.filter(option => option !== value));
            formik.current.setFieldValue('sizes', selectedOptions.filter(option => option !== value))
        } else {
            // setSelectedOptions([...selectedOptions, value]);
            formik.current.setFieldValue('sizes', [...selectedOptions, value])
        }
    };

    const submitForm = async (values) => {
        setLoading(true)
        if (values.sizes?.length <= 0 || values.images?.length <= 0 || values.colors?.length <= 0) {
            Alert.alert("Cannot Proceed", "Make sure you fill out all fields")
            return;
        }
        const { data } = await productCreateAPI(values);

        if (data.success) {
            ToastEmmitter.success('Successfully Created', data.message)
            setLoading(false)
            navigation.navigate('Products')
        } else {
            setLoading(false)
            ToastEmmitter.error('Error occured', data?.message)
        }
    }

    return (
        <>
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <Formik
                        innerRef={formik}
                        onSubmit={(values) => submitForm(values)}
                        // validateOnBlur={false}
                        validateOnChange={true}
                        // validateOnMount={false}
                        validationSchema={ProductValidation}
                        initialValues={{
                            name: '', description: '',
                            category: '', price: '',
                            stock: '', brand: '',
                            brand: '', colors: [],
                            sizes: [], images: [],
                        }}
                    >
                        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, resetForm, setFieldTouched }) => (

                            <>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.name && touched.name}>
                                    <TextInput label={'Name'} style={styles.inputField} mode='outlined' placeholderTextColor={'gray'} theme={''} dense={'40dp'}
                                        nativeID='name'
                                        onChangeText={handleChange('name')}
                                        onBlur={() => setFieldTouched('name', true)}
                                        value={values.name}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.name}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.category && touched.category}>
                                    <Select style={styles.inputField} mt={1} borderColor={'gray.500'} minWidth="200" accessibilityLabel="Choose Category" placeholder="Choose Category" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }}
                                        nativeID='category'
                                        selectedValue={values.category}
                                        onValueChange={handleChange('category')}
                                        onClose={() => setFieldTouched('category', true)}
                                    >
                                        {categories?.map((category, i) => (
                                            <Select.Item key={i} label={category.name} value={category._id} />
                                        ))}
                                    </Select>
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.category}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl style={styles.formControl} isInvalid={errors.description && touched.description}>
                                    <TextInput multiline label={'Description'} numberOfLines={7} style={styles.inputField} mode='outlined' placeholderTextColor={'gray'} theme={''} dense={'40dp'}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={() => setFieldTouched('description', true)}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.description}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.price && touched.price}>
                                    <TextInput keyboardType={'decimal-pad'} label={'Price'} style={styles.inputField} mode='outlined' placeholderTextColor={'gray'} theme={''} dense={'40dp'}
                                        nativeID='price'
                                        value={values.price}
                                        onChangeText={handleChange('price')}
                                        onBlur={() => setFieldTouched('price', true)}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.price}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.stock && touched.stock}>
                                    <TextInput keyboardType={'number-pad'} label={'Stock'} style={styles.inputField} mode='outlined' placeholderTextColor={'gray'} theme={''} dense={'40dp'}
                                        nativeID='stock'
                                        value={values.stock}
                                        onChangeText={handleChange('stock')}
                                        onBlur={() => setFieldTouched('stock', true)}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.stock}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.brand && touched.brand}>
                                    <TextInput label={'Brand'} style={styles.inputField} mode='outlined' placeholderTextColor={'gray'} theme={''} dense={'40dp'}
                                        nativeID='brand'
                                        value={values.brand}
                                        onChangeText={handleChange('brand')}
                                        onBlur={() => setFieldTouched('brand', true)}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.brand}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.colors && touched.colors}>
                                    <ColorPicker
                                        onSelection={(value) => setFieldValue('colors', value)}
                                        data={colors}
                                    />
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={false}>
                                    <CheckboxInput
                                        containerStyle={{ marginTop: -10, marginBottom: 20 }}
                                        options={options}
                                        selectedOptions={values.sizes}
                                        onSelect={(value) => {
                                            handleSelect(value, values.sizes)
                                        }}
                                    />
                                </FormControl>
                                <FormControl focusable={false} style={styles.formControl} isInvalid={false}>
                                    <FilePicker
                                        onPick={(value) => setFieldValue('images', value)}
                                    />
                                </FormControl>

                                <Box display={'flex'} flexDir={'row'} justifyContent={'center'} style={{ gap: 10 }} >

                                    <Button onPress={() => {
                                        // resetForm()
                                        // setSelectedImages([]);
                                    }} size={'xs'} colorScheme={'rose'} width={120}>
                                        <Text color={'#fff'}>Clear</Text>
                                    </Button>

                                    <RNButton disabled={loading} loading={loading} onPress={handleSubmit} buttonStyle={styles.rnButton}
                                        title={<Text color={'#fff'}>Create</Text>} />

                                </Box>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>

        </>

    )
}


const styles = StyleSheet.create({
    rnButton: {
        height: 40,
        width: 120
    },
    customInputStyle: {
        width: '100%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    inputField: {
        fontSize: 16,
    },
    container: {
        padding: 10,
        backgroundColor: '#fff'
    },
    errorMessage: {
        marginTop: -2,
        marginLeft: 3,
        marginBottom: -2
    },
    formControl: {
        marginBottom: 10,
    }
})