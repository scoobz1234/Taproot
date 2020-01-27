import React from 'react';
import { 
    View, 
    TouchableWithoutFeedback, 
    Keyboard, 
    StyleSheet, 
    TouchableOpacity, 
    Text } from 'react-native';

import Styles from '../constants/Styles'
import Header from '../components/Header';
import Colors from '../constants/Colors';

let content = <LoginScreen/>;

export default class ScreenTemplate extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
  return (
    <TouchableWithoutFeedback onPress={() =>{ Keyboard.dismiss(); }}>
    <View style={Styles.view_mainView}>
      <Header/>
      {content}      
      <View style={styles.button_container}>
        <View style={styles.button_cont}>
        <TouchableOpacity style={Styles.button_mainButton}>
            <Text style={styles.text}>HELP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button_cont}>
          <TouchableOpacity style={Styles.button_mainButton}>
            <Text style={styles.text}>TRAINING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
    card_container: {
      marginTop: 20,
      alignItems: 'center'
    },
    button_container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    button_cont: {
      flex: 1,
      padding: 20
    },
    text: {
      color: Colors.primary,
      fontWeight: 'bold',
      fontSize: 18
    }
  });