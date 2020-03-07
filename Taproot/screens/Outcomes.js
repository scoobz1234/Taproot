import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Base64 from "base-64";
import Axios from "axios";
import StarRating from "react-native-star-rating";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import Styles from "../constants/Styles";

class OutcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://taproot-dev.azurewebsites.net/api/new-encounter/",
      token: "tradmin:devpasstaproot",
      notes: "",
      rating: 1,
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onRatingSubmit(behaviorURL, interventionURL) {
    this.setModalVisible(!this.state.modalVisible);
    this.postRequest(behaviorURL, interventionURL, true);
  }

  onNotesChange = notes => {
    this.setState({ notes });
  };

  onStarRatingPress = rating => {
    this.setState({ rating });
  };

  postRequest(behaviorURL, interventionURL, didWork) {
    const hash = Base64.encode(this.state.token);
    const Auth = "Basic " + hash;

    Axios.post(
      this.state.url,
      {
        caregiver: "http://taproot-dev.azurewebsites.net/api/caregivers/1/",
        behavior: behaviorURL,
        intervention: interventionURL,
        outcome: didWork,
        behavior_rating: this.state.rating,
        notes: this.state.notes
      },
      {
        headers: {
          Authorization: Auth,
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        return console.log("SUCCESS: " + JSON.stringify(response));
      })
      .catch(error => alert("ERROR: " + error));

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
    const interventionURL = params.interventionURL;
    const behaviorURL = params.behaviorURL;

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
                  style={Styles.input}
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
                      this.postRequest(behaviorURL, interventionURL, false)
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
                        this.onRatingSubmit(behaviorURL, interventionURL);
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
