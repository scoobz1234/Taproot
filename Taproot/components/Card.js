import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    // this style setup allows us to override styles with our own styles to increase options..
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};


const styles = StyleSheet.create ({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        elevation: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20
    }
});


export default Card;
