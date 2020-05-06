import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "./Colors";

export default StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card_mainCard: {
    width: 400,
    maxWidth: "90%",
    alignItems: "center"
  },
  button_mainButton: {
    backgroundColor: Colors.NAVY,
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  view_mainView: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  view_homeScreen: {
    flex: 1,
    alignItems: "center"
  },
  residentSelection_MainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  residentSelection_SearchBar: {
    justifyContent: "center",
    width: "100%",
    height: Dimensions.get("screen").height / 18,
    marginLeft: 10,
    borderRadius: 10,
    fontSize: RFValue(26, 680)
  },
  residentSelection_SearchBarContainer: {
    width: "95%",
    fontSize: RFValue(26, 680),
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  residentSelection_InterventionListContainer: {
    height: "90%",
    width: "99%",
    marginLeft: 5
  },
  resident_MainView: {
    flex: 1
  },
  resident_BottomContainer: {
    backgroundColor: "white"
  },
  resident_TopContainer: {
    flexDirection: "row",
    backgroundColor: Colors.NAVY
  },
  resident_ResidentProfilePictureContainer: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 15
  },
  resident_ResidentProfileImage: {
    borderRadius: 30,
    overflow: "hidden",
    width: Dimensions.get("screen").width * 0.38,
    height: Dimensions.get("screen").height * 0.18
  },
  resident_DemographicsContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10
  },
  resident_Label: {
    fontSize: RFValue(20, 680),
    fontWeight: "bold",
    color: Colors.DARKGRAY
  },
  resident_Text: {
    fontSize: RFValue(18, 680),
    color: "white"
  },
  resident_BehaviorsList: {
    width: "90%",
    height: "64%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.NAVY
  },
  resident_BehaviorsLabel: {
    fontSize: RFValue(25, 680),
    fontWeight: "bold",
    alignSelf: "center"
  },
  outcomes_MainView: {
    flex: 1,
    padding: 10,
  },
  outcomes_Label: {
    fontSize: RFValue(22, 680),
    fontWeight: "bold",
    alignSelf: "center"
  },
  outcomes_CardView: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  outcomes_Card: {
    width: Dimensions.get("screen").width,
    maxWidth: "90%",
    maxHeight: Dimensions.get("screen").height,
    padding: 20,
    marginBottom: 10,
    backgroundColor: Colors.GREEN,
    color: Colors.NAVY
  },
  outcomes_CardText: {
    fontSize: RFValue(18, 680),
    textAlign: "center"
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  outcomes_ButtonContainer: {
    borderRadius: 10,
    height: Dimensions.get("screen").height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2
  },
  outcomes_ButtonText: {
    fontWeight: "bold",
    fontSize: RFValue(20, 680)
  },
  outcomes_Modal: {
    marginTop: 150,
    backgroundColor: "rgba(0,0,0,0.9)",
    height: "50%",
    justifyContent: "center",
  },
  outcomes_SubmitText: {
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.GREEN,
    color: Colors.NAVY,
    fontSize: 24,
    fontWeight: "bold",
    width: 200,
    textAlign: "center",
    borderRadius: 10
  },
  interventions_MainView: {
    paddingRight: 10,
    paddingLeft: 10
  },
  interventions_InterventionListContainer: {
    marginVertical: 5,
    color: Colors.NAVY,
    backgroundColor: Colors.GREEN,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden"
  },
  interventions_InterventionListText: {
    padding: 5,
    fontSize: RFValue(18, 680),
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.NAVY
  },
  login_MainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  login_Logo: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 8
  },
  login_LogoContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  login_Label: {
    color: "black",
    marginBottom: 5
  },
  login_Card: {
    width: Dimensions.get("screen").width,
    maxWidth: "90%",
    padding: 20
  },
  login_TextInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.6,
    marginBottom: 5
  },
  login_ButtonContainer: {
    backgroundColor: Colors.GREEN,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 16,
    justifyContent: "center",
    alignItems: "center"
  },
  login_ButtonText: {
    color: Colors.NAVY,
    fontWeight: "bold",
    fontSize: 18
  }
});
