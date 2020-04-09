import React from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import {deleteProduct} from '../../redux/actions/productsActions'
// NATIVE
import { Platform, FlatList, Button} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
                >
                    <Button 
                        title='Edit' 
                        onPress={() => {}}
                        color={Colors.pastel}
                    />
                    <Button 
                        title='Delete' 
                        onPress={() => {
                            dispatch(deleteProduct(itemData.item.id))
                        }}
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
                    title='Cart'
                    iconName={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate({
                            routeName: 'Cart',
                        })
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen