import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './ProductDetails.Styles'
import { Image, ScrollView } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { totalItemPrice } from '../../utils/computations'

export default function ProductTopInfos({ product, selectedSize }) {

    return (
        <>
            <View style={styles.topContainer}>
                <Image alt='image' style={styles.selectedImage}
                    source={{ uri: product?.images[0]?.url }}
                />
                <View style={styles.imagesContainer}>
                    <ScrollView >
                        {product?.images.map((image, i) => (
                            <TouchableOpacity key={i}>
                                <Image alt='image' style={styles.images} source={{ uri: image?.url }} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.productName, { fontWeight: 600, }]}>{product.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name={'star'} color={'green'} size={17} />
                    <Text>4.9 - </Text>
                    <Text style={{ color: '#111111' }}>120</Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>{product.category.name}</Text>
                <Text style={styles.productName}>₱{totalItemPrice(1, selectedSize, product.price)}</Text>
            </View>
        </>
    )
}