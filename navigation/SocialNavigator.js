import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authActions'

import { Platform, View, Button, SafeAreaView } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems,} from 'react-navigation-drawer'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Animated, { Easing } from 'react-native-reanimated';

import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/UI/HeaderButton'

import HomeScreen from '../screens/LNB/HomeScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import AuthScreen from '../screens/user/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'
import DirectoryScreen from '../screens/LNB/DirectoryScreen'
import NeedsFeedScreen from '../screens/LNB/NeedsFeedScreen'
import CreatePostScreen from '../screens/LNB/CreatePostScreen'
import NotificationsScreen from '../screens/LNB/NotificationsScreen'
import MessagesScreen from '../screens/LNB/MessagesScreen'

const defaultNavOptions = {
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerBackTitleVisible: false
}

const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-home' 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' 
                            ? <Text style={{fontFamily: 'open-sans-bold'}}>Home</Text>
                            : 'Home'
        }
    },
    Directory: {
        screen: DirectoryScreen,
        navigationOptions: {
            tabBarLabel: 'Directory',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name={Platform.OS ==='android' ? 'md-people' : 'ios-people'}
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.secondaryColor,
            tabBarLabel: Platform.OS === 'android' 
                            ? <Text style={{fontFamily: 'open-sans-bold'}}>Directory</Text>
                            : 'Directory'
        }
    },
    Post: {
        screen: CreatePostScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name={Platform.OS==='android' ? 'md-add-circle-outline' : 'ios-add-circle-outline'} 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' 
                            ? <Text style={{fontFamily: 'open-sans-bold'}}>Post</Text>
                            : 'Post'
        }
    },
    Notifications: {
        screen: NotificationsScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name={Platform.OS==='android' ? 'md-notifications-outline' : 'ios-notifications-outline'} 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' 
                            ? <Text style={{fontFamily: 'open-sans-bold'}}>Notifications</Text>
                            : 'Notifications'
        }
    },
    NeedsFeed: {
        screen: NeedsFeedScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <FontAwesome 
                        name='handshake-o' 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' 
                            ? <Text style={{fontFamily: 'open-sans-bold'}}>Connect</Text>
                            : 'Connect'
        }
    }
}, {
    defaultNavigationOptions: defaultNavOptions,
    tabBarOptions: {
        activeTintColor: Colors.primary
    }
})


const BottomTabStackContainer = createStackNavigator({
    default: createBottomTabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons 
                            name='ios-home' 
                            size={25} 
                            color={tabInfo.tintColor}
                        />
                    )
                },
                tabBarColor: Colors.primaryColor,
                tabBarLabel: Platform.OS === 'android' 
                                ? <Text style={{fontFamily: 'open-sans-bold'}}>Home</Text>
                                : 'Home'
            }
        },
        Directory: {
            screen: DirectoryScreen,
            navigationOptions: {
                tabBarLabel: 'Directory',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons 
                            name={Platform.OS ==='android' ? 'md-people' : 'ios-people'}
                            size={25} 
                            color={tabInfo.tintColor}
                        />
                    )
                },
                tabBarColor: Colors.secondaryColor,
                tabBarLabel: Platform.OS === 'android' 
                                ? <Text style={{fontFamily: 'open-sans-bold'}}>Directory</Text>
                                : 'Directory'
            }
        },
        Post: {
            screen: CreatePostScreen,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons 
                            name={Platform.OS==='android' ? 'md-add-circle-outline' : 'ios-add-circle-outline'} 
                            size={25} 
                            color={tabInfo.tintColor}
                        />
                    )
                },
                tabBarColor: Colors.primaryColor,
                tabBarLabel: Platform.OS === 'android' 
                                ? <Text style={{fontFamily: 'open-sans-bold'}}>Post</Text>
                                : 'Post'
            }
        },
        Notifications: {
            screen: NotificationsScreen,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons 
                            name={Platform.OS==='android' ? 'md-notifications-outline' : 'ios-notifications-outline'} 
                            size={25} 
                            color={tabInfo.tintColor}
                        />
                    )
                },
                tabBarColor: Colors.primaryColor,
                tabBarLabel: Platform.OS === 'android' 
                                ? <Text style={{fontFamily: 'open-sans-bold'}}>Notifications</Text>
                                : 'Notifications'
            }
        },
        NeedsFeed: {
            screen: NeedsFeedScreen,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <FontAwesome 
                            name='handshake-o' 
                            size={25} 
                            color={tabInfo.tintColor}
                        />
                    )
                },
                tabBarColor: Colors.primaryColor,
                tabBarLabel: Platform.OS === 'android' 
                                ? <Text style={{fontFamily: 'open-sans-bold'}}>Connect</Text>
                                : 'Connect'
            }
        }
    }, {
        defaultNavigationOptions: {
            tabBarOnPress: ({navigation, defaultHandler}) => {
                if (navigation.state.key === 'Post') {
                    navigation.navigate('postModal')
                } else {
                    defaultHandler()
                }
            }
        },
        tabBarOptions: {
            activeTintColor: Colors.primary
        }
    }),
    postModal: {
        screen: CreatePostScreen
    }
}, {
    mode: 'modal',
    headerMode: 'none'
})

const DefaultStack = createStackNavigator({
    BottomTabStack: {
        screen: BottomTabStackContainer
    }
}, {
    
})

const MessagesStack = createStackNavigator({
    Messages: {
        screen: MessagesScreen
    }
}, {
    defaultNavigationOptions: defaultNavOptions
})

const SwipeTabNavigator = createMaterialTopTabNavigator({
    default: {
        screen: BottomTabStackContainer
        // screen: DefaultStack
    },
    Messages: {
        screen: MessagesStack,
        navigationOptions: {
            swipeEnabled: true
        }
    }
}, {
    swipeDistanceThreshold: 500,
    tabBarOptions: {
        style: {height: 0}
    }
})



const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

// ----- SWITCH ----- //
const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    // Shop: BottomTabStackContainer,
    Shop: SwipeTabNavigator
})

export default createAppContainer(MainNavigator)