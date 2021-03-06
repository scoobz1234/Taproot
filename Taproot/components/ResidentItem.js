import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
            <Text style={styles.lbl}>Last: <Text style={styles.text}>{props.last_name}</Text></Text>
            <Text style={styles.lbl}>First: <Text style={styles.text}>{props.first_name}</Text></Text>
            <Text style={styles.lbl}>Facility: <Text style={styles.text}>{props.facility}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  residentItem: {
    justifyContent: 'flex-end',
    width: "97%",
    backgroundColor: Colors.GREEN,
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
    width: Dimensions.get('screen').width * .25,
    height: Dimensions.get('screen').height * .15,
    margin: 5    
  },
  lbl: {
      fontSize: RFValue(26, 680),
      fontWeight: 'bold',
      color: Colors.NAVY
  },
  text: {
      fontSize: RFValue(22, 680),
      color: 'white'
  }
});

export default ResidentItem;
