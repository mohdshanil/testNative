import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  slides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30,
    color: "#000000"
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15
  }
});

class Slides extends Component {
  renderLastSlide(index) {
    const { data, onlastPageChange } = this.props;
    if (index === data.length - 1) {
      return (
        <View>
          <Button
            title="Sign Up"
            color="#000000"
            onPress={onlastPageChange}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  renderSlides() {
    const { data } = this.props;
    return data.map((item, index) => {
      return (
        <View
          key={item.text}
          style={[styles.slides, { backgroundColor: item.color }]}
        >
          <Text style={styles.slideText}>{item.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled={true}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

export default Slides;
