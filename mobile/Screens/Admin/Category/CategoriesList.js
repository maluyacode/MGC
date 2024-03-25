import { View, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
// import Button from '../../../Shared/Form/Button'
import { DataTable, } from 'react-native-paper';
import { getCategoriesAPI } from '../../../API/categoryApi';
import { AddIcon, Box, Button, Divider, Input, ScrollView, SearchIcon, Text } from 'native-base';
import Container from '../../../Shared/Container'
import ListItems from './ListItems';
import { useFocusEffect } from '@react-navigation/native';

export default function CategoriesList({ navigation }) {

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 100]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState([]);

    const getAllCategories = async () => {

        const { data } = await getCategoriesAPI();

        if (data.success) {
            setItems(data.categories);
        } else {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllCategories()
        }, [])
    )


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <View>
                <Box style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between', padding: 5, height: 45 }}>
                    <Input width={'85%'} placeholder='Search' leftElement={
                        <View style={{ marginHorizontal: 10, marginRight: -5 }}>
                            <SearchIcon />
                        </View>
                    } />
                    <Button variant={'outline'} size={'xs'} borderColor={'#67729D'} onPress={() => navigation.navigate('CategoryCreate')} >
                        <AddIcon />
                        {/* <Text color={'gray.500'}>Add New</Text> */}
                    </Button>
                </Box>
                <DataTable style={{ marginTop: -10 }}>
                    <DataTable.Header>
                        <DataTable.Title>Image</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Description</DataTable.Title>
                    </DataTable.Header>
                    <View style={{ maxHeight: '73%' }}>
                        <ScrollView >
                            {items.slice(from, to).map((item, i) => (
                                <ListItems item={item} key={i} />
                                // <DataTable.Row key={i} style={{ paddingVertical: 5 }} onLongPress={() => console.log("Edit/Delete")} onPress={() => console.log('View')}>
                                //     <DataTable.Cell>
                                //         <Box>
                                //             <Image source={{ uri: item?.images[0] }} width={50} height={50} />
                                //         </Box>
                                //     </DataTable.Cell>
                                //     <DataTable.Cell>{item.name}</DataTable.Cell>
                                //     <DataTable.Cell>{item.description}</DataTable.Cell>
                                // </DataTable.Row>
                            ))}
                        </ScrollView>
                    </View>
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${items.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable>
            </View>
        </>
    )
}