import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from '../redux/reducers/productsReducer'
import cartReducer from '../redux/reducers/cartReducer'
import ordersReducer from '../redux/reducers/ordersReducer'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
})

const store = createStore(
    rootReducer, 
    // composeWithDevTools()
)

export default store