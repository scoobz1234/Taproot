import React, { Component } from 'react';
import { 
    StyleSheet,
    View, 
    Button,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Text} from 'react-native';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import Input from '../components/Input';

const LoginForm = props => {
    return (
        <KeyboardAvoidingView 
            behavior='padding'
            keyboardVerticalOffset={10}
            style={styles.screen}>
            <Card style={styles.card}>
                <ScrollView>
                    <Input 
                        id="email"
                        label="Email"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        returnKeyType='next'
                        errorText="Please enter a valid email address."
                        onInputChange={() => {}}
                        initialValue=""
                    />
                    <Input 
                        id='password'
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        onInputChange={() => {}}
                        initialValue="" 
                    />
                    <View style={{paddingTop: 5, paddingBottom: 5}}>
                        <TouchableOpacity style={styles.login_container}>
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
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: 400,
        maxWidth: '90%',
        maxHeight: 400,
        padding: 20
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
      }
});

export default LoginForm;