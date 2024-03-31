import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './Reducers/userReducer';
import { getToken, getUser } from '../utils/user'
import { cartReducer } from './Reducers/cartReducer';
import SyncStorage from 'sync-storage'
import { uiReducer } from './Reducers/uiReducer';

const reducers = combineReducers({
    user: userReducer,
    cart: cartReducer,
    userInterface: uiReducer,
});

let initialState = {
    user: {
        userInfo: getUser(),
        token: getToken()
    },
    cart: {
        cartItems: SyncStorage.get('cartItems') || []
    },
    userInterface: {
        isTabShow: true,
    }
}

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk),
)

export default store;