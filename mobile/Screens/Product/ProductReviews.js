import { View, Text } from 'react-native'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import styles from './ProductDetails.Styles'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import SyncStorage from 'sync-storage'

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

export default function ProductReviews({ product }) {

    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);

    const getReviews = async () => {

        try {

            const { data } = await axios.get(`${baseURL}/review/${product._id}/product`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                setReviews(data.reviews);
                setRating(data.rating);
                setTotalReviews(data.totalReviews);
            } else {
                // setLoading(false)
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Fetching Error", "Cannot fetch reviews")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getReviews()
        }, [product._id])
    )

    return (
        <>
            {totalReviews <= 0 && (
                <Text style={{ marginLeft: 20, paddingBottom: 20 }}>No reviews yet</Text>
            )}
            {reviews.map(review => (
                <Fragment key={review._id}>
                    {console.log(review.user)}
                    <View style={{ paddingHorizontal: 12, paddingBottom: 20, width: '100%', marginTop: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                            <Avatar.Image size={45} source={{ uri: review?.user?.image }} />
                            <View>
                                <Text style={{ marginLeft: 2 }}>{review?.user?.name}</Text>

                                <StarRating rating={5} />

                            </View>
                            <Text style={{ marginLeft: 'auto' }}>{new Date(review?.createdAt).toDateString()}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 5, marginTop: 10 }}>{review?.comment}</Text>
                    </View>
                </Fragment>
            ))}
        </>
    )
}