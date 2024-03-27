import { View, StyleSheet, TextComponent, TouchableOpacity, FlatList } from 'react-native'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Divider, FormControl, HStack, Input, Modal, Spinner, VStack, Text, ScrollView } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import debounce from 'lodash.debounce';

export default function ColorPicker({ onSelection, data, selectedItems = [], ...props }) {

    const [filteredColors, setFilteredColors] = useState([]);
    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalShow, setModal] = useState(false);
    const [colors, setColors] = useState(data);
    const [selectedColors, setSelectedColors] = useState([]);
    const items = useRef()

    const searcher = async (word) => {
        const regex = new RegExp(word, 'i');
        const filteredItems = colors.filter(item => regex.test(item.name));
        return filteredItems;
    };

    const debouncedSearch = useCallback(debounce(async (value) => {
        setLoading(true);
        const result = await searcher(value);
        setFilteredColors(result);
        setLoading(false);
    }, 300), []);

    useEffect(() => {
        if (word.trim() === '') {
            setFilteredColors([]);
            setSelectedColors(selectedItems)
            setLoading(true);
            debouncedSearch(word);
        } else {
            debouncedSearch(word);
        }
    }, [word, debouncedSearch]);

    const toggleModal = () => {
        setModal(!isModalShow);
    };

    const onSelect = async (item) => {
        const index = selectedColors.findIndex(color => color.name === item.name);
        if (index === -1) {
            setSelectedColors([...selectedColors, item]);
            onSelection([...selectedColors, item]);
        } else {
            setSelectedColors(selectedColors.filter(color => color.name !== item.name));
            onSelection(selectedColors.filter(color => color.name !== item.name));
        }
    };


    return (
        <>
            <TouchableOpacity onPress={toggleModal} {...props}>
                <Box display={'flex'} flexDir={'row'} alignItems={'center'} px={3} style={{ width: '100%', height: 40, marginTop: 5, borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
                    <Text style={{ margin: 'auto' }} color={'gray.800'} fontWeight={400}> Select Color </Text>
                    <MaterialCommunityIcons name={'plus'} size={20} style={{ marginLeft: 'auto' }} />
                </Box>
            </TouchableOpacity >

            <Box mt={1} mb={3} style={{ gap: 10 }}>
                <ScrollView horizontal={true} py={2}>
                    {selectedColors?.length > 0 && selectedColors?.map((color, i) => (
                        <Box key={i} display={'flex'} flexDir={'row'} mr={2} alignItems={'center'} p={1} style={{ gap: 2, borderColor: 'gray', borderWidth: 1, borderRadius: 30 }}>
                            {Circle({ color: `rgb(${color.rgb})`, size: 15 })}
                            <Text style={{ fontSize: 18 }}>{color.name}</Text>
                            <TouchableOpacity onPress={() => {
                                setTimeout(() => {
                                    onSelect(color)
                                }, 200)
                            }}>
                                <MaterialCommunityIcons name={'close-circle'} size={20} color={'gray'} />
                            </TouchableOpacity>
                        </Box>
                    ))}
                </ScrollView>
            </Box>


            <Modal isOpen={isModalShow} >
                <Modal.Content width={'90%'} >
                    <Modal.Header>
                        <Input onChangeText={value => {
                            setLoading(true)
                            setWord(value)
                        }} style={styles.inputField} placeholder='Search colors...' />
                    </Modal.Header>
                    <View height={300} style={{ gap: 10, paddingHorizontal: 10, paddingVertical: 10 }} >
                        {loading ? (
                            <VStack space={3} justifyContent={'center'} alignItems={'center'}>
                                <Spinner size={'sm'} />
                                <Text>Searching colors...</Text>
                            </VStack>
                        ) : (
                            <FlatList
                                data={filteredColors}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <Fragment >
                                        <TouchableOpacity ref={items} onPress={() => onSelect(item)}>
                                            <Box style={{ paddingHorizontal: 5, paddingVertical: 20, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                {Circle({ color: `rgb(${item.rgb})`, size: 15 })}
                                                <Text style={{ fontSize: 18 }}>{item.name}</Text>
                                                {selectedColors.some(color => color.name === item.name) && (
                                                    <MaterialCommunityIcons style={{ marginLeft: 'auto' }} name={'check'} color={'green'} size={20} />
                                                )}
                                            </Box>
                                        </TouchableOpacity>
                                        <Divider />
                                    </Fragment>
                                )}
                                ListEmptyComponent={() => (
                                    <Text style={{ width: '100%', textAlign: 'center' }}>No available colors</Text>
                                )}
                            />
                        )}
                    </View>

                    <Modal.Footer>
                        <Button onPress={toggleModal} width={'100%'}>
                            <Text>Confirm</Text>
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
}

const Circle = ({ color, size }) => {
    const circleStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
    };

    return <View style={circleStyle} />;
};

const styles = StyleSheet.create({
    inputField: {
        fontSize: 16,
    },
});
