import { View, Text } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { AddIcon, Box, Button, Flex, Icon, Image, ScrollView } from 'native-base';

export default function FilePicker() {

    const [selectedImages, setSelectedImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);

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

    return (
        <Box minH={200} maxHeight={300} p={3} borderWidth={1} borderRadius="md">
            {selectedImages.length > 0 ?
                <ScrollView nestedScrollEnabled={true}>
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
                                    source={{ uri: image }}
                                />
                            </View>
                        ))}
                    </Flex>
                </ScrollView> :
                <Button textAlign={'center'} colorScheme={'black'} onPress={uploadPhoto} width={'75%'} margin={'auto'} variant={'outline'} size={'sm'}
                    startIcon={
                        <Icon>
                            <AddIcon />
                        </Icon>
                    }
                >
                    <Text color={'gray.500'}>Upload Image</Text>
                </Button>
            }
        </Box>
    )
}