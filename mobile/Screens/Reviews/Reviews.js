import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { Fragment, useCallback, useState } from 'react'
import { Box, Button, FormControl, Input, Modal } from 'native-base'
import { ButtonGroup, Rating } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import Container from '../../Shared/Container'
import axios from 'axios'
import SyncStorage from 'sync-storage'
import { useFocusEffect } from '@react-navigation/native'
import baseURL from '../../assets/common/baseUrl'
import ToastEmmitter from '../../Shared/ToastEmmitter'
import { TextInput } from 'react-native-paper'

const buttons = ["My Reviews", "To Review"]

export default function Reviews() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [reviews, setReviews] = useState([])
    const [toReviews, setToReviews] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({});
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [action, setAction] = useState('create');
    const [selectedReview, setSelectedReview] = useState({});

    const getReviews = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/review?reviews=myreviews`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })
            if (data.success) {
                setReviews(data.reviews);
                setToReviews(data.toReview);
            } else {
                // setLoading(false)
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getReviews()
        }, [selectedIndex])
    )

    const rate = async (values) => {
        try {

            const { data } = await axios.post(`${baseURL}/review`, values, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                ToastEmmitter.success(data.message, "Product rated successfully.")
                getReviews();
            } else {
                ToastEmmitter.error("Rating Error", "Cannot rate product.")
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Fetching Error", "Cannot fetch orders")
        }
    }

    const handeSubmit = () => {
        const values = {
            product: selectedProduct._id,
            rating: rating,
            comment: comment,
        }
        rate(values)
    }

    const handleRate = (product) => {
        setComment('')
        setRating('');
        setSelectedProduct(product)
        setModalVisible(true)
    }

    const updateRate = async (values) => {
        try {

            const { data } = await axios.put(`${baseURL}/review/${selectedReview._id}`, values, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                ToastEmmitter.success(data.message, "Updated successfully.")
                getReviews();
            } else {
                ToastEmmitter.error("Rating Error", "Cannot update rated product.")
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Error occured", "Cannot fetch orders")
        }
    }

    const handleUpdate = () => {

        const values = {
            rating: rating,
            comment: comment,
        }

        updateRate(values)
    }

    const handleEdit = (item) => {
        setModalVisible(true)
        setComment(item.comment)
        setRating(item.rating);
        setSelectedProduct(item.product)
        setSelectedReview(item)
    }

    const deleteReview = async (id) => {
        try {

            const { data } = await axios.delete(`${baseURL}/review/${id}`, {
                headers: {
                    'Authorization': SyncStorage.get('token')
                }
            })

            if (data.success) {
                ToastEmmitter.success(data.message, "Review deleted successfully.")
                getReviews();
            } else {
                ToastEmmitter.error("Rating Error", "Cannot delete rated product.")
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Error occured", "Cannot proceed to operation")
        }
    }

    const handleDelete = (item) => {
        Alert.alert('Delete Review', "Are you sure do you want to delete this review?",
            [{
                text: "Yes", onPress: () => deleteReview(item._id)
            },
            {
                text: "No", onPress: () => console.log('Cancelled')
            }]
        )
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} top={-100} size={'xl'} isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content safeAreaBottom avoidKeyboard={true}>
                    <Modal.Header>{selectedProduct?.name}</Modal.Header>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <FormControl>
                            <Rating
                                ratingCount={5}
                                imageSize={40}
                                startingValue={rating}
                                minValue={1}
                                showRating
                                onFinishRating={(value) => setRating(value)}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Comment</FormControl.Label>
                            <TextInput value={comment} onChangeText={(value) => setComment(value)} multiline numberOfLines={3} textAlignVertical='top' />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            {action === 'create' ?
                                <Button width={'100%'} onPress={() => {
                                    handeSubmit();
                                    setModalVisible(false);
                                }}>
                                    Submit
                                </Button> :
                                <Button width={'100%'} onPress={() => {
                                    handleUpdate();
                                    setModalVisible(false);
                                }}>
                                    Update
                                </Button>
                            }
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Container style={styles.container}>
                <ButtonGroup
                    buttons={buttons}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value);
                    }}
                    containerStyle={styles.buttonsStyle}
                    selectedButtonStyle={{ backgroundColor: '#67729D' }}
                />
                {buttons[selectedIndex] === 'My Reviews' && (
                    <>
                        {reviews.length <= 0 && (
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>No reviews yet</Text>
                        )}
                        {reviews?.map(item => (
                            <View style={styles.conatainerCard}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Image style={styles.image} source={{ uri: sampleImg }} />
                                    <View style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Text>{item?.product?.name}</Text>
                                        <StarRating rating={item?.rating} />
                                        <Text>{item?.comment.length >= 25 ? item?.comment.substring(0, 25) + '...' : item?.comment}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                    <Button onPress={() => {
                                        setAction('edit')
                                        handleEdit(item)
                                    }} variant={'outline'} width={'47%'} style={{ borderColor: '#67729D' }} colorScheme={'mycustom'} size={'xs'}>Edit</Button>
                                    <Button onPress={() => handleDelete(item)} size={'xs'} colorScheme={'mycustom'} width={'47%'}>Delete</Button>
                                </View>
                            </View>
                        ))}
                    </>

                )}

                {buttons[selectedIndex] === 'To Review' && (
                    <>
                        {toReviews.length <= 0 && (
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>Nothing to review</Text>
                        )}
                        {toReviews?.map(item => (
                            <Fragment key={item?.product._id + "toReview"}>
                                <View style={styles.conatainerCard}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Image style={styles.image} source={{ uri: sampleImg }} />
                                        <View style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <Text>{item?.product?.name}</Text>
                                            <Button onPress={() => {
                                                setAction('create')
                                                handleRate(item?.product)
                                            }} variant={'outline'} width={'100%'} style={{ borderColor: '#67729D' }} colorScheme={'mycustom'} size={'sm'}>Rate</Button>
                                        </View>
                                    </View>
                                </View>
                            </Fragment>
                        ))}
                    </>
                )}
            </Container >
        </>
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

const sampleImg = 'https://law.jmc.edu.ph/wp-content/uploads/2019/01/tshirt-2.jpg'

const styles = StyleSheet.create({
    image: {
        width: '30%',
        height: 100,
        borderRadius: 10
    },
    conatainerCard: {
        width: '100%',
        // height: 150,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    buttonsStyle: {
        marginTop: 10,
        marginHorizontal: 0,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    disabledInput: {
        borderBottomWidth: 0
    },
    form: {
        display: 'flex',
        gap: 15
    },
    container: {
        padding: 10,
    }
})