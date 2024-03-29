import SyncStorage from 'sync-storage'

export const addCart = (item) => {
    try {

        const cartItems = SyncStorage.get('cartItems') || []

        cartItems.push(item);

        SyncStorage.set('cartItems', cartItems);

        return {
            message: 'Item successfull added',
            item: item,
            success: true,
        }

    } catch (err) {
        return {
            success: false,
            message: 'Cannot add this item'
        }
    }
}