import React, { useState, useEffect, useCallback } from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, updateProduct } from '../../redux/actions/productsActions'
// NATIVE
import { Alert, Platform, View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'


const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId') //if productId was passed: Edit Mode
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    )

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [titleIsValid, setTitleIsValid] = useState(false)
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')
    // VALIDATION
    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false)
        } else {
            setTitleIsValid(true)
        }
        setTitle(text)
    }
    

    const dispatch = useDispatch()

    // avoid infinite loop
    const submitHandler = useCallback(() => {
        if (!titleIsValid) {
            Alert.alert('Invalid Information', 'Please check for errors', [
                { text: 'Okay' }
            ])
            return
        }
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, imageURL))
        } else {
            dispatch(createProduct(title, description, imageURL, +price))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, title, imageURL, price, description])

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
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() =>{ console.log('submitted')}}
                        onSubmitEditing={() => {console.log('submitted')}}
                    />
                    {!titleIsValid && <Text style={{color:'red'}}>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImageURL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageURL}
                        onChangeText={text => setImageURL(text)}
                        keyboardType='default'
                    />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}
                        keyboardType='decimal-pad'
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
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