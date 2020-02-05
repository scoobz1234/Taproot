import React from "react";
import { View, StyleSheet, FlatList, TextInput, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { RESIDENTS } from "../data/dummy_data";
import ResidentItem from "../components/ResidentItem";

class PatientSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ""
    };
  }
  render() {
    const renderResidentItem = itemData => {
      return (
        <ResidentItem
          id={itemData.item.id}
          name={itemData.item.name}
          facility={itemData.item.facility}
          onSelectResident={() => {
            this.props.navigation.navigate({
              routeName: "Patient",
              params: {
                residentID: itemData.item.id
              }
            });
          }}
        />
      );
    };

    const displayedResidents = RESIDENTS.filter(
      resident =>
        resident.name.toLocaleLowerCase().indexOf(this.state.searchKey) >= 0
    );

    return (
      <View style={styles.screen}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={value =>
              this.setState({ searchKey: value.toLocaleLowerCase() })
            }
          />
        </View>
        <View style={styles.list_container}>
          <FlatList
            data={displayedResidents}
            renderItem={renderResidentItem}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    );
  }
}

PatientSelectionScreen.navigationOptions = navData => {
  return {
    headerTitle: "Patients",
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    width: "100%"
  },
  input: {
    justifyContent: "center",
    width: "100%",
    height: 45,
    marginLeft: 10,
    borderRadius: 10,
    fontSize: 18
  },
  input_container: {
    width: "95%",
    fontSize: 25,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  list_container: {
    height: "90%",
    width: "99%",
    marginLeft: 5
  }
});

export default PatientSelectionScreen;
