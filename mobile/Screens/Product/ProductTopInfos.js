import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { Fragment, useCallback, useState } from 'react'
import styles from './ProductDetails.Styles'
import { Image, ScrollView } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { totalItemPrice } from '../../utils/computations'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';
import SyncStorage from 'sync-storage'
import { useFocusEffect } from '@react-navigation/native'

export default function ProductTopInfos({ product, selectedSize }) {

    const [selectedImage, setSelectedImage] = useState(product?.images[0]?.url);

    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0);
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
            <View style={[styles.topContainer, { paddingTop: 15 }]}>
                <Image alt='image' style={styles.selectedImage}
                    source={{ uri: selectedImage }}
                />
                <View style={styles.imagesContainer}>
                    <ScrollView horizontal={true}>
                        {product?.images.map((image, i) => (
                            <Fragment key={i + "asd"}>
                                <TouchableOpacity onPress={() => setSelectedImage(image?.url)}>
                                    <Image alt='image' style={styles.images} source={{ uri: image?.url }} />
                                </TouchableOpacity>
                            </Fragment>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.productName, { fontWeight: 600, }]}>{product.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name={'star'} color={'green'} size={17} />
                    <Text style={{ color: '#111111', fontSize: 18 }}>{Number.parseFloat(rating).toFixed(1)} - </Text>
                    <Text style={{ color: '#111111', fontSize: 18 }}>{totalReviews}</Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>{product.category.name}</Text>
                <Text style={styles.productName}>₱{totalItemPrice(1, selectedSize, product.price)}</Text>
            </View>
        </>
    )
}