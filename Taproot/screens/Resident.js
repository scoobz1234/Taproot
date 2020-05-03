// Created by Stephen R. Ouellette, 2020 
// Student University of Advancing Technology
import React from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import BehaviorItem from "../components/BehaviorItem";
import Styles from "../constants/Styles";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('taprootDB.db');

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      behaviors: null,
      isLoading: true,
      residentID: this.props.navigation.getParam("residentID")
    };
  }

  componentDidMount() { 
    this.getResident();
    this.getBehaviors();
  }

  getResident(){
    // database.transaction(callback,error,success);
    // console.log('Getting resident:',this.state.residentID);
    db.transaction(tx => {
      tx.executeSql(
        // SQL Statement string
        "SELECT * FROM tbl_residents WHERE id LIKE '%" + this.state.residentID + "%'",
        // parameters (these pertain to ? you might put into the SQL statement string)
        [],
        // Callback Success Function
        (_, { rows }) => {this.setState({dataSource: rows._array});},
        // Callback Error Function
        (t, error) => {console.log('Get Behaviors Callback Error:',error);});}, 
      // Transaction Error Function
      (t, error) => { console.log('Get Behaviors Transaction Failure:',error);},);
  }

  getBehaviors(){
    // database.transaction(callback,error,success);
    // console.log('Getting Behaviors for:',this.state.residentID);
    db.transaction(tx => {
      tx.executeSql(
        // SQL Statement string
        "SELECT * FROM tbl_behaviors AS b INNER JOIN tbl_reactive_behaviors AS rb ON b.id = rb.id WHERE rb.resident LIKE '%" + this.state.residentID + "%'",
        // parameters (these pertain to ? you might put into the SQL statement string)
        [],
        // Callback Success Function
        (_, { rows }) => {
          console.log(rows);
          this.setState({behaviors: rows._array}); 
          this.setState({isLoading: false});},
        // Callback Error Function
        (t, error) => {console.log('Get Behaviors Callback Error:',error);});}, 
      // Transaction Error Function
      (t, error) => { console.log('Get Behaviors Transaction Failure:',error);},);
}

  render() {
    // if the state is loading, we display the activity indicator, else we display the page...
    if (this.state.isLoading) {
      return (
        <View style={Styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    } else {
      //This is the object that handles rendering the data in the flatlist
      //it returns a behavior item (component we built) which displays the data
      const renderBehaviorItem = itemData => {
        return (
          <BehaviorItem
            id={itemData.item.id}
            name={itemData.item.name}
            onSelectBehavior={() => {
              this.props.navigation.navigate({
                routeName: "Interventions",
                params: {
                  behaviorID: itemData.item.behavior,
                  residentID: this.state.residentID,
                  authToken: this.props.navigation.getParam('authToken')
                }
              });
            }}
          />
        );
      };

      return (
        <View style={Styles.resident_MainView}>
          <View style={Styles.resident_TopContainer}>
            <View style={Styles.resident_ResidentProfilePictureContainer}>
              {/* Image of resident will go here, placeholder for now */}
              <Image
                style={Styles.resident_ResidentProfileImage}
                source={require("../assets/Portrait_Placeholder.png")}
              />
            </View>
            <View style={Styles.resident_DemographicsContainer}>
              <Text style={Styles.resident_Label}>
                First:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's first name */}
                  {this.state.dataSource[0].first_name}{" "}
                </Text>
              </Text>
              <Text style={Styles.resident_Label}>
                Last:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's last name */}
                  {this.state.dataSource[0].last_name}{" "}
                </Text>
              </Text>
              <Text style={Styles.resident_Label}>
                D.O.B:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's date of birth */}
                  {this.state.dataSource[0].date_of_birth}{" "}
                </Text>
              </Text>
              <Text style={Styles.resident_Label}>
                Gender:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's gender */}
                  {this.state.dataSource[0].gender}{" "}
                </Text>
              </Text>
            </View>
          </View>
          {/* This view contains the FlatList of behaviors */}
          <View style={Styles.resident_BottomContainer}>
            <Text style={Styles.resident_BehaviorsLabel}>Behaviors</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.behaviors} // FlatList contains the selected behaviors for the data
              renderItem={renderBehaviorItem} //render using the renderbehavioritem method
              style={Styles.resident_BehaviorsList} // set styles
            />
          </View>
        </View>
      );
    }
  }
}

Patient.navigationOptions = navData => {
  return {
    headerTitle: "Resident Profile",
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

export default Patient;
