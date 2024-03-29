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
            message: 'Item succesfully added'
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

        SyncStorage.set('cartItems', cartItems.filter(item => item.product._id !== productId));
        const updatedCart = SyncStorage.get('cartItems');

        dispatch({
            type: cartAction.REMOVE_ITEM,
            payload: updatedCart
        })

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