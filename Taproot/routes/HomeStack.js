import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//Import your screens here
import PatientSelectionScreen from '../screens/PatientSelectionScreen';
import Login from '../screens/LoginForm';

// then add your screens to this section.
const screens = {
    Login: {
         screen: Login
    },
    PatientSelectionScreen: {
        screen: PatientSelectionScreen
    },
}

const ScreenStack = createStackNavigator(screens);

export default createAppContainer(ScreenStack);