import React from 'react';
import { 
  StyleSheet,
  View} from 'react-native';

  import Header from './components/Header';
  import Card from './components/Card'; // provides card object
  import Login from './components/Login';

// use "CTRL + /" to add a comment line. Outside of render blocks you can use //
// and inside render blocks you can use {/* */} for your comment blocks...
{/* you can solely use this version if you want */ }
// React hooks is the {useState} imported above. this allows states to be utilized.

export default function App() {
  return (
    // First view is the base view that all apps will need. this is the main view.
    // when adding the style property, you need to use the binding {} brackets
    <View style={styles.view_mainView}>
        <Header/>
          <Card style={styles.card}>
              <Login />
          </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  view_mainView: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  card_container: {
    marginTop: 20,
    alignItems: 'center'
  },
  card: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  }
});

// Open new Terminal in Ctrl + Shift + `
// Type npm start
// scan QR code from expo with phone or open Android Emulator