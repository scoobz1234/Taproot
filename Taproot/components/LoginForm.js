import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar } from 'react-native';

export default function LoginForm() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar
                barStyle='light-content'
                />

                <TextInput 
                placeholder="Email"
                placeholderTextColor="gray"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                />

                <TextInput 
                placeholder="Password"
                placeholderTextColor="gray"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
                />


                <TouchableOpacity style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>LOGIN</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'blue',
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
})