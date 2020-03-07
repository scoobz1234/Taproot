import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Axios from "axios";
import Base64 from "base-64";
import HeaderButton from "../components/HeaderButton";
import Styles from "../constants/Styles";

class Interventions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      isLoading: true,
      dataSource: null,
      behaviorID: null
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
        <View style={Styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const behaviorID = this.props.navigation.getParam("behaviorID");

      const selectedBehavior = this.state.dataSource.find(
        behavior => behavior.id === behaviorID
      );
      return (
        <ScrollView style={Styles.interventions_MainView}>
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
                <View style={Styles.interventions_InterventionListContainer}>
                  <Text style={Styles.interventions_InterventionListText}>
                    {interventions.info}{" "}
                  </Text>
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

export default Interventions;
