import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class PatientSelectionScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    pressHandler = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <Text> PatientSelectionScreen </Text>
                <Button title="Go Back" onPress={this.pressHandler}/>
            </View>
        );
    }
}