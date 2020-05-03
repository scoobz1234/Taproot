// Created by Stephen R. Ouellette, 2020 
// Student University of Advancing Technology

import React from "react";
import { View, FlatList, TextInput, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import ResidentItem from "../components/ResidentItem";
import Styles from "../constants/Styles";
import * as SQLite from 'expo-sqlite';
import getData from '../constants/Database';
const db = SQLite.openDatabase('taprootDB.db'); // Open the database //

class ResidentSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", // Holds the search term //
      isLoading: true, // Flag for loading checked //
      data: [],  // Holds the data we get from the database //
      facilities: []
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({ isLoading: false});
    });
    const { search } = this.state;
    await this.fetchData(search);
  }

  componentWillUnmount() {
    this.focusListener.remove(); // Make sure you unsubscribe from the listener //
  }

  async handleSearch(val) {
    this.setState({ search: val });
    await this.fetchData(val);
  }

  fetchData(search) {
    var query = "SELECT * FROM tbl_residents WHERE last_name LIKE '%" + search + "%' ";
    var params = [];
    db.transaction((tx) => {
      tx.executeSql(query, params, (tx, results) => {
        if (results.rows._array.length > 0) {
          this.setState({ data: results.rows._array });
        }
      }, function (tx, err) { console.log(err); });
    });

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
            facility={itemData.item.facility}
            onSelectResident={() => {
              this.props.navigation.navigate({
                routeName: "Resident",
                params: { 
                  residentID: itemData.item.id,
                  authToken: this.props.navigation.getParam('authToken') 
                }
              });
            }}
          />
        );
      };

      const displayedResidents = this.state.data.filter(
        resident => resident.last_name 
            .toLocaleLowerCase()
            .indexOf(this.state.search) >= 0
      );

      displayedResidents.sort((a, b) => a.last_name > b.last_name);

      return (
        <View style={Styles.residentSelection_MainView}>
          <View style={Styles.residentSelection_SearchBarContainer}>
            <TextInput
              style={Styles.residentSelection_SearchBar}
              placeholder="Search"
              onChangeText={value =>
                this.setState({ search: value.toLocaleLowerCase() })
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
          title="Back"
          iconName="ios-arrow-round-back"
          onPress={() => {
            navData.navigation.pop();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ResidentSelectionScreen;
