import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class MapScreen extends Component {
    render () {
        const {screenProps, navigation} = this.props;
        return (
            <View>
                <Text>Map Screen</Text>
                <Button title="Log Out" color="#000000" onPress={() => screenProps.onLogoutSubmit().then(() =>{ 
                    debugger; 
                    navigation.navigate("PublicScreen")
                    } )} />
            </View>
        );
    }
}

export default MapScreen;