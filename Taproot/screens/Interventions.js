// Created by Stephen R. Ouellette, 2020 
// Student University of Advancing Technology
import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Styles from "../constants/Styles";
import BehaviorItem from "../components/BehaviorItem";

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('taprootDB.db');

class Interventions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true,
      isLoading: true,
      dataSource: null,
      behaviorID: null
    };
  }

  componentDidMount() { 
    this.getIntervention();
  }

  getIntervention(){
    db.transaction(tx => {
      tx.executeSql(
        // SQL Statement string
        "SELECT * FROM tbl_interventions WHERE behavior LIKE '%" + this.props.navigation.getParam("behaviorID") + "%'",
        // parameters (these pertain to ? you might put into the SQL statement string)
        [],
        // Callback Success Function
        (_, { rows }) => {
          this.setState({dataSource: rows._array});
          this.setState({isLoading: false});},
        // Callback Error Function
        (t, error) => {console.log('Get Interventions Callback Error:',error);});}, 
      // Transaction Error Function
      (t, error) => { console.log('Get Intervention Transaction Failure:',error);},);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={Styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    } else {

      const renderInterventionItem = itemData => {
        return (
          <BehaviorItem
            id={itemData.item.id}
            name={itemData.item.intervention_details}
            onSelectBehavior={() => {
              this.props.navigation.navigate({
                routeName: "Outcomes",
                params: {
                  interventionID: itemData.item.id,
                  residentID: this.props.navigation.getParam("residentID"),
                  interventionInfo: itemData.item.intervention_details,
                  behaviorID: this.props.navigation.getParam("behaviorID"),
                  authToken: this.props.navigation.getParam('authToken')
                }
              })
            }}
          />
        );
      };
      return (
        <View style={Styles.resident_MainView}>
          <View style={Styles.resident_BottomContainer}>
            <Text style={Styles.resident_BehaviorsLabel}>Interventions</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.dataSource} // FlatList contains the selected behaviors for the data
              renderItem={renderInterventionItem} //render using the renderbehavioritem method
              style={Styles.resident_BehaviorsList} // set styles
            />
          </View>
        </View>
      );
    }
  }
}

Interventions.navigationOptions = navData => {
  return {
    headerTitle: "Interventions",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-arrow-round-back"
          onPress={() => {
            navData.navigation.pop();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default Interventions;
