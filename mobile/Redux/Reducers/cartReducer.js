import * as cartAction from '../Constants/cartConstants'

export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case cartAction.INITIALIZE_CART:
            return {
                ...state,
                cartItems: action.payload,
            }
        case cartAction.CHANGE_QUANTITY:
            return {
                ...state,
                cartItems: action.payload,
            }
        case cartAction.ADD_CART:
            return {
                ...state,
                cartItems: action.payload,
            }
        case cartAction.REMOVE_ITEM:
            return {
                ...state,
                cartItems: action.payload,
            }
        case cartAction.CLEAR_CART:
            return {
                ...state,
                cartItems: action.payload,
            }
    }
    return state
}