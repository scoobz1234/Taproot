import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Colors from '../constants/Colors';
import Taproot_Logo from '../assets/Taproot_Logo_RGB.jpg';

const Header = props => {
    // this style setup allows us to override styles with our own styles to increase options..
    return (
        <View style={styles.header}>
            <Image source={Taproot_Logo} style={styles.image_logo}/>
        </View>
    );
};


const styles = StyleSheet.create ({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 85,
        paddingBottom: 75,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image_logo: {
        resizeMode: 'center',
        marginTop: -280, // trying to get local position correct, this will change...
        marginBottom: -320 // same with the line above (positions the line break)...
    }
});


export default Header;
