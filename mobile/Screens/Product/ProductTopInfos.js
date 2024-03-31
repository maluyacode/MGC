import { View, Text, TouchableOpacity } from 'react-native'
import React, { Fragment, useState } from 'react'
import styles from './ProductDetails.Styles'
import { Image, ScrollView } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { totalItemPrice } from '../../utils/computations'

export default function ProductTopInfos({ product, selectedSize }) {

    const [selectedImage, setSelectedImage] = useState(product?.images[0]?.url);

    return (
        <>
            <View style={[styles.topContainer, { paddingTop: 15 }]}>
                <Image alt='image' style={styles.selectedImage}
                    source={{ uri: selectedImage }}
                />
                <View style={styles.imagesContainer}>
                    <ScrollView horizontal={true}>
                        {product?.images.map((image, i) => (
                            <Fragment key={i}>
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