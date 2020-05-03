// Created by Stephen R. Ouellette, 2020 
// Student University of Advancing Technology
import React from "react";
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, 
  TouchableOpacity, Text, TextInput, Alert, Image, Dimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Spinner from "react-native-loading-spinner-overlay";

// Custom created components
import Card from "../components/Card";
import HeaderButton from "../components/HeaderButton";

// Styles
import Styles from "../constants/Styles";
import {initDB, getData, clearDB} from "../constants/Database";

// Utilized for creation of the token
import Base64 from "base-64";
import Axios from "axios";

// Database
import * as SQLite from 'expo-sqlite';

// Constants //
//const db = SQLite.openDatabase('taprootDB.db');
const site = "http://taproot-dev.azurewebsites.net/api/";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      isAuthorized: false,
      isLoading: false,
      errors: {},
      dbInitialized: false,
    };
  }

componentDidMount() {
  clearDB();
  initDB();
}

  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });

  onPressLogin = async () => {
    this.setState({ isLoading: true });
    const { username, password} = this.state;
    const uNamePass = username + ":" + password; // create a string with the username:password
    const hash = Base64.encode(uNamePass); // base64 encoding of the username:password string
    const basic = "Basic " + hash; // append Basic to the hashed username:password
    this.setState({ token: basic}); // this is your token

    // On successful login this method is called.
    const onSuccess = async () => {
      if(getData(this.state.token, this.state.username) == 0){
        this.setState({ isLoading: false, isAuthorized: true });
        this.props.navigation.navigate({
          routeName: "ResidentSelection",
          params: {
            authToken: this.state.token
          }
        });
      }
    };

    // On failed login this method is called.
    const onFailure = error => {
      this.setState({ errors: error, isLoading: false });
      Alert.alert("Error", "Username/Password mismatch", [{ text: "Retry" }]);
      console.log(error);
    };

    // Check login validity
    Axios.get(site + "residents.json", {
      headers: { Authorization: basic }
    }).then(onSuccess)
      .catch(onFailure);

  }

  render() {
    const { isLoading } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={Styles.view_mainView}>
          <Spinner visible={isLoading} />
          {!this.state.isAuthroized ? (
            <View>
              <View style={Styles.login_LogoContainer}>
                <Image
                  style={Styles.login_Logo}
                  source={require("../assets/Taproot_Logo_RGB.jpg")}
                />
              </View>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={10}
                style={Styles.login_MainView}
              >
                <Card style={Styles.login_Card}>
                  <ScrollView>
                    <Text style={Styles.login_Label}>Username</Text>
                    <TextInput
                      style={Styles.login_TextInput}
                      autoCapitalize="none"
                      autoCorrect={false}
                      spellCheck={false}
                      returnKeyType="next"
                      textContentType="emailAddress"
                      placeholder="trapp"
                      onChangeText={this.onUsernameChange}
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                    />
                    <Text style={Styles.login_Label}>Password</Text>
                    <TextInput
                      style={Styles.login_TextInput}
                      autoCapitalize="none"
                      secureTextEntry={true}
                      returnKeyType="done"
                      onChangeText={this.onPasswordChange}
                      onSubmitEditing={this.onPressLogin.bind(this)}
                      ref={password => {
                        this.passwordInput = password;
                      }}
                    />
                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                      <TouchableOpacity
                        style={Styles.login_ButtonContainer}
                        onPress={this.onPressLogin.bind(this)}
                      >
                        <Text style={Styles.login_ButtonText}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </Card>
              </KeyboardAvoidingView>
            </View>
          ) : (
            <View>
              <Text>Sucessfully authorized!</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

LoginForm.navigationOptions = navData => {
  return {
    headerTitle: "Taproot",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default LoginForm;
