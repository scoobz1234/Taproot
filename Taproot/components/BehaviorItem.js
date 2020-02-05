import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const BehaviorItem = props => {
  return (
    <View style={styles.behaviorItem}>
      <TouchableOpacity onPress={props.onSelectBehavior}>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.lbl}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  behaviorItem: {
    height: 45,
    width: "97%",
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: 'center',
    margin: 3
  },
  lbl: {
    fontSize: 22,
    fontWeight: "bold",
    color: 'white'
  }
});

export default BehaviorItem;
