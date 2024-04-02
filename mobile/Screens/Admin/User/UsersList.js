import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import SyncStorage from 'sync-storage'
import baseURL from '../../../assets/common/baseUrl';
import { AddIcon, Box, Button, Input, SearchIcon } from 'native-base';
import { DataTable } from 'react-native-paper';
import ListItems from './ListItems';

const { height } = Dimensions.get('window');

export default function UsersList({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 100]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items?.length);

    const getAllUsers = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/users`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            console.log(data)

            if (data.success) {
                setItems(data.users)
                setFilteredItems(data.users)
            } else {
                // setLoading(false)
            }

        } catch (err) {
            console.log(err)
            // Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllUsers()
            handleSearch("")
        }, [])
    )

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const deleteUser = async (id) => {
        try {

            const { data } = await axios.delete(`${baseURL}/users/${id}`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
               getAllUsers()
            } else {
                // setLoading(false)
            }

        } catch (err) {
            console.log(err)
            // Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    const handleSearch = (keyword) => {
        const regex = new RegExp(keyword, 'i');
        const filteredItems = items.filter(item => regex.test(item.name) || regex.test(item.name)
        );
        setFilteredItems(filteredItems);
    }

    return (
        <>
            <View style={{ height: '90%' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between', padding: 5, height: 45 }}>
                    <Input onChangeText={value => handleSearch(value)} width={'85%'} placeholder='Search' leftElement={
                        <View style={{ marginHorizontal: 10, marginRight: -5 }}>
                            <SearchIcon />
                        </View>
                    } />
                    <Button variant={'outline'} size={'xs'} borderColor={'#67729D'} onPress={() => navigation.navigate('UserCreate')} >
                        <AddIcon />
                    </Button>
                </Box>
                <DataTable style={{ marginTop: -10, minHeight: '100%' }}>
                    <DataTable.Header>
                        <DataTable.Title>Profile</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title numeric>Email</DataTable.Title>
                        <DataTable.Title numeric>Role</DataTable.Title>
                    </DataTable.Header>
                    <View style={{ maxHeight: '80%' }}>
                        <FlatList
                            data={filteredItems?.slice(from, to)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <ListItems item={item} key={index} deleteUser={deleteUser} />
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