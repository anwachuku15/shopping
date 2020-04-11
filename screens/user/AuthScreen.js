import React, { useState, useReducer, useCallback, useEffect } from 'react'

import { ScrollView, Alert, Platform, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { useDispatch } from 'react-redux'
import { signup, login } from '../../redux/actions/authActions'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'

import { useColorScheme } from 'react-native-appearance'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
// FORM VALIDATION REDUCER
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {

        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        
        let newValues = {}
        for (const key in updatedValues) {
            newValues[key] = updatedValues[key].trimStart()
        }

        return {
            ...state,
            formIsValid: updatedFormIsValid,
            inputValues: newValues,
            inputValidities: updatedValidities,
        }
    }
    return state
}

const AuthScreen = props => {


    const [isSignup, setIsSignup] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

     // FORM REDUCER - INITIAL STATE
     const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValidities: {
            email: false,
            password: false
        }, 
        formIsValid: false,
    })

    useEffect(() => {
        if (error) {
            Alert.alert(
                'Error', 
                error, 
                [{text: 'Okay', style: 'cancel'}]
            )
        }
    }, [error])

    const authHandler = async () => {
        let action
        if (isSignup) {
            action = signup(formState.inputValues.email, formState.inputValues.password)
        } else {
            action = login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    }   

    const inputChangeHandler = useCallback(
        (inputType, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                input: inputType,
                isValid: inputValidity,
            })
    }, [dispatchFormState])

    const colorScheme = useColorScheme()
    let switchButton
    if(colorScheme === 'dark') {
        switchButton = Colors.tan
    } else {
        switchButton = Colors.pastel
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
            {/* <LinearGradient colors={[Colors.primary, Colors.blacksmoke]} style={styles.gradient}> */}
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id='email' 
                            label='E-mail' 
                            keyboardType='email-address'
                            email 
                            required 
                            autoCapitalize='none' 
                            errorText='Please enter a valid email address' 
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input 
                            id='password' 
                            label='Password' 
                            keyboardType='default'
                            secureTextEntry
                            required 
                            minLength={8} 
                            autoCapitalize='none' 
                            errorText='Please enter a valid password, at least 8 characters' 
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={isSignup ? 'Sign Up' : 'Login'}
                                color={Colors.primary}
                                onPress={authHandler}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='small' color={Colors.primary} />
                            ) : ( 
                                <Button 
                                    title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} 
                                    color={switchButton}
                                    onPress={() => {setIsSignup(!isSignup)}} 
                                    // setIsSignup(prevState => !prevState)
                                />
                            )}
                        </View>
                    </ScrollView>
                </Card>
            {/* </LinearGradient> */}
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Sign In'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    gradient: {
        // width: '100%',
        // height: '100%',
        
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        // height: '50%',
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }

})

export default AuthScreen