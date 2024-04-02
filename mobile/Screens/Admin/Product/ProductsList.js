import { View, Text, Dimensions, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AddIcon, Box, Button, Image, Input, ScrollView, SearchIcon } from 'native-base'
import { DataTable } from 'react-native-paper'
import { getProductsAPI, productDeleteAPI } from '../../../API/productAPI';
import { useFocusEffect } from '@react-navigation/native';
import ListItems from './ListItems';
import ToastEmmitter from '../../../Shared/ToastEmmitter';

const { height } = Dimensions.get('window');

export default function ProductsList({ navigation }) {

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 100]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const getAllProducts = async () => {

        const { data } = await getProductsAPI();
        if (data.success) {
            setItems(data.products);
            setFilteredItems(data.products);
        } else {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllProducts()
            handleSearch("");
        }, [])
    )

    const deleteProduct = async (id) => {
        const { data } = await productDeleteAPI({
            id: id,
        })
        if (data.success) {
            ToastEmmitter.success('Deleted', data.message);
            getAllProducts()
        } else {
            Alert.alert('', 'Cannot delete data category');
            setLoading(false)
        }
    }

    const handleSearch = (keyword) => {

        const regex = new RegExp(keyword, 'i');
        const filteredItems = items.filter(item => regex.test(item.name)
        );
        setFilteredItems(filteredItems);

    }

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items?.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <View style={{ height: '90%' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between', padding: 5, height: 45 }}>
                    <Input onChangeText={value => handleSearch(value)} width={'85%'} placeholder='Search' leftElement={
                        <View style={{ marginHorizontal: 10, marginRight: -5 }}>
                            <SearchIcon />
                        </View>
                    } />
                    <Button variant={'outline'} size={'xs'} borderColor={'#67729D'} onPress={() => navigation.navigate('ProductCreate')} >
                        <AddIcon />
                        {/* <Text color={'gray.500'}>Add New</Text> */}
                    </Button>
                </Box>
                <DataTable style={{ marginTop: -10, minHeight: '100%' }}>
                    <DataTable.Header>
                        <DataTable.Title>Image</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Stock</DataTable.Title>
                        <DataTable.Title>Description</DataTable.Title>
                    </DataTable.Header>
                    <View style={{ maxHeight: '80%' }}>
                        <FlatList
                            data={filteredItems?.slice(from, to)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <ListItems item={item} key={index} deleteUser={deleteProduct} />
                            )}
                        />
                    </View>
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items?.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${items?.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Page rows'}
                        style={{
                            justifyContent: 'center'
                        }}
                    />
                </DataTable>
            </View>
        </>
    )
}