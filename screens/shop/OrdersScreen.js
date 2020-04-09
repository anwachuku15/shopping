import React from 'react'
// REDUX
import { useSelector } from 'react-redux'
// NATIVE
import { View, FlatList, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'


const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            keyExtractor={item=>item.id}
            renderItem={itemData => (
                <Text>{itemData.item.totalAmount}</Text>
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
                    iconName={Platform.OS==='android' ? 'md-cart' : 'ios-menu'}
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

export default OrdersScreen