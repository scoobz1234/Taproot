import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import FiveStarRating from '../components/FiveStarRating';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Styles from '../constants/Styles';

const OutcomeScreen = props => {
    return (
        <View style={Styles.view_mainView}>
            <Card style={styles.card}>
                <Text style={styles.text}>Intervention Outcome</Text>
                <FiveStarRating />
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <TouchableOpacity style={styles.login_container} onPress={this.checkLogin}>
                        <Text style={styles.login_text}>Yes</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.cancel_container}>
                        <Text style={styles.cancel_text}>No</Text>
                    </TouchableOpacity>
                </View>
            </Card>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 400,
        maxWidth: '90%',
        maxHeight: 400,
        padding: 20
    },
    text: {
        fontSize: 22,
        alignSelf: 'center'
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

export default OutcomeScreen;