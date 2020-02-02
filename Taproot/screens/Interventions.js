import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const Interventions = props => {
  return (
    <View>
      <Text>Interventions Screen</Text>
    </View>
  );
};

Interventions.navigationOptions = navData => {
  return {
    headerTitle: "Interventions",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
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

const styles = StyleSheet.create({});

export default Interventions;
