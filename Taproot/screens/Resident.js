import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Axios from "axios";
import Base64 from "base-64";
import HeaderButton from "../components/HeaderButton";
import BehaviorItem from "../components/BehaviorItem";
import Styles from "../constants/Styles";

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      behaviors: null,
      isLoading: true,
      residentID: null
    };
  }

  componentDidMount() {
    const token = "tradmin:devpasstaproot";
    const hash = Base64.encode(token);
    const Basic = "Basic " + hash;

    //Gets the residents data from the api, headers are used for authorization
    //utilize the three lines of code above for authorization.
    Axios.get("http://taproot-dev.azurewebsites.net/api/residents.json", {
      headers: { Authorization: Basic }
    })
      //after we get/auth we take the response data and copy it to the response object
      .then(response => response.data)
      .then(data => {
        this.setState({ dataSource: data }); // use the data to set the state dataSource
      })
      .catch(error => console.log(error));

    //Gets the behavior data from the api
    Axios.get("http://taproot-dev.azurewebsites.net/api/behaviors.json", {
      headers: { Authorization: Basic }
    })
      .then(response => response.data)
      .then(data => {
        this.setState({ isLoading: false, behaviors: data });
      })
      .catch(error => console.log(error));
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
                  behaviorID: itemData.item.id
                }
              });
            }}
          />
        );
      };

      // get the residentID from the previous pages params, and set it to residentID
      const residentID = this.props.navigation.getParam("residentID");

      // next we take the dataSource (json object we got earlier) and we find the residentID and return that object
      const selectedResident = this.state.dataSource.find(
        resident => resident.id === residentID
      );
      // Then we get the selected behaviors from the json object we got earlier, and filter them by the first/last name of the resident
      const selectedBehaviors = this.state.behaviors.filter(behavior =>
        behavior.info.includes(
          selectedResident.first_name + "_" + selectedResident.last_name
        )
      );

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
                  {selectedResident.first_name}{" "}
                </Text>
              </Text>
              <Text style={Styles.resident_Label}>
                Last:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's last name */}
                  {selectedResident.last_name}{" "}
                </Text>
              </Text>
              <Text style={Styles.resident_Label}>
                D.O.B:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's date of birth */}
                  {selectedResident.dob}{" "}
                </Text>
              </Text>
              <Text style={Styles.resident_Label}>
                Gender:{" "}
                <Text style={Styles.resident_Text}>
                  {/* Returns the selected resident's gender */}
                  {selectedResident.gender}{" "}
                </Text>
              </Text>
            </View>
          </View>
          {/* This view contains the FlatList of behaviors */}
          <View style={Styles.resident_BottomContainer}>
            <Text style={Styles.resident_BehaviorsLabel}>Behaviors</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={selectedBehaviors} // FlatList contains the selected behaviors for the data
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
