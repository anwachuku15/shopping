import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'

import { Platform, View, Button, SafeAreaView } from 'react-native'
import { createAppContainer, createSwitchNavigator, NavigationActions, NavigationEvents } from 'react-navigation'
import { createStackNavigator, StackCardStyleInterpolator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems,} from 'react-navigation-drawer'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Animated, { Easing } from 'react-native-reanimated';
// import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/UI/HeaderButton'

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

const ProductsOverview = createStackNavigator({
    Overview: {
        screen: ProductsOverviewScreen,
    }
}, {
    defaultNavigationOptions: defaultNavOptions
})

const Cart = createStackNavigator({
    Cart: {
        screen: CartScreen,
    }
}, {
    defaultNavigationOptions: defaultNavOptions
})

const Tabs = createMaterialTopTabNavigator({
    Overview: {
        screen: ProductsOverview,
    },
    Cart: {
        // screen: CartScreen,
        screen: Cart,
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
  
const Details = createStackNavigator({
    ProductDetails: {
        screen: ProductDetailScreen,
        navigationOptions: {
            gestureResponseDistance: {
                horizontal: 500
            },
        }
    }
}, {
    defaultNavigationOptions: defaultNavOptions
})

const ProductsNavigator = createStackNavigator({
    ProductCartTab: {
        screen: Tabs,
        navigationOptions: {
            headerStyle: {height: 0}
        }
    },
    ProductDetails: {
        screen: Details,
        navigationOptions: {
            gestureResponseDistance: {
                horizontal: 500
            },
        },
    },
}, {
    // mode:'modal',
    headerMode: 'none',
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS==='android' ? 'md-cart' : 'ios-add'}
                size={23}
                color={drawerConfig.tintColor}
            />
        ),
    },
    defaultNavigationOptions: defaultNavOptions,
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