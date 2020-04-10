import Order from '../../models/order-model'


export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
    return async dispatch => {
        try {
            // GET REQUEST
            const res = await fetch('https://reactnative-ac7bd.firebaseio.com/orders/u1.json')
            // const res = await fetch(`https://reactnative-ac7bd.firebaseio.com/orders/u1.json`, {
            if(!res.ok) {
                // check response body to see what's wrong
                throw new Error('Something went wrong')
            }
            const resData = await res.json()
            const loadedOrders = []

            for (const key in  resData) {
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            })
        } catch (err) {
            // send to custom analytics server
            throw err
        }
        
    }
}
// no error handling
export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const res = await fetch('https://reactnative-ac7bd.firebaseio.com/orders/u1.json', {
        // const res = await fetch(`https://reactnative-ac7bd.firebaseio.com/orders/u1.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        if (!res.ok) {
            throw new Error('Something went wrong')
        }

        const resData = await res.json()
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        })
    }
} 