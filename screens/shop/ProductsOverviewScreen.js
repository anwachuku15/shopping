import React, { useEffect } from 'react'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../redux/actions/cartActions'
import { fetchProducts } from '../../redux/actions/productsActions'
// REACT-NATIVE
import { Platform, Button, FlatList, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
    // const products = useSelector(state => state.products.availableProducts)

    const products = useSelector(state => {
        const descending = state.products.availableProducts
        return descending.sort((a, b) => 
            a.id < b.id ? -1 : 1
        )
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
    }
    return (
        <FlatList
            data={products}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <Button 
                        title='View Details' 
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                        color={Colors.pastel}
                    />
                    <Button 
                        title='Add to Cart' 
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                        color={Colors.primary}
                    />
                </ProductItem>
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
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

export default ProductsOverviewScreen