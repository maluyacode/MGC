import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import styles from './ProductDetails.Styles'

const StarRating = ({ rating }) => {

    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    return (
        <View style={{ width: 'auto', display: 'flex', flexDirection: 'row' }}>
            {[...Array(filledStars)].map((_, index) => (
                <AntDesign name={'star'} color={'yellow'} size={20} />
            ))}
            {[...Array(remainingStars)].map((_, index) => (
                <AntDesign name={'staro'} color={'yellow'} size={20} />
            ))}
        </View>
    )
}

export default function ProductReviews({ product }) {
    return (
        <>
            <View style={{ paddingHorizontal: 12, paddingBottom: 20, width: '100%', marginTop: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                    <Avatar.Image size={45} source={{ uri: product.images[0]?.url }} />
                    <View>
                        <Text style={{ marginLeft: 2 }}>Dave Merc Adlawan</Text>

                        <StarRating rating={5} />

                    </View>
                    <Text style={{ marginLeft: 'auto' }}>02 Jan 2024</Text>
                </View>
                <Text style={{ paddingHorizontal: 5, marginTop: 10 }}>Try Startup+ Now! Choose from our curated collection of Premium Screens to build your next project.</Text>
            </View>
            <View style={{ paddingHorizontal: 12, paddingBottom: 20, width: '100%', marginTop: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                    <Avatar.Image size={45} source={{ uri: product.images[0]?.url }} />
                    <View>
                        <Text style={{ marginLeft: 2 }}>Dave Merc Adlawan</Text>
                        <StarRating rating={5} />
                    </View>
                    <Text style={{ marginLeft: 'auto' }}>02 Jan 2024</Text>
                </View>
                <Text style={{ paddingHorizontal: 5, marginTop: 10 }}>Try Startup+ Now! Choose from our curated collection of Premium Screens to build your next project.</Text>
            </View>
        </>
    )
}