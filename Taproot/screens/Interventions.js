import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
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
    const behaviorID = this.props.navigation.getParam("BehaviorID");
    const interventionsToShow = INTERVENTIONS.filter(
      interventions => interventions.behaviorids.indexOf(behaviorID) >= 0
    );

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
                    starSize={12}
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primary
  },
  rating: {
    width: 100,
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingBottom: 3
  }
});

export default Interventions;
