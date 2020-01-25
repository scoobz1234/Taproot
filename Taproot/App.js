import React from 'react';
import { 
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TouchableOpacity,
  Text} from 'react-native';

  import Header from './components/Header';
  import Card from './components/Card'; // provides card object
  import LoginForm from './components/LoginForm';
  import Colors from './constants/Colors';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
  }}>
    <View style={styles.view_mainView}>
      <Header/>
      <LoginForm style={styles.card}/>
      <View style={styles.button_container}>
        <View style={styles.button_cont}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>HELP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button_cont}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>TRAINING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  view_mainView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  card_container: {
    marginTop: 20,
    alignItems: 'center'
  },
  card: {
    width: 400,
    maxWidth: '90%',
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
  button: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18
  }
});