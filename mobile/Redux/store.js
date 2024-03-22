import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './Reducers/userReducer';
import { getToken, getUser } from '../utils/user'

const reducers = combineReducers({
    user: userReducer,
});

let initialState = {
    user: {
        userInfo: getUser(),
        token: getToken()
    }
}

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk),
)

export default store;