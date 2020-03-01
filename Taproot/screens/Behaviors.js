import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RFValue } from "react-native-responsive-fontsize";
import StarRating from "react-native-star-rating";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Base64 from "base-64";
import Axios from "axios";

class Behaviors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      isLoading: true,
      dataSource: null
    };
  }

  componentDidMount() {
    const token = "tradmin:devpasstapr";
    const hash = Base64.encode(token);
    const Basic = "Basic " + hash;

    Axios.get("http://taproot-dev.azurewebsites.net/api/behaviors.json", {
      headers: { Authorization: Basic }
    })
      .then(response => response.data)
      .then(data => {
        this.setState({ isLoading: false, dataSource: data });
      });
  }

  onBehaviorPress(data) {
    this.props.navigation.navigate("Interventions", { data });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerStyle}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.screen}>
          {this.state.dataSource.map((behavior, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => this.onBehaviorPress(behavior)}
              >
                <View style={styles.list}>
                  <Text style={styles.text}>{behavior.name} </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
  }
}

Behaviors.navigationOptions = navData => {
  return {
    headerTitle: "Behaviors",
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
  screen: {
    paddingRight: 10,
    paddingLeft: 10
  },
  list: {
    marginVertical: 5,
    color: Colors.primary,
    backgroundColor: Colors.tertiary,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden"
  },
  text: {
    padding: 5,
    fontSize: RFValue(18, 680),
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primary
  },
  rating: {
    width: Dimensions.get("screen").width * 0.35,
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingBottom: 3
  }
});

export default Behaviors;
