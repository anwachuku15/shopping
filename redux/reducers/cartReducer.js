import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions"
import CartItem from "../../models/cart-item-model"



const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            // const quantity = addedProduct.quantity
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title
            let updatedOrNewCartItem

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {
                ...state,
                items: {
                    [addedProduct.id]: updatedOrNewCartItem,
                    ...state.items,
                    
                },
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_FROM_CART:
            const selectedProduct = action.product
            const price = selectedProduct.price
            const title = selectedProduct.title

            for (const key in state.items) {
                if (key === selectedProduct.id) {
                    // remove key
                }
            }
        
        default:
            return state
    }

    return state
}