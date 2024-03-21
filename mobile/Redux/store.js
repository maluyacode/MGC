import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const reducers = combineReducers({

})

const store = createStore(
    reducers,
    applyMiddleware(thunk),
)

export default store;