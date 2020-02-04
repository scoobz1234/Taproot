import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";

const ResidentItem = props => {
  return (
    <View style={styles.residentItem}>
      <TouchableOpacity onPress={props.onSelectResident}>
        <View style={styles.mainContainer}>
          <View>
            <Image
              style={styles.image}
              source={require("../assets/Portrait_Placeholder.png")}
            />
          </View>
          <View style={{marginTop:5}}>
            <Text style={styles.lbl}>Name: <Text style={styles.text}>{props.name}</Text></Text>
            <Text style={styles.lbl}>ID: <Text style={styles.text}>{props.id}</Text></Text>
            <Text style={styles.lbl}>Facility: <Text style={styles.text}>{props.facility}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  residentItem: {
    height: 100,
    width: "97%",
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    overflow: "hidden",
    margin: 3
  },
  mainContainer: {
    flexDirection: "row"
  },
  image: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 90,
    height: 90,
    margin: 5    
  },
  lbl: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.primary
  },
  text: {
      fontSize: 20,
      color: 'white'
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  }
});

export default ResidentItem;
