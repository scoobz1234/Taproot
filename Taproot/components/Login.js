import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginForm from './LoginForm';



export default function Login() {
    return (
      
      <View style={styles.container}>
          <View>
                <LoginForm />
          </View>
      </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#88F6A0'
    }
});