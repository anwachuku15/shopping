import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ShopNavigator from './ShopNavigator'
import { useColorScheme } from 'react-native-appearance'
import { StatusBar} from 'react-native'


const NavContainer = props => {
    const colorScheme = useColorScheme()
    if(colorScheme === 'dark') {
        StatusBar.setBarStyle('light-content')
    } else {
        StatusBar.setBarStyle('dark-content')
    }

    const navRef = useRef()
    const isAuth = useSelector(state => !!state.auth.token)

    // access Navigation properties outside of navigator with useRef
    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({
                    routeName: 'Auth'
                })
            )
        }
    }, [isAuth])

    return (
        <ShopNavigator theme={props.theme} ref={navRef}/>
    )
}

export default NavContainer