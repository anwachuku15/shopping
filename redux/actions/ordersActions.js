export const ADD_ORDER = 'ADD_ORDER'

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