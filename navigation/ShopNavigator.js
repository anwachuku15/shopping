import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'

import { Platform, View, Button, SafeAreaView } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import Colors from '../constants/Colors'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import { Ionicons } from '@expo/vector-icons'
import AuthScreen from '../screens/user/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'

const defaultNavOptions = {
    // headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    // },
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
        screen: ProductsOverviewScreen,
    },
    ProductDetail: {
        screen: ProductDetailScreen,
        navigationOptions: {

            gestureResponseDistance: {
                horizontal: 200
            },
            
        }
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            gestureResponseDistance: {
                horizontal: 200
            }
        }
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
    },
    EditProduct: {
        screen: EditProductScreen
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
    'Your Products': AdminNavigator,
}, {
    edgeWidth: 500,
    contentOptions: {
        activeTintColor: Colors.primary,
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{flex:1, paddingTop:20}}>
                <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
                    <DrawerNavigatorItems {...props} />
                    <Button 
                        title='Logout' 
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(logout)
                            // props.navigation.navigate('Auth')
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})
export default createAppContainer(MainNavigator)