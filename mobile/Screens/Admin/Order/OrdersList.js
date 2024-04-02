import { View, Text, Alert, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';
import SyncStorage from 'sync-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AddIcon, Box, Button, Input, SearchIcon } from 'native-base';
import { ButtonGroup } from 'react-native-elements'
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('window')

const status = ['Pending', 'Confirmed', 'Shipped', 'Delivered', "Cancelled"]

export default function OrdersList() {

    const navigation = useNavigation()
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 100]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const getAllOrders = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/order?status=${status[selectedIndex]}`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                setItems(data.orders);
                setFilteredItems(data.orders);
            } else {
                // setLoading(false)
            }
        } catch (err) {
            Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    const handleSearch = (keyword) => {

        const regex = new RegExp(keyword, 'i');
        const filteredItems = items.filter(item => regex.test(item.user.name) ||
            regex.test(item.shippingInfo.address)
        );
        setFilteredItems(filteredItems);

    }

    useFocusEffect(
        useCallback(() => {
            getAllOrders()
            handleSearch("");
        }, [])
    )

    useEffect(() => {
        getAllOrders()
    }, [selectedIndex])

    const handleView = (id) => {
        navigation.navigate('OrderDetails', id);
    }

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items?.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <Box style={styles.container}>
            <ButtonGroup
                buttons={status}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    console.log(value)
                    setSelectedIndex(value);
                }}
                textStyle={{ fontSize: 12 }}
                containerStyle={styles.buttonsStyle}
            />
            {filteredItems.length > 0 ?
                <>
                    <View style={styles.containerAction}>
                        <Input onChangeText={value => handleSearch(value)} width={'100%'} placeholder='Search' leftElement={
                            <View style={{ marginHorizontal: 10, marginRight: -5 }}>
                                <SearchIcon />
                            </View>
                        } />
                    </View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Order ID</DataTable.Title>
                            <DataTable.Title>User</DataTable.Title>
                            <DataTable.Title>Total Price</DataTable.Title>
                            <DataTable.Title>Delivery Address</DataTable.Title>
                        </DataTable.Header>
                        <View style={{ maxHeight: '80%' }}>
                            <ScrollView >
                                {filteredItems?.slice(from, to).map((item, i) => (
                                    // <ListItems item={item} key={i} deleteProduct={deleteProduct} />
                                    <DataTable.Row key={i} style={{ paddingVertical: 5 }} onLongPress={() => console.log("Edit/Delete")} onPress={() => handleView(item._id)}>
                                        <DataTable.Cell>
                                            {item._id}
                                        </DataTable.Cell>
                                        <DataTable.Cell>{item.user.name}</DataTable.Cell>
                                        <DataTable.Cell>{item.totalPrice}</DataTable.Cell>
                                        <DataTable.Cell >{item.shippingInfo.address}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </ScrollView>
                        </View>
                        {/* <DataTable.Pagination
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
                /> */}
                    </DataTable>
                </>
                :
                <Text style={{ textAlign: 'center', marginVertical: 10 }}> No {status[selectedIndex]} Orders Available </Text>
            }

        </Box >
    )
}

const styles = StyleSheet.create({
    buttonsStyle: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    container: {
        width: width,
        minHeight: '100%',
    },
    containerAction: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'space-between',
        padding: 5,
        height: 45
    },
})