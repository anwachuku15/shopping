import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from '../redux/reducers/productsReducer'
import cartReducer from '../redux/reducers/cartReducer'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
})

const store = createStore(
    rootReducer, 
    composeWithDevTools()
)

export default store