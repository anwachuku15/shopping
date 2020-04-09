import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Colors from '../constants/Colors'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import { Ionicons } from '@expo/vector-icons'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerBackTitleVisible: false
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: {
        screen: ProductsOverviewScreen
    },
    ProductDetail: {
        screen: ProductDetailScreen
    },
    Cart: {
        screen: CartScreen
    },
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})


const OrdersNavigator = createStackNavigator({
       Orders: {
           screen: OrdersScreen,
       } 
    }, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS==='android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts: {
        screen: UserProductsScreen,
    } 
 }, {
 navigationOptions: {
     drawerIcon: drawerConfig => (
         <Ionicons
             name={Platform.OS==='android' ? 'md-create' : 'ios-create'}
             size={23}
             color={drawerConfig.tintColor}
         />
     )
 },
 defaultNavigationOptions: defaultNavOptions
})



const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    'Your Products': AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary,

    }
})

export default createAppContainer(ShopNavigator)