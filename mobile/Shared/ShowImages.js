import { View, Text } from 'react-native'
import React from 'react'
import { Portal } from 'react-native-paper'
import { Box, Button, Flex, Image, ScrollView } from 'native-base'
import { Modal, } from 'react-native-paper'

export default function ShowImages({ images, show, setShow }) {
    return (
        <Portal>
            <Modal visible={show}>
                <Box backgroundColor={'#fff'}>
                    <Box height={'100%'} p={3} borderWidth={1} borderRadius="md" borderColor={'gray.300'}>
                        <ScrollView>
                            <Flex flexWrap="wrap" width={'100%'} py={5}>
                                {images?.length > 0 ?
                                    <>
                                        {images?.map((image, index) => (
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
                        <Button onPress={() => setShow(!show)}>
                            <Text fontSize={12}>Close</Text>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Portal>
    )
}

