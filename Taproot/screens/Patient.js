import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";

import Colors from "../constants/Colors";
import { BEHAVIORS, INTERVENTIONS, RESIDENTS } from "../data/dummy_data";
import BehaviorItem from "../components/BehaviorItem";

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
            <Text style={styles.diagnosis_text}>
              {selectedResident.diagnosis}
            </Text>
          </View>
        </View>
        <View style={styles.bottom_container}>
          <Text
            style={{ fontSize: 28, fontWeight: "bold", alignSelf: "center" }}
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
    width: 150,
    height: 150
  },
  demographic_container: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary
  },
  label_text: {
    fontSize: 18,
    color: "white"
  },
  diagnosis_text: {
    fontSize: 14,
    color: "white"
  },
  list_behaviors: {
    width: "90%",
    height: "60%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.primary
  }
});

export default Patient;
