import React from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../redux/actions/cartActions'
// REACT-NATIVE
import { Platform, FlatList, Text, View, Image, StyleSheet, Button } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const CartScreen = props => {
    const cartItems = useSelector(state => {
        const cartArray = []
        for (const key in state.cart.items) {
            cartArray.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return cartArray
    })
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    title='Order Now'
                    color={Colors.raspberry}
                    disabled={cartItems.length === 0}
                />
            </View>
            {/* <FlatList 

            /> */}
            <View>
                <Text>Cart items</Text>
                <Text>Cart items</Text>
                <Text>Cart items</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.green
    },
    amount: {
        color: Colors.orange
    },
})

export default CartScreen