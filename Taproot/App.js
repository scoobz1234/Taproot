import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image } from 'react-native';
  // gets the logo from the assets folder.
  import Taproot_Logo from './assets/Taproot_Logo_RGB.jpg';

// use "CTRL + /" to add a comment line. Outside of render blocks you can use //
// and inside render blocks you can use {/* */} for your comment blocks...
{/* you can solely use this version if you want */ }
// React hooks is the {useState} imported above. this allows states to be utilized.

export default function App() {
  return (
    // First view is the base view that all apps will need. this is the main view.
    // when adding the style property, you need to use the binding {} brackets
    <View style={styles.view_mainView}>
      <View style={styles.view_titleView}>
        <Image source={Taproot_Logo} style={styles.image_logo}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view_mainView: {
    flex: 1,
    alignItems: 'center',
  },
  view_titleView: {
    alignItems: "flex-start",
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  image_logo: {
    resizeMode: 'center',
    marginTop: -280, // trying to get local position correct, this will change...
    marginBottom: -320 // same with the line above (positions the line break)...
  }
});

// Open new Terminal in Ctrl + Shift + `
// Type npm start
// scan QR code from expo with phone or open Android Emulator