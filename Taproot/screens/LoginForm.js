import React from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Alert
} from 'react-native';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import Styles from '../constants/Styles';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    checkLogin = () => {
        const { username, password } = this.state;
        if (username === 'admin' && password === 'admin') {
            this.props.navigation.replace('Patients');
        } else {
            Alert.alert('Error', "Username/Password mismatch", [{ text: 'Retry' }])
        }
    }

    render() {
        const { username, password } = this.state
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <View style={Styles.view_mainView}>
                    <KeyboardAvoidingView
                        behavior='padding'
                        keyboardVerticalOffset={10}
                        style={styles.screen}>
                        <Card style={styles.card}>
                            <ScrollView>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ username: text })}
                                />
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ password: text })}
                                />
                                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                    <TouchableOpacity style={styles.login_container} onPress={this.checkLogin}>
                                        <Text style={styles.login_text}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.cancel_container}>
                                        <Text style={styles.cancel_text}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </Card>
                    </KeyboardAvoidingView>
                    <View style={styles.button_container}>
                        <View style={styles.button_cont}>
                            <TouchableOpacity style={Styles.button_mainButton}>
                                <Text style={styles.text}>HELP</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button_cont}>
                            <TouchableOpacity style={Styles.button_mainButton}>
                                <Text style={styles.text}>TRAINING</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: 'black',
        marginBottom: 5
    },
    card: {
        width: 400,
        maxWidth: '90%',
        maxHeight: 400,
        padding: 20
    },
    input: {
        borderBottomColor: 'gray',
        borderBottomWidth: .6,
        marginBottom: 5
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
    login_text: {
        color: Colors.tertiary,
        fontWeight: 'bold',
        fontSize: 18
    },
    cancel_text: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 18
    },
    button_container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button_cont: {
        flex: 1,
        padding: 20
    },
    text: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 18
    }
});