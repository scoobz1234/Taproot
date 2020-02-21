import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RFValue } from "react-native-responsive-fontsize";
import StarRating from "react-native-star-rating";

import HeaderButton from "../components/HeaderButton";
import { INTERVENTIONS } from "../data/dummy_data";
import Colors from "../constants/Colors";

class Interventions extends React.Component {
  constructor(props) {
    super(props);
  }

  onInterventionPress = data => {
    this.props.navigation.navigate({
      routeName: "Outcomes",
      params: {
        intervention: data
      }
    });
  };
  render() {
    let behaviorID = "";
    let interventionsToShow = INTERVENTIONS;

    if (this.props.navigation.getParam("BehaviorID") != null) {
      behaviorID = this.props.navigation.getParam("BehaviorID");
      interventionsToShow = INTERVENTIONS.filter(
        interventions => interventions.behaviorids.indexOf(behaviorID) >= 0
      );
    }

    return (
      <ScrollView style={styles.screen}>
        {interventionsToShow
          .sort((a, b) => b.rating - a.rating)
          .map((intervention, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => this.onInterventionPress(intervention)}
              >
                <View style={styles.list}>
                  <Text style={styles.text}>{intervention.action} </Text>
                  <StarRating
                    disabled={true}
                    emptyStar={"ios-star-outline"}
                    fullStar={"ios-star"}
                    iconSet={"Ionicons"}
                    maxStars={5}
                    rating={intervention.rating}
                    fullStarColor={"white"}
                    emptyStarColor={Colors.primary}
                    starSize={RFValue(18, 680)}
                    containerStyle={styles.rating}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
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
    width: Dimensions.get('screen').width * .35,
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingBottom: 3
  }
});

export default Interventions;
