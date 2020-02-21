import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
  Dimensions
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/Colors";
import { BEHAVIORS, RESIDENTS } from "../data/dummy_data";
import BehaviorItem from "../components/BehaviorItem";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

class Patient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const residentID = this.props.navigation.getParam("residentID");
    const selectedResident = RESIDENTS.find(
      resident => resident.id === residentID
    );

    const renderBehaviorItem = itemData => {
      return (
        <BehaviorItem
          id={itemData.item.id}
          name={itemData.item.name}
          onSelectBehavior={() => {
            this.props.navigation.navigate({
              routeName: "Interventions",
              params: {
                BehaviorID: itemData.item.id
              }
            });
          }}
        />
      );
    };

    return (
      <View style={styles.screen}>
        <View style={styles.top_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={require("../assets/Portrait_Placeholder.png")}
            />
          </View>
          <View style={styles.demographic_container}>
            <Text style={styles.label}>
              Name:{" "}
              <Text style={styles.label_text}>{selectedResident.name}</Text>
            </Text>
            <Text style={styles.label}>
              D.O.B:{" "}
              <Text style={styles.label_text}>{selectedResident.dob}</Text>
            </Text>
            <Text style={styles.label}>
              Gender:{" "}
              <Text style={styles.label_text}>{selectedResident.gender}</Text>
            </Text>
            <Text style={styles.label}>Diagnosis: </Text>
            <View
              style={{
                height: Dimensions.get("screen").height * 0.04,
                width: Dimensions.get("screen").width * 0.5
              }}
            >
              <ScrollView horizontal={true} scrollEventThrottle={16}>
                {selectedResident.diagnosis.map((item, key) => (
                  <View key={key} style={styles.diagnosis_item}>
                    <Text style={styles.diagnosis_text}>{item},</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.bottom_container}>
          <Text
            style={{
              fontSize: RFValue(25, 680),
              fontWeight: "bold",
              alignSelf: "center"
            }}
          >
            Behaviors
          </Text>
          <FlatList
            data={BEHAVIORS}
            renderItem={renderBehaviorItem}
            style={styles.list_behaviors}
          />
        </View>
      </View>
    );
  }
}

Patient.navigationOptions = navData => {
  return {
    headerTitle: "Resident Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
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
    flex: 1
  },
  top_container: {
    flexDirection: "row",
    backgroundColor: Colors.tertiary
  },
  image_container: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 15
  },
  image: {
    borderRadius: 30,
    overflow: "hidden",
    width: Dimensions.get("screen").width * 0.38,
    height: Dimensions.get("screen").height * 0.18
  },
  demographic_container: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10
  },
  label: {
    fontSize: RFValue(20, 680),
    fontWeight: "bold",
    color: Colors.primary
  },
  label_text: {
    fontSize: RFValue(18, 680),
    color: "white"
  },
  diagnosis_text: {
    fontSize: RFValue(16, 680),
    color: "white",
    marginLeft: 3
  },
  list_behaviors: {
    width: "90%",
    height: "64%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.primary
  },
  diagnosis_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    margin: 1
  }
});

export default Patient;
