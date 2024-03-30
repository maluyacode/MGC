import SyncStorage from 'sync-storage'
import * as cartAction from '../Constants/cartConstants'

export const addCart = (item) => (dispatch) => {
    try {

        const cartItems = SyncStorage.get('cartItems') || []

        cartItems.push(item);
        SyncStorage.set('cartItems', cartItems);

        const updatedCart = SyncStorage.get('cartItems');

        dispatch({
            type: cartAction.ADD_CART,
            payload: updatedCart
        })

        return {
            success: true,
            message: `${item.product.name} Added Successfully`
        }

    } catch (err) {
        return {
            success: false,
            message: 'Cannot add this item'
        }
    }
}

export const removeCartItem = (productId) => (dispatch) => {

    try {

        const cartItems = SyncStorage.get('cartItems') || []

        const item = cartItems.find(item => item.product._id === productId)
        SyncStorage.set('cartItems', cartItems.filter(item => item.product._id !== productId));
        const updatedCart = SyncStorage.get('cartItems');

        dispatch({
            type: cartAction.REMOVE_ITEM,
            payload: updatedCart
        })

        return {
            success: true,
            message: `${item.product.name} Removed Successfully`
        }

    } catch (err) {
        return {
            success: false,
            message: 'Cannot remove this item'
        }
    }

}

export const clearCart = () => (dispatch) => {

    try {

        const cartItems = SyncStorage.get('cartItems') || []

        SyncStorage.set('cartItems', []);
        const updatedCart = SyncStorage.get('cartItems');

        dispatch({
            type: cartAction.CLEAR_CART,
            payload: updatedCart
        })

    } catch (err) {
        return {
            success: false,
            message: 'Cannot clear cart'
        }
    }

}

export const reduceQuantity = (productId) => (dispatch) => {

    const cartItems = SyncStorage.get('cartItems') || []

    if (cartItems.find(item => item.product._id === productId).quantity <= 1) {
        return;
    }

    cartItems.find(item => item.product._id === productId).quantity--

    dispatch({
        type: cartAction.CHANGE_QUANTITY,
        payload: cartItems
    })
}

export const addQuantity = (productId) => (dispatch) => {

    const cartItems = SyncStorage.get('cartItems') || []

    cartItems.find(item => item.product._id === productId).quantity++

    dispatch({
        type: cartAction.CHANGE_QUANTITY,
        payload: cartItems
    })

}

export const changeColor = ({ productId, color }) => (dispatch) => {

    const cartItems = SyncStorage.get('cartItems') || []

    cartItems.find(item => item.product._id === productId).color = color

    dispatch({
        type: cartAction.INITIALIZE_CART,
        payload: cartItems
    })

}

export const changeSize = ({ productId, size }) => (dispatch) => {

    const cartItems = SyncStorage.get('cartItems') || []

    cartItems.find(item => item.product._id === productId).size = size

    dispatch({
        type: cartAction.INITIALIZE_CART,
        payload: cartItems
    })

}