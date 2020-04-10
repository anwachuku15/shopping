import React, { useEffect, useCallback, useReducer } from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, updateProduct } from '../../redux/actions/productsActions'
// NATIVE
import { 
    Alert, 
    Platform, 
    View, 
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import Input from '../../components/UI/Input'

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
    // callback -> use effect in input componet
    const inputChangeHandler = useCallback((inputType, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            input: inputType,
            isValid: inputValidity,
        })
    }, [dispatchFormState])


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
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior='padding' 
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    
                    <Input
                        id='imageURL'
                        label='Image URL'
                        errorText='Please enter a valid image url'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required

                    />
                    {editedProduct ? null : ( 
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter valid price'
                            keyboardType='decimal-pad'
                            autoCorrect
                            returnKeyType='next'
                            required
                            min={0.01}
                            onInputChange={inputChangeHandler}
                        />
                    )}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
})

export default EditProductScreen