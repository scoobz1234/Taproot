import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import LoginForm from '../screens/LoginForm';
import { screensEnabled } from 'react-native-screens';
import { TextInput, FlatList } from 'react-native-gesture-handler';


export default class PatientSelectionScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    pressHandlerContinue = () => {
        console.log("CONTINUE")
    }

    pressHandlerAddPatient = () => {
        console.log("ADD PATIENT")
    }
    
    pressHandlerLogOut = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
        <View>
            <Card style={styles.patient_selection}>
                <View style={styles.input}>
                    <TextInput
                    style={styles.input_container}
                    placeholder="Search"
                    autoCapitalize= "words"
                    />
                </View>
                <FlatList>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Text>Patient 1</Text>
                    </TouchableOpacity>
                </FlatList>
            </Card>
            <Card style={Styles.card}>
                <ScrollView>
                    <View style={{paddingTop: 5, paddingBottom: 5}}>
                        <TouchableOpacity style={styles.login_container} onPress={this.pressHandlerContinue}>
                            <Text style={styles.continue_text}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingBottom: 5}}>
                        <TouchableOpacity style={styles.login_container} onPress={this.pressHandlerAddPatient}>
                            <Text style={styles.continue_text}>Add Patient</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.cancel_container} onPress={this.pressHandlerLogOut}>
                            <Text style={styles.logout_text}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Card>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    patient_selection: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        paddingBottom: 390
    },
    patient: {
        borderColor: 'black',
        borderWidth: 1
    },
    login_container: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel_container: {
        backgroundColor: Colors.tertiary,
        borderRadius: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continue_text: {
        color: Colors.tertiary,
        fontWeight: 'bold',
        fontSize: 18
    },
    logout_text: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 18
    },
    input: {
        justifyContent: 'center',
        width: '95%',
        height: 35,
        borderColor: 'black',
        borderWidth: 1,
    },
    input_container: {
        fontSize: 25,
        height: 35,
        borderColor: 'black',
        borderWidth: 1,
    }
});