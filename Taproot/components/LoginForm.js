import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar, View } from 'react-native';
import Colors from '../constants/Colors';

export default function LoginForm() {
        return (
            <KeyboardAvoidingView behavior='padding'>
                <StatusBar
                barStyle='light-content'/>

                <TextInput 
                placeholder='Email'
                placeholderTextColor='gray'
                returnKeyType='next'
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.input}/>

                <TextInput placeholder='Password'
                placeholderTextColor='gray'
                returnKeyType='go'
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}/>

                <TouchableOpacity style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>LOGIN</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: Colors.tertiary,
        margin: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    bottomContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    bottomText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});