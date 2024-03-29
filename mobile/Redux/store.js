import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './Reducers/userReducer';
import { getToken, getUser } from '../utils/user'
import { cartReducer } from './Reducers/cartReducer';
import SyncStorage from 'sync-storage'

const reducers = combineReducers({
    user: userReducer,
    cart: cartReducer
});

let initialState = {
    user: {
        userInfo: getUser(),
        token: getToken()
    },
    cart: {
        cartItems: SyncStorage.get('cartItems') || []
    }
}

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk),
)

export default store;