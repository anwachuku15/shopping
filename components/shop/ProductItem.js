import React from 'react'
import { 
    Platform, 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Button, 
    TouchableOpacity,
    TouchableNativeFeedback,

} from 'react-native'
import Colors from '../../constants/Colors'

// import 
// PRESENTATIONAL (STYLING) COMPONENT
const ProductItem = props => {
    let TouchableCmp = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        
        <View style={styles.product}>

            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: props.image}} style={styles.image}/>
                        </View>
                        
                        <View style={styles.prodInfo}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        
                        <View style={styles.buttons}>
                            
                            <Button 
                                title='View Details' 
                                onPress={props.onViewDetail}
                                color={Colors.pastel}
                            />
                            <Button 
                                title='Add to Cart' 
                                onPress={props.onAddToCart}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                    
                </TouchableCmp>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    prodInfo: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },  
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: Platform.OS === 'android' ? 4 : 0
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem