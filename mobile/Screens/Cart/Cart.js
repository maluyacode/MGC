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
import { useNavigation } from '@react-navigation/native'

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
        <Fragment key={item._id}>
            <View style={[styles.cartBox]}>

                <TouchableOpacity style={[styles.removeButton]} onPress={() => removeItem(item.product._id)}>
                    <MaterialCommunityIcons color={'#D37676'} size={25} name={'close-box'} />
                </TouchableOpacity>
                <Image
                    style={[{ width: 120, height: 120, borderRadius: 10, }]}
                    source={{ uri: item?.product?.images[0]?.url }}
                />
                <View style={[styles.itemInfo]}>
                    <Text style={[styles.itemName, { fontWeight: 700 }]}>{item?.product?.name}</Text>
                    <TouchableOpacity onPress={() => onSelect(item)}>
                        <Text style={{ color: '#31363F', textTransform: 'capitalize' }}>{item.color.name} <Text style={{ textTransform: 'uppercase' }}>{item.size}</Text></Text>
                    </TouchableOpacity>
                    <Box style={[styles.actionContainer]}>
                        <Text style={{ fontWeight: 700, color: '#31363F', fontSize: 16, marginTop: 5, marginRight: 'auto' }}>₱{totalItemPrice(item.quantity, item.size, item.product.price)}</Text>
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
        </Fragment>
    )
}

const totalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((accumulator, item) => {
        console.log(item);
        return accumulator + totalItemPrice(item.quantity, item.size, item.product.price);
    }, 0);

    return totalPrice;
}

const Cart = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
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
                                        <Fragment key={i}>
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
                                        </Fragment>
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
            {cartItems?.length > 0 ?
                < View style={[styles.container]}>
                    <Text style={{ marginBottom: 20 }}>Total ({cartItems?.length}) items</Text>
                    <View style={[styles.cartContainer,]}>
                        <FlatList
                            style={{ marginBottom: 100, }}
                            showsVerticalScrollIndicator={false}
                            data={cartItems}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                            ListFooterComponent={
                                <View style={styles.checkContainer}>
                                    <View style={[productStyles.flexRow, {
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: 10
                                    }]}>
                                        <Text>Total</Text>
                                        <Text style={{ fontSize: 20, fontWeight: 700 }}>₱ {totalPrice(cartItems)}</Text>
                                    </View>
                                    <Button colorScheme={'mycustom'} onPress={() => navigation.navigate('Shipping')}>
                                        <Text style={{ fontWeight: 600, letterSpacing: 2, color: '#fff' }}>SETTLE NOW</Text>
                                    </Button>
                                </View>
                            }
                        />
                    </View>
                </View > :
                <View style={[styles.container, { paddingHorizontal: 50 }]}>
                    <Image
                        source={{ uri: noItems }}
                        style={{ height: '40%', marginTop: 50 }}
                    />
                    <Text style={{ textAlign: 'center', width: '90%', color: '#67729D', fontWeight: 700, fontSize: 20, marginVertical: 20 }}>No items in cart</Text>
                    <Button colorScheme={'mycustom'} onPress={() => navigation.navigate('Home')} style={{ width: '87%' }}>Shop</Button>
                </View>
            }
        </>
    )
}

const noItems = 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4344468-3613896.png'

const styles = StyleSheet.create({
    checkContainer: {
        width: '90%',
        paddingHorizontal: 10,
    },
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
        justifyContent: 'space-between'
        // position: 'absolute',
        // bottom: 10,
        // right: -60,
        // width: '83%'
    },
    itemName: {
        fontSize: 14,
        width: '90%',
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
        elevation: 5,
        shadowColor: 'black',
        marginLeft: 3,
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
        minHeight: '90%',
    },
    cartContainer: {
        // paddingHorizontal: 10,
        marginRight: 17,
        // paddingBottom: 120,
    }
})

export default Cart