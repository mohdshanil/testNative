import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import WelcomeScreen from "app/src/screens/Welcome/WelcomeScreen";
import AuthScreen from "app/src/screens/Auth/AuthScreen";
import DeckScreen from "app/src/screens/Deck/DeckScreen";
import MapScreen from "app/src/screens/Map/MapScreen";
import ReviewJobsScreen from "app/src/screens/ReviewJobs/ReviewJobsScreen";
import SettingsScreen from "app/src/screens/Settings/SettingsScreen";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  placeButtons: {
    padding: 40
  }
});

export const PublicRoutes = createStackNavigator(
  {
    welcome: {
      screen: WelcomeScreen
    },
    auth: {
      screen: AuthScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "welcome",
    tabBarOptions: {
      activeTintColor: "#ffffff",
      labelStyle: {
        fontSize: 18,
        color: "#f3f3f3",
        marginBottom: 10
      },
      style: {
        backgroundColor: "#6b52ae"
      }
    },
    lazy: true,
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

export const PrivateRoutes = createBottomTabNavigator(
  {
    map: {
      screen: MapScreen,
      navigationOptions: {
        title: "Map"
      }
    },
    deck: {
      screen: DeckScreen,
      navigationOptions: {
        title: "Deck"
      }
    },
    review: {
      screen: createStackNavigator({
        reviewJobs: {
          screen: ReviewJobsScreen,
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              headerTitle: "Review",
              headerRight: (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("settings")}
                  >
                    <View style={styles.placeButtons}>
                      <Icon size={30} name="ios-settings" color="#20232a" />
                    </View>
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: "#ffffff"
              },
              headerTitleStyle: {
                color: "#000000"
              }
            };
          }
        },
        settings: {
          screen: SettingsScreen,
          navigationOptions: {
            headerTitle: "Settings"
          }
        }
      }),
      navigationOptions: {
        title: "Review"
      }
    }
  },
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: "#ffffff",
      inactiveTintColor: "#f8f8f8",
      labelStyle: {
        fontSize: 18,
        color: "#f3f3f3",
        marginBottom: 10
      },
      style: {
        backgroundColor: "#6b52ae"
      }
    }
  }
);

export const createRootNavigator = (loggedIn = false) => {
  return createSwitchNavigator(
    {
      PrivateScreen: {
        screen: PrivateRoutes
      },
      PublicScreen: {
        screen: PublicRoutes
      }
    },
    {
      initialRouteName: loggedIn ? "PrivateScreen" : "PublicScreen"
    }
  );
};

// export default createSwitchNavigator(
//   {
//     welcome: {
//       screen: WelcomeScreen,
//     },
//     // auth: {
//     //   screen: AuthScreen,
//     // },
//     main: {
//       screen: createBottomTabNavigator(
//         {
//           map: {
//             screen: MapScreen,
//             navigationOptions: {
//               title: "Map"
//             }
//           },
//           deck: {
//             screen: DeckScreen,
//             navigationOptions: {
//               title: "Deck"
//             }
//           },
//           review: {
//             screen: createStackNavigator({
//               reviewJobs: {
//                 screen: ReviewJobsScreen,
//                 navigationOptions: ({ navigation, screenProps }) => {
//                   return {
//                     headerTitle: "Review",
//                     headerRight: (
//                       <View>
//                         <TouchableOpacity
//                           onPress={() => navigation.navigate("settings")}
//                         >
//                           <View style={styles.placeButtons}>
//                             <Icon
//                               size={30}
//                               name="ios-settings"
//                               color="#20232a"
//                             />
//                           </View>
//                         </TouchableOpacity>
//                       </View>
//                     ),
//                     headerStyle: {
//                       backgroundColor: "#ffffff"
//                     },
//                     headerTitleStyle: {
//                       color: "#000000"
//                     }
//                   };
//                 }
//               },
//               settings: {
//                 screen: SettingsScreen,
//                 navigationOptions: {
//                   headerTitle: "Settings"
//                 }
//               }
//             }),
//             navigationOptions: {
//               title: "Review"
//             }
//           }
//         },
//         {
//           navigationOptions: {
//             tabBarVisible: true
//           },
//           tabBarOptions: {
//             activeTintColor: "#ffffff",
//             inactiveTintColor: "#f8f8f8",
//             labelStyle: {
//               fontSize: 18,
//               color: "#f3f3f3",
//               marginBottom: 10
//             },
//             style: {
//               backgroundColor: "#6b52ae"
//             }
//           }
//         }
//       ),
//       navigationOptions: {
//         title: "Main"
//       }
//     }
//   },
//   {
//     initialRouteName: "welcome",
//     tabBarOptions: {
//       activeTintColor: "#ffffff",
//       labelStyle: {
//         fontSize: 18,
//         color: "#f3f3f3",
//         marginBottom: 10
//       },
//       style: {
//         backgroundColor: "#6b52ae"
//       }
//     },
//     lazy: true,
//     navigationOptions: {
//       tabBarVisible: false
//     }
//   }
// );
