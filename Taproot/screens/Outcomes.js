import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import FiveStarRating from "../components/FiveStarRating";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import Styles from "../constants/Styles";

class OutcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selectedIntervention = this.props.navigation.getParam("intervention");

    return (
      <View style={Styles.view_mainView}>
        <Text style={styles.label}>Intervention Action</Text>
        <Card style={styles.card}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            {selectedIntervention.action}
          </Text>
        </Card>
        <Text style={styles.label}>Rate it's Sucess</Text>
        <Card style={styles.card}>
          <FiveStarRating />
        </Card>
        <Text style={styles.label}>Did it Work?</Text>
        <Card style={styles.card}>
          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ResidentSelection")}>
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
            <TouchableOpacity
              onPress={() => this.props.navigation.pop()}
            >
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
    ),
    headerRight: () => (
      <Image
        style={{ width: 150, height: 40, marginRight: 5 }}
        source={require("../assets/Taproot_Logo_RGB.jpg")}
      />
    )
  };
};

const styles = StyleSheet.create({
  card: {
    width: 400,
    maxWidth: "90%",
    maxHeight: 400,
    padding: 20,
    marginBottom: 10
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center"
  },
  button_container: {
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2
  },
  text: {
    fontWeight: "bold",
    fontSize: 18
  }
});

export default OutcomeScreen;
