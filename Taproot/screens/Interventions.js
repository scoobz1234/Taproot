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
import Axios from "axios";
import Base64 from "base-64";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

class Interventions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      isLoading: true,
      dataSource: null,
      behaviorID: null,
    };
  }

  componentDidMount() {
    const token = "tradmin:devpasstaproot";
    const hash = Base64.encode(token);
    const Basic = "Basic " + hash;

    Axios.get("http://taproot-dev.azurewebsites.net/api/behaviors.json", {
      headers: { Authorization: Basic }
    })
      .then(response => response.data)
      .then(data => {
        this.setState({ isLoading: false, dataSource: data });
      })
      .catch(error => console.log(error));
  }

  onInterventionPress(
    interventionID,
    interventionInfo,
    interventionURL,
    interventionName,
    behaviorID,
    behaviorName,
    behaviorURL,
    behaviorInfo
  ) {
    this.props.navigation.navigate("Outcomes", {
      interventionID: interventionID,
      interventionInfo: interventionInfo,
      interventionURL: interventionURL,
      interventionName: interventionName,
      behaviorID: behaviorID,
      behaviorName: behaviorName,
      behaviorURL: behaviorURL,
      behaviorInfo: behaviorInfo
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerStyle}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const behaviorID = this.props.navigation.getParam("behaviorID");

      const selectedBehavior = this.state.dataSource.find(
        behavior => behavior.id === behaviorID
      );
      return (
        <ScrollView style={styles.screen}>
          {selectedBehavior.interventions.map((interventions, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  this.onInterventionPress(
                    interventions.id,
                    interventions.info,
                    interventions.url,
                    interventions.name,
                    selectedBehavior.id,
                    selectedBehavior.name,
                    selectedBehavior.url,
                    selectedBehavior.info
                  )
                }
              >
                <View style={styles.list}>
                  <Text style={styles.text}>{interventions.info} </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
  }
}

Interventions.navigationOptions = navData => {
  return {
    headerTitle: "Interventions",
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

export default Interventions;
