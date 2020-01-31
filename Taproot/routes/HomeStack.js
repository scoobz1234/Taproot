import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { Image, View } from 'react-native';

//Import your screens here
import PatientSelectionScreen from '../screens/PatientSelectionScreen';
import Login from '../screens/LoginForm';

// then add your screens to this section.
const TaprootNavigator = createStackNavigator({
    Login: Login,
    Patients: PatientSelectionScreen,
}, {
    defaultNavigationOptions: {
        headerStatusBarHeight: 60,
        headerBackTitle: '',
        headerTitle: '',
        headerBackground: (
            <View style={{backgroundColor: 'white', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Image
                    style={{
                        width: '75%',
                        height: '75%',
                        alignSelf: 'center',
                        marginTop: 25
                    }}
                    source={require('../assets/Taproot_Logo_RGB.jpg')}
                />
            </View>

        ),
    }
}

);

export default createAppContainer(TaprootNavigator);