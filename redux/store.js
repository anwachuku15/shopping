import { createStore, combineReducers } from 'redux'
import productsReducer from '../redux/reducers/productsReducer'

const rootReducer = combineReducers({
    products: productsReducer
})

const store = createStore(rootReducer)

export default store