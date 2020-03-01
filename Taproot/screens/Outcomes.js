import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RFValue } from "react-native-responsive-fontsize";
import Base64 from "base-64";
import Axios from "axios";
var Buffer = require('buffer').Buffer;

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import Styles from "../constants/Styles";

class OutcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "tradmin",
      password: "devpasstapr",
      token: null
    };
  }

  postRequest() {
    const token = "tradmin:devpasstapr";
    const hash = Base64.encode(token);
    const Basic = "Basic " + hash;
    const base64encodedData = new Buffer(token).toString('base64');

    fetch("https://taproot-dev.azurewebsites.net/TR_API/intervention/add/", {credentials: 'same-origin'}, {
        method: "POST",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data",
          'Authorization': 'Basic '+ base64encodedData
        },
        body: {
          Name: "Some Name",
          Info: "Some Information"
        }
      }
    )
      .then(response => {
        return console.log(JSON.stringify(response));
      })
      .catch(error => console.log(error));

  }

  render() {
    const selectedIntervention = this.props.navigation.getParam("data");

    return (
      <View style={Styles.view_mainView}>
        <Text style={styles.label}>Intervention Action</Text>
        <Card style={styles.card}>
          <Text style={{ fontSize: RFValue(18, 680), textAlign: "center" }}>
            {selectedIntervention}
          </Text>
        </Card>
        <Text style={styles.label}>Did it Work?</Text>
        <Card style={styles.card}>
          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
            <TouchableOpacity
              onPress={() =>
                // this.props.navigation.navigate("Behaviors")
                this.postRequest()
              }
            >
              <View
                style={{
                  ...styles.button_container,
                  backgroundColor: Colors.primary
                }}
              >
                <Text style={{ ...styles.text, color: Colors.tertiary }}>
                  Yes
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <View
                style={{
                  ...styles.button_container,
                  backgroundColor: Colors.tertiary
                }}
              >
                <Text style={{ ...styles.text, color: Colors.primary }}>
                  No
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

OutcomeScreen.navigationOptions = navData => {
  return {
    headerTitle: "Intervention Outcome",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-arrow-round-back"
          onPress={() => {
            navData.navigation.pop();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width,
    maxWidth: "90%",
    maxHeight: Dimensions.get("screen").height,
    padding: 20,
    marginBottom: 10
  },
  label: {
    fontSize: RFValue(22, 680),
    fontWeight: "bold",
    alignSelf: "center"
  },
  button_container: {
    borderRadius: 10,
    height: Dimensions.get("screen").height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2
  },
  text: {
    fontWeight: "bold",
    fontSize: RFValue(20, 680)
  }
});

export default OutcomeScreen;
