import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductTitle = () => {
    return (
        <View
            style={{
                paddingVertical: 4,
                paddingHorizontal: 16,
                borderBottomWidth: 8,
                borderColor: '#edeeef',
            }}>
            <Text style={styles.title}>
                Gold-Plated Ruby Peacock Jewellery Set
            </Text>
            <View style={styles.body}>
                <Text style={styles.cost}>₹540</Text>
                <Text style={styles.initialCost}>₹1,680</Text>
                <Text style={styles.discount}>( 70% discount )</Text>
            </View>

            <Text style={styles.taxes}>inclusive of all taxes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'popins-semibold',
        fontSize: 24,
        color: '#1a2228',
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cost: {
        fontFamily: 'popins-bold',
        fontSize: 22,
        color: '#20263e',
    },
    initialCost: {
        fontFamily: 'popins-semibold',
        fontSize: 18,
        color: '#444d56',

        paddingHorizontal: 16,
        textDecorationLine: 'line-through',
    },
    discount: {
        fontFamily: 'popins-semibold',
        fontSize: 18,
        color: '#FF0000',

        paddingHorizontal: 16,
    },
    taxes: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: '#0bda51',
        paddingTop: 4,
    },
});
export default ProductTitle;
