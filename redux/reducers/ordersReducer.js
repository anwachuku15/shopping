import { ADD_ORDER } from "../actions/ordersActions"
import Order from '../../models/order-model'

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date()
            )
            /* TEST
            console.log('Order successful!\nOrder Details:')
            var i = 0
            const orderItems = action.orderData.items
            while (i < orderItems.length) {
                console.log('Item: ' + orderItems[i]['quantity'] + ' ' + orderItems[i]['productTitle'] + ' | ' + orderItems[i]['sum'].toFixed(2))
                i = i+1
            }*/
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

        default:
            return state
            
    }
}