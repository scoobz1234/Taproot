import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Image,
  Dimensions
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Spinner from "react-native-loading-spinner-overlay";

import Card from "../components/Card";
import Styles from "../constants/Styles";
import HeaderButton from "../components/HeaderButton";
import Base64 from "base-64";
import Axios from "axios";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      screenWidth: "",
      screenHeight: "",
      isAuthorized: false,
      isLoading: false,
      errors: {}
    };
  }

  getScreenSize = () => {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);
    this.setState({ screenWidth: screenWidth, screenHeight: screenHeight });
  };

  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });

  onPressLogin() {
    const { username, password } = this.state;

    const onSuccess = () => {
      this.setState({ isLoading: false, isAuthorized: true });
      this.props.navigation.replace("ResidentSelection");
    };

    const onFailure = error => {
      this.setState({ errors: error.response.data, isLoading: false });
      Alert.alert("Error", "Username/Password mismatch", [{ text: "Retry" }]);
    };

    //Spinner
    this.setState({ isLoading: true });

    const token = username + ":" + password;
    const hash = Base64.encode(token);
    const Basic = "Basic " + hash;
    Axios.get("http://taproot-dev.azurewebsites.net/api/behaviors.json", {
      headers: {
        Authorization: Basic
      }
    })
      .then(onSuccess)
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
                      //onChangeText={text => this.setState({ password: text })}
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
