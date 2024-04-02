import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import Container from '../../../Shared/Container';
import { CheckIcon, Divider, Select } from 'native-base';
import { getProductAPI, getProductsAPI } from '../../../API/productAPI';
import baseURL from '../../../assets/common/baseUrl';
import axios from 'axios';
import SyncStorage from 'sync-storage'
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function Reviews() {

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10, 20, 100]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState();
    const [reviews, setReviews] = useState([]);


    const getProducts = async () => {
        const { data } = await getProductsAPI();
        setProducts(data.products || [])
        setId(data.products[0]._id)
    }

    const getReviews = async () => {

        try {

            const { data } = await axios.get(`${baseURL}/review/${id}/product`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                setReviews(data.reviews);
            } else {
                // setLoading(false)
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Fetching Error", "Cannot fetch reviews")
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (id) {
            getReviews()
        }
    }, [id])

    return (
        <Container style={styles}>
            <Select marginLeft={'auto'} marginRight={'auto'} fontSize={16} borderColor={'#67729D'} colorScheme={'mycustom'} width={'90%'} selectedValue={id} marginY={5} accessibilityLabel="Choose Service" placeholder="Choose Product" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setId(itemValue)}>
                {products?.map(product => (
                    <Select.Item key={product._id} label={product.name} value={product._id} />
                ))}
            </Select>
            {reviews.length <= 0 && (
                <Text style={{ marginLeft: 20, paddingBottom: 20 }}>No reviews yet</Text>
            )}
            <Divider />
            {reviews?.map(review => (
                <Fragment key={review._id}>
                    {console.log(review.user)}
                    <View style={{ marginLeft: 'auto', marginRight: 'auto', paddingHorizontal: 12, paddingBottom: 20, width: '90%', marginTop: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                            <Avatar.Image size={45} source={{ uri: review?.user?.image }} />
                            <View>
                                <Text style={{ marginLeft: 2 }}>{review?.user?.name}</Text>

                                <StarRating rating={review.rating} />

                            </View>
                            <Text style={{ marginLeft: 'auto' }}>{new Date(review?.createdAt).toDateString()}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 5, marginTop: 10 }}>{review?.comment}</Text>
                    </View>
                    <Divider />
                </Fragment>
            ))}
        </Container>
    )
}

const StarRating = ({ rating }) => {

    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    return (
        <View style={{ width: 'auto', display: 'flex', flexDirection: 'row' }}>
            {[...Array(filledStars)].map((_, index) => (
                <AntDesign key={index} name={'star'} color={'yellow'} size={20} />
            ))}
            {[...Array(remainingStars)].map((_, index) => (
                <AntDesign key={index} name={'staro'} color={'yellow'} size={20} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})
