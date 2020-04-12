import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'

import { Platform, View, Button, SafeAreaView } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
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


const Tabs = createMaterialTopTabNavigator({
    Overview: {
        screen: ProductsOverviewScreen,
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            swipeEnabled: true,
        }
    }
}, {
    swipeDistanceThreshold: 500,
    tabBarOptions: {
        style: {height:0}
    }
})

Tabs.navigationOptions = ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index]
    let headerTitle
    switch (routeName) {
        case 'Overview':
            headerTitle='Home'
            break
        case 'Cart':
            headerTitle='Cart'
            break
    }
    return {
        headerTitle: headerTitle
    }
}

const ProductsNavigator = createStackNavigator({
    Home: Tabs,
    ProductDetails: {
        screen: ProductDetailScreen,
        navigationOptions: {
            gestureResponseDistance: {
                horizontal: 500
            }
        }
    },
    
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS==='android' ? 'md-cart' : 'ios-add'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})

 
const ProductsToCartNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: ProductsNavigator,
    }
}, {
    initialRouteName: 'Home',
    swipeEnabled: true,
    swipeDistanceThreshold: 500,
    tabBarPosition: 'top',
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        style: { height: 0}
    },
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    // defaultNavigationOptions: defaultNavOptions,
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
    Products: {
        screen: ProductsToCartNavigator,
        navigationOptions: {
            // drawerLockMode: 
            title: 'Home'
        }
    },
    Orders: OrdersNavigator,
    'Your Products': AdminNavigator,
}, {
    edgeWidth: 100,
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
    Shop: ShopNavigator,
})
export default createAppContainer(MainNavigator)