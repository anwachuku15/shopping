import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/authReducer'
import postsReducer from './reducers/postsReducer'
import productsReducer from '../redux/reducers/productsReducer'
import cartReducer from '../redux/reducers/cartReducer'
import ordersReducer from '../redux/reducers/ordersReducer'

const rootReducer = combineReducers({
    posts: postsReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
})


const store = createStore(
    // composeWithDevTools(),
    rootReducer, 
    applyMiddleware(thunk)
)

export default store