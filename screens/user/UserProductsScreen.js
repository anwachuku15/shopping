import React from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import {deleteProduct} from '../../redux/actions/productsActions'
// NATIVE
import { Alert, Platform, FlatList, Button} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    const navToEdit = (id) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productId: id
            }
        })
    }

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

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {navToEdit(itemData.item.id)}}
                >
                    <Button 
                        title='Edit' 
                        onPress={() => {navToEdit(itemData.item.id)}}
                        color={Colors.pastel}
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
                    title='Add'
                    iconName={Platform.OS==='android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate({
                            routeName: 'EditProduct'
                        })
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen