import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React, { Fragment, useRef, useState } from 'react'
import Container from '../../Shared/Container';
import { Box, Button, FlatList, FormControl, Icon, Input, Modal, ScrollView } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ButtonGroup } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import { Rating } from 'react-native-ratings'
import styles from './ProductDetails.Styles'
import ProductTopInfos from './ProductTopInfos';
import ProductReviews from './ProductReviews';
import SyncStorage from 'sync-storage'
import ToastEmmitter from '../../Shared/ToastEmmitter';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../Redux/Actions/cartActions';
import { totalItemPrice } from '../../utils/computations';
import { useNavigation } from '@react-navigation/native';

const completeCustomOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetails({ route }) {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart);
    const product = route.params;

    const buttons = ['Description', 'Reviews']
    product.sizes = completeCustomOrder.filter(size => product.sizes.includes(size));

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const [modalVisible, setModalVisible] = React.useState(false);
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const toggleColor = (color) => {
        setSelectedColor(color)
    }

    const toggleSize = (size) => {
        setSelectedSize(size)
    }

    const handleSubmit = () => {

        const cartItem = {
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
            product: product,
        }

        const data = dispatch(addCart(cartItem));

        if (data.success) {
            ToastEmmitter.success(data.message);
        } else {
            ToastEmmitter.error(data.message);
        }

    }

    return (
        <>
            <Modal size={'full'} animationPreset='slide' isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
                <Modal.Content style={{
                    marginBottom: 0,
                    marginTop: "auto",
                }}>
                    <Modal.Header width={'100%'}>
                        {/* <Text>
                            {product.name} - ₱{product.price}
                        </Text> */}
                        Quantity
                    </Modal.Header>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <FormControl style={[styles.flexRow, { gap: 10, justifyContent: 'center', marginTop: 15 }]}>
                            <Button onPress={() => {
                                if (quantity <= 1) {
                                    return;
                                } else {
                                    setQuantity(quantity - 1); // Use quantity - 1 to decrement the quantity
                                }
                            }}>
                                <MaterialCommunityIcons name={'minus'} />
                            </Button>
                            <Text style={{ fontSize: 16, width: '50%', height: 40, borderWidth: 1, borderColor: 'rgb(12, 12, 12)', borderRadius: 5, textAlign: 'center', textAlignVertical: 'center' }}>
                                {quantity}
                            </Text>
                            <Button onPress={() => {
                                if (product.stock <= quantity) {
                                    return;
                                } else {
                                    setQuantity((prev) => prev + 1); // Use prev + 1 to increment the quantity
                                }
                            }}>
                                <MaterialCommunityIcons name={'plus'} />
                            </Button>
                        </FormControl>

                        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontStyle: 'italic' }}>Total:</Text>
                            <Text style={{ fontSize: 18, fontStyle: 'italic' }}>₱{totalItemPrice(quantity, selectedSize, product.price)}</Text>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button size={'sm'} width={'100%'} onPress={() => {
                                handleSubmit()
                                setModalVisible(false);
                            }}>
                                Confirm
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Container style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}>

                <ProductTopInfos selectedSize={selectedSize} product={product} />

                <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ marginBottom: 10 }}>Select Color</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={[styles.flexRow, styles.colorsContainer]}>
                            {product?.colors.map((color, i) => {
                                return (
                                    <Fragment key={i + color.name}>{selectedColor._id === color._id ?

                                        <TouchableOpacity onPress={() => toggleColor(color)}>
                                            <AntDesign name="checkcircle" size={30} color={`rgb(${color.rgb})`} />
                                        </TouchableOpacity> :

                                        <TouchableOpacity onPress={() => toggleColor(color)}>
                                            <View style={[styles.notSelectedcolor, {
                                                borderColor: `rgb(${color.rgb})`,
                                                backgroundColor: `rgb(${color.rgb})`,
                                            }]}></View>
                                        </TouchableOpacity>

                                    }</Fragment>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>

                <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ marginBottom: 10 }}>Select Size</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={[styles.flexRow, styles.colorsContainer]}>
                            {product?.sizes.map((size, i) => (
                                <Fragment key={i + size}>
                                    {selectedSize !== size ?
                                        <TouchableNativeFeedback onPress={() => toggleSize(size)}>
                                            <View style={[styles.notSelectedSize, styles.flexRow]}>
                                                <Text>{size}</Text>
                                            </View>
                                        </TouchableNativeFeedback> :

                                        <TouchableNativeFeedback onPress={() => toggleSize(size)}>
                                            <View style={[styles.selectedSize, styles.flexRow]}>
                                                <Text>{size}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    }
                                </Fragment>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <View style={[{ paddingHorizontal: 10, marginVertical: 10, gap: 5, justifyContent: 'center' }, styles.flexRow]}>
                    <Button>
                        <AntDesign name={'hearto'} size={20} />
                    </Button>
                    {cartItems?.find(item => item.product._id === product._id) ?

                        <Button style={{ width: '87%' }} onPress={() => console.log('GOTO CART')}>
                            <Text onPress={() => navigation.navigate('Cart')}> Go to Cart</Text>
                        </Button> :

                        <Button style={{ width: '87%' }} onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <Text>Add to Cart</Text>
                        </Button>

                    }
                </View>

                <View style={{ marginVertical: 10 }}>
                    <ButtonGroup
                        onPress={(value) => setSelectedIndex(value)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 35, width: 250 }}
                        selectedButtonStyle={{ backgroundColor: '#67729D' }}
                    />
                </View>
                {selectedIndex === 0 ?
                    <View style={{ paddingHorizontal: 12, paddingBottom: 20 }}>
                        <Text>{product?.description}</Text>
                    </View>
                    :
                    <ProductReviews product={product} />
                }

            </Container >
        </>
    )
}

