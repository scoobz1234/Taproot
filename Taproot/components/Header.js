import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Colors from '../constants/Colors';
import Taproot_Logo from '../assets/Taproot_Logo_RGB.jpg';

const Header = props => {
    // this style setup allows us to override styles with our own styles to increase options..
    return (
        <View style={styles.header}>
            <View style={styles.view_titleView}>
                <Image source={Taproot_Logo} style={styles.image_logo}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create ({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image_logo: {
        resizeMode: 'center',
        marginTop: -280, // trying to get local position correct, this will change...
        marginBottom: -320 // same with the line above (positions the line break)...
    },
    view_titleView: {
        alignItems: "flex-start",
        borderBottomColor: 'black',
        borderBottomWidth: 1
      },

});


export default Header;
