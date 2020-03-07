import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Axios from "axios";
import Base64 from "base-64";

import HeaderButton from "../components/HeaderButton";
import ResidentItem from "../components/ResidentItem";

class ResidentSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      dataSource: null,
      isLoading: true
    };
  }

  componentDidMount() {
    const token = "tradmin:devpasstaproot";
    const hash = Base64.encode(token);
    const Basic = "Basic " + hash;

    Axios.get("http://taproot-dev.azurewebsites.net/api/residents.json", {
      headers: { Authorization: Basic }
    })
      .then(response => response.data)
      .then(data => {
        this.setState({ isLoading: false, dataSource: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerStyle}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const renderResidentItem = itemData => {
        return (
          <ResidentItem
            id={itemData.item.id}
            first_name={itemData.item.first_name}
            last_name={itemData.item.last_name}
            facility={itemData.item.facility.name}
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

      const displayedResidents = this.state.dataSource.filter(
        resident =>
          resident.last_name
            .toLocaleLowerCase()
            .indexOf(this.state.searchKey) >= 0
      );

      displayedResidents.sort((a, b) => a.last_name > b.last_name);

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
    )
  };
};

const styles = StyleSheet.create({
  scrollView: {
    paddingRight: 10,
    paddingLeft: 10
  },
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
    height: Dimensions.get("screen").height / 18,
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
