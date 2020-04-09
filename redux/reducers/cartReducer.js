import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ONE_FROM_CART } from "../actions/cartActions"
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
                    state.items[addedProduct.id].quantity++,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum += prodPrice
                )
                console.log(updatedOrNewCartItem.sum)
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
            const cartItems = {...state.items}
            delete cartItems[action.pid]

        case REMOVE_ONE_FROM_CART:
            const selectedItem = state.items[action.pid]
            const qty = state.items[action.pid].quantity

            if (qty < 2) {
                const cartItems = {...state.items}
                delete cartItems[action.pid]
                return {
                    ...state,
                    items: cartItems,
                    totalAmount: state.totalAmount - state.items[action.pid].productPrice
                } 
            } else {
                const cartItems = new CartItem(
                    selectedItem.quantity-1, 
                    selectedItem.productPrice, 
                    selectedItem.productTitle, 
                    selectedItem.sum-=selectedItem.productPrice 
                )
                return { 
                    ...state,
                    items: {
                        ...state.items,
                        [action.pid]: cartItems
                    },
                    totalAmount: state.totalAmount-cartItems.productPrice
                }
            }
            
        default:
            return state
    }

    return state
}