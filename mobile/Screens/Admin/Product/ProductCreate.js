import { View, Text, StyleSheet, TextComponent } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Box, Button, CheckIcon, Divider, FormControl, Input, Modal, ScrollView, Select, Stack } from 'native-base'
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

const options = [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },
];

const capitalizedColors = colors.map(color => {
    return {
        value: color.name.charAt(0).toUpperCase() + color.name.slice(1),
        label: color.name.charAt(0).toUpperCase() + color.name.slice(1)
    };
});


export default function ProductCreate() {

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


    const handleSelect = value => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    return (
        <>
            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <Formik
                        innerRef={formik}
                        onSubmit={(values) => console.log(values)}
                        // validateOnBlur={false}
                        validateOnChange={true}
                        // validateOnMount={false}
                        validationSchema={ProductValidation}
                        initialValues={{
                            name: '', description: '',
                            category: '', price: '',
                            stock: '', brand: '',
                            brand: '', colors: [],
                            sizes: [],
                        }}
                    >
                        {({ handleSubmit, handleChange, values, errors, touched, resetForm, setFieldTouched }) => (

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
                                {console.log(errors.colors)}
                                {console.log(touched.colors)}
                                <FormControl focusable={false} style={styles.formControl} isInvalid={errors.colors && touched.colors}>
                                    <ColorPicker
                                        onPressOut={() => setFieldTouched('colors', true)}
                                        onSelection={setSelectedColors}
                                        data={colors}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        {errors.colors}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={false}>
                                    <CheckboxInput
                                        containerStyle={{ marginTop: -10, marginBottom: 20 }}
                                        options={options}
                                        selectedOptions={selectedOptions}
                                        onSelect={handleSelect}
                                    />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        This field is required
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl focusable={false} style={styles.formControl} isInvalid={false}>
                                    <FilePicker />
                                    <FormControl.ErrorMessage style={styles.errorMessage}>
                                        This field is required
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <Box display={'flex'} flexDir={'row'} justifyContent={'center'} style={{ gap: 10 }} >


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