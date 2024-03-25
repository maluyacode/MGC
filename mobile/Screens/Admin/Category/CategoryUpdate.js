import React, { useCallback, useState } from 'react'
import { Text, Box, Input, VStack, FormControl, WarningOutlineIcon, Button, Image, ScrollView, Flex, AddIcon, Icon, View, DeleteIcon } from 'native-base'
import { Card, } from 'react-native-elements'
import Container from '../../../Shared/Container'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import { Alert, ImageBase, LogBox, StyleSheet, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import CategoryValidation from '../../../Validations/CategoryValidation'
import { Button as RNButton } from 'react-native-elements'
import { createCategory, getCategoryAPI, updateCategoryAPI } from '../../../API/categoryApi'
import { useFocusEffect } from '@react-navigation/native'
import ToastEmmitter from '../../../Shared/ToastEmmitter'
import { Modal, Portal } from 'react-native-paper'

export default function CategoryUpdate({ route, navigation }) {

    const id = route.params;
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState({});
    const [selectedImages, setSelectedImages] = useState([]);
    const [visible, setVisible] = useState(false);

    const uploadPhoto = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            multiple: true,
            type: 'image/*'
        })

        if (!result.canceled) {

            setSelectedImages(result.assets.map(image => image.uri));
        } else {
            // Alert.alert("", "You did not select any image")
        }
    }

    const removeImage = (name) => {
        const filteredImages = selectedImages.filter(image => image !== name);
        setSelectedImages(filteredImages);
    }

    const getCategory = async () => {

        const { data } = await getCategoryAPI(id);

        if (data.success) {
            setCategory(data.category);
        } else {
            Alert.alert('', 'Cannot fetch data category');
            setLoading(false)
        }

    }

    useFocusEffect(
        useCallback(() => {
            getCategory()
        }, [])
    )

    const handeSubmit = async (values) => {

        setLoading(true)
        if (selectedImages.length > 0) {
            values.images = selectedImages;
        }
        const { data } = await updateCategoryAPI({
            id: id,
            values: values
        });

        if (data.success) {

            ToastEmmitter.success('Updated', data.message)
            setLoading(false)
            setTimeout(() => {
                navigation.navigate('Categories')
            }, 1000)

        } else {
            setLoading(false)
            ToastEmmitter.error('Error occured', data?.message)
        }
    }

    return (
        <Container style={{ backgroundColor: '#fff' }}>
            {/* <Text fontSize={18} >Add New Category</Text> */}
            <Portal>
                <Modal visible={visible}>
                    <Box backgroundColor={'#fff'}>
                        <Box height={'100%'} p={3} borderWidth={1} borderRadius="md" borderColor={'gray.300'}>
                            <ScrollView>
                                <Flex flexWrap="wrap" width={'100%'} py={5}>
                                    {category?.images?.length > 0 ?
                                        <>
                                            {category?.images?.map((image, index) => (
                                                <View
                                                    key={index}
                                                >
                                                    {/* <Button onPress={() => removeImage(image)} position={'absolute'} zIndex={2} colorScheme={'danger'} p={1} variant={'solid'} size={'xs'} right={3} top={2}>
                                                <Text fontSize={12} >Remove</Text>
                                            </Button> */}
                                                    <Image
                                                        alt='image'
                                                        width={'100%'}
                                                        style={{ flex: 1, aspectRatio: 1, margin: 4 }}
                                                        source={{ uri: image?.url || 'https://via.placeholder.com/300' }}
                                                    />
                                                </View>
                                            ))}
                                        </> :
                                        <Text textAlign={'center'} width={'100%'}>No image available</Text>
                                    }
                                </Flex>
                            </ScrollView>
                            <Button onPress={() => setVisible(!visible)}>
                                <Text fontSize={12}>Close</Text>
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Portal>
            {/* <Text fontSize={16} fontWeight={500} color={'gray.600'} width={'100%'} textAlign={'center'} my={1}>CREATE CATEGORY</Text> */}
            <Formik
                key={category._id}
                validationSchema={CategoryValidation}
                initialValues={{ name: category.name, description: category.description, images: '' }}
                onSubmit={(values) => handeSubmit(values)}
                validateOnBlur={false}
                validateOnChange={true}
                validateOnMount={false}
            >
                {({ handleBlur, handleSubmit, handleChange, setValues, resetForm, values, errors, touched }) => (
                    <VStack space={3} containerStyle={{ width: '100%' }} p={2} display={'flex'}>
                        {console.log(errors)}
                        <FormControl isInvalid={errors.name}>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input
                                nativeID='name'
                                value={values.name}
                                onChangeText={handleChange('name')}
                                fontSize={15}
                                placeholder='Enter name'
                                width={'100%'}
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size={'xs'} />}>
                                {errors.name}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.description}>
                            <FormControl.Label>Description</FormControl.Label>
                            <Input
                                nativeID='description'
                                value={values.description}
                                onChangeText={handleChange('description')}
                                placeholder='Enter description'
                                width={'100%'}
                                numberOfLines={5}
                                multiline={true}
                                textAlignVertical='top'
                                fontSize={15}
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size={'xs'} />}>
                                {errors.description}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl mt={2}>
                            {/* <FormControl.Label>Images</FormControl.Label> */}
                            <Box minH={200} maxHeight={300} p={3} borderWidth={1} borderRadius="md" borderColor={'gray.300'}>
                                {selectedImages.length > 0 ?
                                    <ScrollView>
                                        <Flex flexWrap="wrap" width={'100%'}>
                                            {selectedImages?.map((image, index) => (
                                                <View
                                                    key={index}
                                                >
                                                    <Button onPress={() => removeImage(image)} position={'absolute'} zIndex={2} colorScheme={'danger'} p={1} variant={'solid'} size={'xs'} right={3} top={2}>
                                                        {/* <MaterialCommunityIcons name={'delete'} size={20} /> */}
                                                        <Text fontSize={12} >Remove</Text>
                                                    </Button>
                                                    <Image
                                                        alt='image'
                                                        width={'100%'}
                                                        style={{ flex: 1, aspectRatio: 1, margin: 4 }}
                                                        source={{ uri: image || 'https://via.placeholder.com/300' }}
                                                    />
                                                </View>
                                            ))}
                                        </Flex>
                                    </ScrollView> :
                                    <Box width={'100%'} marginY={'auto'} style={{ gap: 10 }} justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
                                        <Button textAlign={'center'} colorScheme={'black'} onPress={() => setVisible(!visible)} width={'75%'} variant={'outline'} size={'sm'}
                                            startIcon={
                                                <MaterialCommunityIcons name={'eye-outline'} size={20} color={'gray'} />
                                            }
                                        >
                                            <Text color={'gray.500'}>Previous Images</Text>
                                        </Button>
                                        <Button textAlign={'center'} colorScheme={'black'} onPress={uploadPhoto} width={'75%'} variant={'outline'} size={'sm'}
                                            startIcon={
                                                <Icon>
                                                    <AddIcon />
                                                </Icon>
                                            }
                                        >
                                            <Text color={'gray.500'}>Add Image</Text>
                                        </Button>
                                    </Box>
                                }
                            </Box>

                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size={'xs'} />}>
                                Try different from previous passwords.
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Box display={'flex'} flexDir={'row'} justifyContent={'center'} style={{ gap: 10 }} >

                            <Button onPress={() => {
                                setLoading(false)
                                setValues({
                                    name: '',
                                    description: '',
                                    images: '',
                                })
                                setSelectedImages([]);
                            }} size={'xs'} colorScheme={'rose'} width={120}>
                                <Text color={'#fff'}>Clear</Text>
                            </Button>

                            <RNButton disabled={loading} loading={loading} onPress={handleSubmit} buttonStyle={styles.rnButton}
                                title={<Text color={'#fff'}>Update</Text>} />

                        </Box>
                    </VStack>
                )}
            </Formik>
        </Container >
    )
}

const styles = StyleSheet.create({
    rnButton: {
        height: 40,
        width: 120
    }
})