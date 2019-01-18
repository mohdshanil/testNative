import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class AuthScreen extends Component {
  render() {
      const {screenProps, navigation} = this.props;

    return (
      <View>
        <Text>Auth Screen</Text>
        <Button title="Log In" color="#000000" onPress={() => screenProps.onLoginSubmit().then(() =>{ setTimeout(() => {navigation.navigate("PrivateScreen"), 1})} )} />
      </View>
    );
  }
}

export default AuthScreen;
