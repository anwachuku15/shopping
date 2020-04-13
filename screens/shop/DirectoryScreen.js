import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    Button, 
    ScrollView 
} from 'react-native'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import { useColorScheme } from 'react-native-appearance'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'


const DirectoryScreen = props => {
    const scheme = useColorScheme()

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()
    
    return (
        
        <View style={styles.screen}>
            <Text>Member Directory</Text>
        </View>

            
    )
}


DirectoryScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Member Directory'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default DirectoryScreen