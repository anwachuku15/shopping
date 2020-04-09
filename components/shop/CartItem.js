import React from 'react'
// REDUX

// REACT NATIVE
import { Platform, View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.quantity}>{props.quantity}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.delete}>
                    <Ionicons
                        name={Platform.OS==='android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        // backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity:{
        fontFamily: 'open-sans',
        color: Colors.gunmetal,
        fontSize: 16,
        marginLeft: 20
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount:{
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.orange
    },
    delete:{
        marginLeft: 20
    },
})

export default CartItem