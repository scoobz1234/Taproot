import React from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Axios from "axios";
import Base64 from "base-64";

import HeaderButton from "../components/HeaderButton";
import ResidentItem from "../components/ResidentItem";
import Styles from "../constants/Styles";

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
    const token = "trapp:tappass1";
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
        <View style={Styles.activityIndicator}>
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
                params: { residentID: itemData.item.id }
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
        <View style={Styles.residentSelection_MainView}>
          <View style={Styles.residentSelection_SearchBarContainer}>
            <TextInput
              style={Styles.residentSelection_SearchBar}
              placeholder="Search"
              onChangeText={value =>
                this.setState({ searchKey: value.toLocaleLowerCase() })
              }
            />
          </View>
          <View style={Styles.residentSelection_InterventionListContainer}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
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

export default ResidentSelectionScreen;
