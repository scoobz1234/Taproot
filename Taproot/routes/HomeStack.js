import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

//Import your screens here
import Login from "../screens/LoginForm";
import ResidentSelection from "../screens/ResidentSelection";
import Outcomes from "../screens/Outcomes";
import Resident from "../screens/Resident";
import Interventions from "../screens/Interventions";
import Behaviors from "../screens/Behaviors";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : Colors.primary
    },
    headerTintColor: Platform.OS === "android" ? "white" : "white"
  }
};

// This is the navigator that handles the left tab, or login tab
// this is the long way to the interventions screen.
const LoginRouteNavigator = createStackNavigator(
  {
    Login: Login,
    Behaviors: Behaviors,
    ResidentSelection: ResidentSelection,
    Resident: Resident,
    Interventions: Interventions,
    Outcomes: Outcomes
  },
  defaultStackNavOptions
);

// This is the navigator that handles the right tab, or the direct
// route to the interventions screen...
const DirectRouteNavigator = createStackNavigator(
  {
    Interventions: Interventions,
    Outcomes: Outcomes
  },
  defaultStackNavOptions
);

// This is how we configure the Tabs at the bottom of the screen.
const tabScreenConfiguration = {
  Main: {
    screen: LoginRouteNavigator,
    navigationOptions: {
      tabBarLabel: "Main",
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-log-in" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarLabel: Platform.OS === "android" ? <Text>Main</Text> : "Main",
    }
  },
  Interventions: {
    screen: DirectRouteNavigator,
    navigationOptions: {
      tabBarLabel: "Interventions",
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-send" size={25} color={tabInfo.tintColor} />;
      },
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text>Interventions</Text>
        ) : (
          "Interventions"
        )
    }
  }
};

const tabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfiguration, {
        activeTintColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfiguration, {
        tabBarOptions: {
          activeTintColor: Colors.tertiary,
          inactiveBackgroundColor: 'white',
          activeBackgroundColor: Colors.primary
        }
      });

const MainNavigator = createDrawerNavigator(
  {
    Main: {
      screen: tabNavigator,
      navigationOptions: {
        drawerLabel: "Main"
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.tertiary
    }
  }
);

export default createAppContainer(MainNavigator);
