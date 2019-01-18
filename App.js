import React, { Component } from "react";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Platform, StyleSheet, Button, View, AsyncStorage } from "react-native";
import { connect, Provider } from "react-redux";
import { BackHandler } from "react-native";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import { createBottomTabNavigator } from "react-navigation";
import { createRootNavigator } from "app/src/Navigator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      checkedSignIn: false
    };
    const navEnhancer = createReactNavigationReduxMiddleware(
      "root",
      state => state.navigation
    );
    const navReducer = createNavigationReducer(createRootNavigator());
    const rootReducer = combineReducers({
      nav: navReducer
    });
    this.store = createStore(
      rootReducer,
      {},
      compose(
        applyMiddleware(navEnhancer),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : f => f
      )
    );
    //this.store = createStore(rootReducer, applyMiddleware(navEnhancer));
  }

  componentDidMount() {
    this.setState({
      loggedIn: this.hasUserLoggedIn(),
      checkedSignIn: true
    });
  }

  handleLoginSubmit = () => {
    this.setState({
      loggedIn: true
    });
    return AsyncStorage.setItem('token', "true");
  };

  handleLogoutSubmit = () => {
    return AsyncStorage.removeItem('token');
  };

  handleOnGotoLogin = navigation => {
    navigation.navigate("auth");
  };

  hasUserLoggedIn = () => {
    console.log(this.store.dispatch);
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };

  render() {
    const { loggedIn, checkedSignIn } = this.state;
    const AppLayoutReduxified = reduxifyNavigator(
      createRootNavigator(loggedIn),
      "root"
    );
    const mapStateToProps = state => ({
      state: state.nav
    });
    const AppLayout = connect(mapStateToProps)(AppLayoutReduxified);
    if (!checkedSignIn) {
      return null;
    }
    return (
      <Provider store={this.store}>
        <AppLayout
          screenProps={{
            onGoToLogin: this.handleOnGotoLogin,
            onLoginSubmit: this.handleLoginSubmit,
            onLogoutSubmit: this.handleLogoutSubmit
          }}
        />
      </Provider>
    );
  }
}

export default App;
