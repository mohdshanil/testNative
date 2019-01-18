import React, { Component } from "react";
import { View, Text } from "react-native";
import Slides from "app/src/components/Slides/Slides";
import { connect, Provider } from "react-redux";

class WelcomeScreen extends Component {
  slides = [
    { text: "Welcome to Tahakom", color: "#03A9F4" },
    { text: "Get to know everyone", color: "#009688" },
    { text: "Select your Office Location", color: "#03A9F4" }
  ];

  // handleSignUp = () => {
  //   this.props.navigation.navigate("map");
  // }

  render() {
    console.log("All Props>>", this.props);
    return (
      <View style={{ flex: 1 }}>
        <Slides data={this.slides} onlastPageChange={() => this.props.screenProps.onGoToLogin(this.props.navigation)}/>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    nav: state.nav
  };
}

export default connect(mapStateToProps)(WelcomeScreen);
