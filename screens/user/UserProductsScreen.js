import React from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import {deleteProduct} from '../../redux/actions/productsActions'
// NATIVE
import { Alert, Platform, FlatList, Button, View, Text } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import {useColorScheme} from 'react-native-appearance'

const UserProductsScreen = props => {
    // const userProducts = useSelector(state => state.products.userProducts)
    const userProducts = useSelector(state => {
        const descendingOrders = state.products.userProducts
        return descendingOrders.sort((a, b) => 
            a.id < b.id ? -1 : 1
        )
    })

    const dispatch = useDispatch()
    const navToEdit = (id) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productId: id
            }
        })
    }
    // const navToAdd = 

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Cannot be undone.', [
            {
                text: 'Cancel', 
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive', 
                onPress: () => {
                    dispatch(deleteProduct(id))
                }
            }
        ])
    }   

    const scheme = useColorScheme()
    let text
    let button
    if (scheme === 'dark') {
        text = 'white'
        button = Colors.primary
    } else {
        text = 'black'
        button = '#F4A850'
    }

    if (userProducts.length === 0) {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <View style={{marginBottom:500}}>
                    <Text style={{color:text}}>You haven't added any products yet.</Text>
                    <Button 
                        title='Add a Product'
                        onPress={() => {
                            props.navigation.navigate({
                                routeName: 'EditProduct'
                            })
                        }}
                        color={button}
                    />
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title.trim()}
                    price={itemData.item.price}
                    onSelect={() => {navToEdit(itemData.item.id)}}
                >
                    <Button 
                        title='Edit' 
                        onPress={() => {navToEdit(itemData.item.id)}}
                        color={Colors.coral}
                    />
                    <Button 
                        title='Delete' 
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                        color={Colors.primary}
                    />
                </ProductItem>
            )}
        />
    )
}

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Direct'
                    iconName={Platform.OS==='android' ? 'md-chatboxes' : 'ios-chatboxes'}
                    // onPress={() => {
                    //     navData.navigation.navigate({
                    //         routeName: 'EditProduct'
                    //     })
                    // }}
                />
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen