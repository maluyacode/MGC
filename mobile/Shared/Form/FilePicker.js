import { View, Text } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { AddIcon, Box, Button, Flex, Icon, Image, ScrollView, Spinner, VStack } from 'native-base';

export default function FilePicker({ onPick, oldImages = [] }) {

    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const uploadPhoto = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            multiple: true,
            type: 'image/*'
        })

        if (!result.canceled) {

            setSelectedImages(result.assets.map(image => image.uri));
            onPick(result.assets.map(image => image.uri))
        } else {
            // Alert.alert("", "You did not select any image")
        }
    }

    const removeImage = async (name) => {
        const filteredImages = selectedImages.filter(image => image !== name);
        onPick(filteredImages)
        setSelectedImages(filteredImages);
        return;
    }

    const handleUpload = async () => {
        await uploadPhoto()
        setLoading(false)
    }

    const handleRemove = async (name) => {
        await removeImage(name)
        setLoading(false)
    }

    return (
        <Box minH={200} maxHeight={300} p={3} borderWidth={1} borderRadius="md">
            {!loading ?
                <>
                    {selectedImages.length > 0 ?
                        <ScrollView nestedScrollEnabled={true}>
                            <Flex flexWrap="wrap" width={'100%'}>
                                {selectedImages?.map((image, index) => (
                                    <View
                                        key={index}
                                    >
                                        <Button onPress={() => {
                                            setLoading(true)
                                            setTimeout(() => {
                                                handleRemove(image)
                                            }, 200)
                                        }} position={'absolute'} zIndex={2} colorScheme={'danger'} p={1} variant={'solid'} size={'xs'} right={3} top={2}>
                                            {/* <MaterialCommunityIcons name={'delete'} size={20} /> */}
                                            <Text fontSize={12} >Remove</Text>
                                        </Button>
                                        <Image
                                            alt='image'
                                            width={'100%'}
                                            style={{ flex: 1, aspectRatio: 1, margin: 4 }}
                                            source={{ uri: image }}
                                        />
                                    </View>
                                ))}
                            </Flex>
                        </ScrollView> :
                        <Button textAlign={'center'} colorScheme={'black'} onPress={() => {
                            setLoading(true)
                            handleUpload()
                        }} width={'75%'} margin={'auto'} variant={'outline'} size={'sm'}
                            startIcon={
                                <Icon>
                                    <AddIcon />
                                </Icon>
                            }
                        >
                            <Text color={'gray.500'}>Upload Image</Text>
                        </Button>
                    }
                </> :
                <VStack space={3} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size={'sm'} />
                    <Text>Loading images...</Text>
                </VStack>
            }
        </Box>
    )
}