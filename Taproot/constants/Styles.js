import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
    card_mainCard: {
        width: 400,
        maxWidth: '90%',
        alignItems: 'center'
    },
    button_mainButton: {
        backgroundColor: Colors.tertiary,
        borderRadius: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
      },  
    view_mainView: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
      },
      view_homeScreen: {
          flex: 1,
          alignItems: 'center'
      }
});
