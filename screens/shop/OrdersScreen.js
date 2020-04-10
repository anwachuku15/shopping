import React, { useEffect, useState } from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import {fetchOrders} from '../../redux/actions/ordersActions'
// NATIVE
import { View, FlatList, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import Colors from '../../constants/Colors'

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    

    const orders = useSelector(state => {
        const descendingOrders = state.orders.orders
        return descendingOrders.sort((a, b) => 
            a.date > b.date ? -1 : 1
        )
    })
    const dispatch = useDispatch()

    // add error handling
    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchOrders()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    if (isLoading) {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem 
                    amount={itemData.item.totalAmount} 
                    price={itemData.item.price}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                /> 
            )}
        />
    )
}

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate({
                            routeName: 'Cart',
                        })
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen