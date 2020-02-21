import React from "react";
import { View, StyleSheet, FlatList, TextInput, Image, Dimensions} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { RESIDENTS } from "../data/dummy_data";
import ResidentItem from "../components/ResidentItem";

class ResidentSelectionScreen extends React.Component {
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
              routeName: "Resident",
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

ResidentSelectionScreen.navigationOptions = navData => {
  return {
    headerTitle: "Residents",
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
    height: Dimensions.get('screen').height / 18,
    marginLeft: 10,
    borderRadius: 10,
    fontSize: RFValue(26, 680)
  },
  input_container: {
    width: "95%",
    fontSize: RFValue(26, 680),
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

export default ResidentSelectionScreen;
