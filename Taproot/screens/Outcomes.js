import React from "react";
import { View, TouchableOpacity, Text, TextInput, Modal, TouchableHighlight,
  ScrollView, ToastAndroid, Keyboard, KeyboardAvoidingView, 
  TouchableWithoutFeedback } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Axios from "axios";
import StarRating from "react-native-star-rating";
import moment from 'moment';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('taprootDB.db');

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import Styles from "../constants/Styles";

class OutcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://taproot-dev.azurewebsites.net/api/encounters/",
      token: "trapp:tappass1",
      notes: "From App: ",
      rating: 1.0,
      modalVisible: false,
      caregiverID: 0,
      reactive_behavior: 0
    };
  }


  componentDidMount(){
    this.getData(this.props.navigation.getParam("residentID"), this.props.navigation.getParam("behaviorID"));
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onRatingSubmit(interventionID, residentID) {
    this.setModalVisible(!this.state.modalVisible);
    this.postRequest(interventionID, residentID, true);
  }

  onNotesChange = notes => {
    this.setState({ notes });
  };

  onStarRatingPress = rating => {
    this.setState({ rating });
  };

  getData(residentID, behaviorID){
    db.transaction(tx => {
      tx.executeSql(
        // SQL Statement string
        "SELECT * FROM tbl_reactive_behaviors WHERE resident = ? AND behavior = ?",
        // parameters (these pertain to ? you might put into the SQL statement string)
        [residentID, behaviorID],
        // Callback Success Function
        (_, { rows }) => {

          this.setState({reactive_behavior: rows._array[0].id});},
        // Callback Error Function
        (t, error) => {console.log('Get Interventions Callback Error:',error);});}, 
      // Transaction Error Function
      (t, error) => { console.log('Get Intervention Transaction Failure:',error);},);

    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM tbl_user", [], (_, { rows }) => {
          this.setState({caregiverID: rows._array[0].id});
          console.log('Caregiver:', this.state.caregiverID);
        },
        (t, error) => {console.log('Get Interventions Callback Error:',error);});}, 
      (t, error) => { console.log('Get Intervention Transaction Failure:',error);},);
  }

  postRequest(interventionID, residentID, didWork) {
    const auth = this.props.navigation.getParam('authToken');
    const date = moment().format('YYYY-MM-DD');
    const rating = this.state.rating;
    const notes = this.state.notes;
    const caregiverID = this.state.caregiverID;
    const ra = this.state.reactive_behavior;
    let outcome = 0;
    if (didWork) { outcome = 1; }

    Axios.post(
      this.state.url,
      {
        resident: residentID,
        resistant_action: ra,
        intervention: interventionID,
        caregiver: caregiverID,
        encounter_date: date,
        outcome: outcome,
        rating: rating,
        notes: notes
      },
      {
        headers: {
          Authorization: auth,
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        return console.log("SUCCESS: " + JSON.stringify(response));
      })
      .catch( error => { console.log("ERROR: " + error); } );

    if (didWork) {
      ToastAndroid.showWithGravityAndOffset(
        "Outcome Submitted!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      this.props.navigation.replace("ResidentSelection");
    } else {
      this.props.navigation.replace("ResidentSelection");
    }
  }

  render() {
    // The following items get data from the previous screen that were sent as parameters...
    const params = this.props.navigation.state.params;
    const interventionInfo = params.interventionInfo;
    const interventionID = params.interventionID;
    const residentID = params.residentID;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={Styles.outcomes_MainView}>
            <View style={Styles.outcomes_CardView}>
              <Text style={Styles.outcomes_Label}>Intervention Action</Text>
              <Card style={Styles.outcomes_Card}>
                <Text style={Styles.outcomes_CardText}>{interventionInfo}</Text>
              </Card>
              <Text style={Styles.outcomes_Label}>Notes</Text>
              <Card style={Styles.outcomes_Card}>
                <TextInput
                  style={{height: 50}}
                  multiline={true}
                  autoCapitalize="none"
                  placeholder="Enter Your Notes Here!"
                  onChangeText={this.onNotesChange}
                />
              </Card>
              <Text style={Styles.outcomes_Label}>Did it Work?</Text>
              <Card
                style={{ ...Styles.outcomes_Card, backgroundColor: "white" }}
              >
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }
                  >
                    <View
                      style={{
                        ...Styles.outcomes_ButtonContainer,
                        backgroundColor: Colors.NAVY
                      }}
                    >
                      <Text
                        style={{
                          ...Styles.outcomes_ButtonText,
                          color: Colors.GREEN
                        }}
                      >
                        Yes
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.postRequest(interventionID, residentID, false)
                    }
                  >
                    <View
                      style={{
                        ...Styles.outcomes_ButtonContainer,
                        backgroundColor: Colors.GREEN
                      }}
                    >
                      <Text
                        style={{
                          ...Styles.outcomes_ButtonText,
                          color: Colors.NAVY
                        }}
                      >
                        No
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
              >
                <View style={Styles.outcomes_Modal}>
                  <View>
                    <Text
                      style={{
                        ...Styles.outcomes_Label,
                        color: "white",
                        paddingBottom: 40
                      }}
                    >
                      Please Rate the outcome:
                    </Text>
                    <View style={{ paddingBottom: 20 }}>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={30}
                        fullStarColor={Colors.GREEN}
                        emptyStarColor={Colors.NAVY}
                        rating={this.state.rating}
                        selectedStar={rating => this.onStarRatingPress(rating)}
                      />
                    </View>
                    <TouchableHighlight
                      onPress={() => {
                        this.onRatingSubmit(interventionID, residentID);
                      }}
                    >
                      <Text style={Styles.outcomes_SubmitText}>
                        Submit Rating
                      </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

OutcomeScreen.navigationOptions = navData => {
  return {
    headerTitle: "Intervention Outcome",
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

export default OutcomeScreen;
