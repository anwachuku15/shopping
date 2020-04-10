import React, { useEffect, useCallback, useReducer } from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, updateProduct } from '../../redux/actions/productsActions'
// NATIVE
import { Alert, Platform, View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'


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
            console.log(newValues)
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

const EditProductScreen = props => {
    const dispatch = useDispatch()

    const prodId = props.navigation.getParam('productId') //if productId was passed: Edit Mode
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    )
    
    // FORM VALIDATION - INITIAL STATE
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageURL: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageURL: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        }, 
        formIsValid: editedProduct ? true : false,
    })
    // FORM VALIDATION ACTION
    const textChangeHandler = (inputType, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            input: inputType,
            isValid: isValid,
        })
        
        
    }


    // avoid infinite loop
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid Information', 'Please check for errors', [
                { text: 'Okay' }
            ])
            return
        }
        if (editedProduct) {
            dispatch(updateProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageURL
            ))
        } else {
            dispatch(createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageURL, 
                +formState.inputValues.price
            ))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState])
    // send submitHandler to params to add functionality to headerRight
    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])
    
    
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        style={styles.input}
                        value={formState.inputValues.title}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        // onEndEditing={() =>{ console.log('submitted')}}
                        onSubmitEditing={() => {console.log('submitted')}}
                    />
                    {!formState.inputValidities.title && <Text style={{color:'red'}}>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImageURL</Text>
                    <TextInput
                        onChangeText={textChangeHandler.bind(this, 'imageURL')}
                        style={styles.input}
                        value={formState.inputValues.imageURL}
                    />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        onChangeText={textChangeHandler.bind(this, 'price')}
                        style={styles.input}
                        value={formState.inputValues.price}
                        keyboardType='decimal-pad'
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        onChangeText={textChangeHandler.bind(this, 'description')}
                        style={styles.input}
                        value={formState.inputValues.description}
                        keyboardType='default'
                    />
                </View>
            </View>
        </ScrollView>
        )
}

EditProductScreen.navigationOptions = navData => {
    const submit = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS==='android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submit}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1
    },

})

export default EditProductScreen