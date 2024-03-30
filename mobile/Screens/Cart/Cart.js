import { Box, Button, CloseIcon, Container, FlatList, Modal, ScrollView } from 'native-base'
import React, { Fragment, useRef, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native'
import { AntDesign, FontAwesome as Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import SyncStorage from 'sync-storage'
import { addQuantity, changeColor, changeSize, reduceQuantity, removeCartItem } from '../../Redux/Actions/cartActions'
import ToastEmmitter from '../../Shared/ToastEmmitter'
import productStyles from '../Product/ProductDetails.Styles'
import { totalItemPrice } from '../../utils/computations'

var { width } = Dimensions.get('window');

const sampleImg = 'https://www.dlxprint.com/img/t-shirts_printing_dubai_01.jpg'

const CartItem = ({ item, onSelect }) => {

    const disptach = useDispatch();

    const reduceItemQuantity = (id) => {
        disptach(reduceQuantity(id));
    }

    const addItemQuantity = (id) => {
        disptach(addQuantity(id));
    }

    const removeItem = (id) => {
        const data = disptach(removeCartItem(id));
        if (data.success) {
            ToastEmmitter.success(data.message)
        } else {
            ToastEmmitter.success(data.message)
        }
    }

    return (
        <>
            <View key={item._id} style={[styles.cartBox]}>
                <MaterialCommunityIcons onPress={() => removeItem(item.product._id)} style={[styles.removeButton]} color={'#D37676'} size={25} name={'close-box'} />
                <Image
                    style={[{ width: 120, height: 120, borderRadius: 10, }]}
                    source={{ uri: item?.product?.images[0].url }}
                />
                <View style={[styles.itemInfo]}>
                    <Text style={[styles.itemName, { fontWeight: 700 }]}>{item?.product?.name}</Text>
                    <TouchableOpacity onPress={() => onSelect(item)}>
                        <Text style={{ color: '#31363F', textTransform: 'capitalize' }}>{item.color.name} <Text style={{ textTransform: 'uppercase' }}>{item.size}</Text></Text>
                    </TouchableOpacity>
                    <Box style={[styles.actionContainer]}>
                        <Text style={{ color: '#31363F', fontSize: 18, marginTop: 5, marginRight: 'auto' }}>P{totalItemPrice(item.quantity, item.size, item.product.price)}</Text>
                        <Button onPress={() => reduceItemQuantity(item.product._id)} variant={'unstyled'} style={[styles.buttons]} size={'xs'}>
                            <Feather name="minus" size={20} color="#31363F" />
                        </Button>
                        <Text style={[styles.quantity]}>{item.quantity}</Text>
                        <Button onPress={() => addItemQuantity(item.product._id)} variant={'unstyled'} style={[styles.buttons]} size={'xs'}>
                            <Feather name="plus" size={19} color="#31363F" />
                        </Button>
                    </Box>
                </View>
            </View>
        </>
    )
}

const Cart = () => {

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart);

    const [selectedItem, setSelectedItem] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const handleSelect = (item) => {
        setSelectedItem(item)
        setIsOpen(true)
    }

    const toggleColor = (color) => {
        dispatch(changeColor({
            productId: selectedItem.product._id,
            color: color
        }))
    }

    const toggleSize = (size) => {

        dispatch(changeSize({
            productId: selectedItem.product._id,
            size: size
        }))
    }

    const renderItem = ({ item }) => <CartItem onSelect={handleSelect} item={item} />

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
                <Modal.Content>
                    <Modal.Header>
                        {/* Change Options  */}
                        {selectedItem?.product?.name}
                    </Modal.Header>
                    {/* <Modal.CloseButton onPress={() => setIsOpen(false)} /> */}
                    <Modal.Body>
                        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Select Color</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={[productStyles.flexRow, productStyles.colorsContainer]}>
                                    {selectedItem.product?.colors.map((color, i) => {
                                        return (
                                            <Fragment key={i}>{cartItems.find(item => item.product._id === selectedItem.product._id).color._id === color._id ?
                                                <TouchableOpacity onPress={() => toggleColor(color)}>
                                                    <AntDesign style={{ borderRadius: 50, borderWidth: 1, borderColor: '#31363F' }} name="checkcircle" size={35} color={`rgb(${color.rgb})`} />
                                                </TouchableOpacity> :

                                                <TouchableOpacity onPress={() => toggleColor(color)}>
                                                    <View style={[productStyles.notSelectedcolor, {
                                                        borderColor: `#31363F`,
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
                                <View style={[productStyles.flexRow, productStyles.colorsContainer]}>
                                    {selectedItem.product?.sizes.map((size, i) => (
                                        <>
                                            {cartItems.find(item => item.product._id === selectedItem.product._id).size !== size ?
                                                <TouchableNativeFeedback onPress={() => toggleSize(size)}>
                                                    <View style={[productStyles.notSelectedSize, productStyles.flexRow]}>
                                                        <Text>{size}</Text>
                                                    </View>
                                                </TouchableNativeFeedback> :

                                                <TouchableNativeFeedback onPress={() => toggleSize(size)}>
                                                    <View style={[productStyles.selectedSize, productStyles.flexRow]}>
                                                        <Text>{size}</Text>
                                                    </View>
                                                </TouchableNativeFeedback>
                                            }
                                        </>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                        <Modal.Footer>
                            <Button width={'100%'} onPress={() => setIsOpen(false)}>
                                <Text>Confirm</Text>
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <View style={[styles.container]}>
                <Text style={{ marginBottom: 20 }}>Total ({cartItems?.length}) items</Text>
                <View style={[styles.cartContainer,]}>
                    <FlatList
                        style={{ marginBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    removeButton: {
        position: 'absolute',
        zIndex: 2,
        right: 5,
        top: 4,
        padding: 0,
    },
    quantity: {
        // borderColor: 'gray',
        // borderStyle: 'dashed',
        // borderWidth: 1,
        backgroundColor: '#67729D10',
        width: 50,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    actionContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        // position: 'absolute',
        // bottom: 10,
        // right: -60,
        width: '83%'
    },
    itemName: {
        fontSize: 18,
        // width: '80%',
        marginBottom: 5,
        color: '#31363F'
    },
    itemInfo: {
        padding: 10
    },
    cartBox: {
        backgroundColor: '#FED9ED',
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: 20,
        shadowOpacity: 1,
        shadowRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        // padding: 15,
        // alignItems: 'center'
    },
    container: {
        width: width + 50,
        backgroundColor: '#FED9ED',
        paddingHorizontal: 12,
        minHeight: '100%'
    },
    cartContainer: {
        marginHorizontal: 10,
        // paddingBottom: 120,
    }
})

export default Cart