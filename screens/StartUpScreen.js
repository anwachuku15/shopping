import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from '../redux/actions/authActions' 
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
import Colors from '../constants/Colors'

const StartUpScreen = props => {
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData) {
                props.navigation.navigate('Auth')
                return
            }
            const transformedData = JSON.parse(userData)
            const {token, userId, expDate} = transformedData
            const exp = new Date(expDate)

            if(exp <= new Date() || !token || !userId) {
                props.navigator.navigate('Auth')
                return
            }

            props.navigation.navigate('Shop')
            dispatch(authenticate(userId, token))
        }

        tryLogin()
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartUpScreen