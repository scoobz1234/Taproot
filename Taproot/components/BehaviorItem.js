import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../constants/Colors";

import { RFValue } from "react-native-responsive-fontsize";

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
    height: Dimensions.get('screen').height * .08,
    width: "100%",
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  lbl: {
    fontSize: RFValue(22, 680),
    fontWeight: "bold",
    color: 'white'
  }
});

export default BehaviorItem;
