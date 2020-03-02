import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Modal,
  TouchableHighlight,
  Alert,
  ToastAndroid
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { RFValue } from "react-native-responsive-fontsize";
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
      this.props.navigation.replace("Behaviors");
    } else {
      this.props.navigation.pop();
    }
  }

  render() {
    // The following items get data from the previous screen that were sent as parameters...
    const params = this.props.navigation.state.params;
    const interventionInfo = params.interventionInfo;
    const interventionURL = params.interventionURL;
    const behaviorURL = params.behaviorURL;

    return (
      <View style={Styles.view_mainView}>
        <Text style={styles.label}>Intervention Action</Text>
        <Card style={styles.card}>
          <Text style={{ fontSize: RFValue(18, 680), textAlign: "center" }}>
            {interventionInfo}
          </Text>
        </Card>
        <Text style={styles.label}>Notes</Text>
        <Card style={styles.card}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={this.onNotesChange}
          />
        </Card>
        <Text style={styles.label}>Did it Work?</Text>
        <Card style={styles.card}>
          <View style={{ paddingTop: 5, paddingBottom: 5 }}>
            <TouchableOpacity
              onPress={() => this.setModalVisible(!this.state.modalVisible)}
            >
              <View
                style={{
                  ...styles.button_container,
                  backgroundColor: Colors.primary
                }}
              >
                <Text style={{ ...styles.text, color: Colors.tertiary }}>
                  Yes
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.postRequest(false)}>
              <View
                style={{
                  ...styles.button_container,
                  backgroundColor: Colors.tertiary
                }}
              >
                <Text style={{ ...styles.text, color: Colors.primary }}>
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
          <View style={styles.modalView}>
            <View>
              <Text
                style={{ ...styles.label, color: "white", paddingBottom: 40 }}
              >
                Please Rate the outcome:
              </Text>
              <View style={{ paddingBottom: 20 }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  starSize={30}
                  fullStarColor={Colors.tertiary}
                  emptyStarColor={Colors.primary}
                  rating={this.state.rating}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.onRatingSubmit(behaviorURL, interventionURL);
                }}
              >
                <Text style={styles.submitText}>Submit Rating</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
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

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width,
    maxWidth: "90%",
    maxHeight: Dimensions.get("screen").height,
    padding: 20,
    marginBottom: 10
  },
  label: {
    fontSize: RFValue(22, 680),
    fontWeight: "bold",
    alignSelf: "center"
  },
  button_container: {
    borderRadius: 10,
    height: Dimensions.get("screen").height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2
  },
  text: {
    fontWeight: "bold",
    fontSize: RFValue(20, 680)
  },
  modalView: {
    marginTop: 150,
    backgroundColor: "rgba(0,0,0,0.9)",
    height: "50%",
    justifyContent: "center"
  },
  modal: {
    width: 200
  },
  submitText: {
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.tertiary,
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    width: 200,
    textAlign: "center",
    borderRadius: 10
  }
});

export default OutcomeScreen;
