import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Image
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import Card from "../components/Card";
import Styles from "../constants/Styles";
import HeaderButton from "../components/HeaderButton";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  checkLogin = () => {
    const { username, password } = this.state;
    if (username === "admin" && password === "admin") {
      this.props.navigation.replace("Patients");
    } else {
      Alert.alert("Error", "Username/Password mismatch", [{ text: "Retry" }]);
    }
  };

  LoginOAuth = () => {
    fetch()
  };

  render() {
    const { username, password } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={Styles.view_mainView}>
          <View style={styles.image}>
            <Image
              style={{
                width: 375,
                height: 100
              }}
              source={require("../assets/Taproot_Logo_RGB.jpg")}
            />
          </View>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={10}
            style={styles.screen}
          >
            <Card style={styles.card}>
              <ScrollView>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  spellCheck={false}
                  returnKeyType="next"
                  textContentType="emailAddress"
                  onChangeText={text => this.setState({ username: text })}
                  onSubmitEditing={() => {
                    this.passwordInput.focus();
                  }}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={text => this.setState({ password: text })}
                  onSubmitEditing={this.checkLogin}
                  ref={password => {
                    this.passwordInput = password;
                  }}
                />
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <TouchableOpacity
                    style={styles.login_container}
                    onPress={this.checkLogin}
                  >
                    <Text style={styles.login_text}>Login</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Card>
          </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  label: {
    color: "black",
    marginBottom: 5
  },
  card: {
    width: 400,
    maxWidth: "90%",
    maxHeight: 400,
    padding: 20
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.6,
    marginBottom: 5
  },
  login_container: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  login_text: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 18
  }
});
