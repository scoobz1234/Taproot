import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
    FlatList,
    TextInput
} from 'react-native';

import { RESIDENTS } from '../data/dummy_data';
import ResidentItem from '../components/ResidentItem';

const PatientSelectionScreen = props => {

    const renderResidentItem = itemData => {
        return <ResidentItem
            id={itemData.item.id}
            name={itemData.item.name}
            facility={itemData.item.facility}
            onSelect={() => { 
                props.navigation.navigate({
                    routeName: 'Outcomes'
                })
            }}
        />;
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        autoCapitalize="words"
                        onChangeText={() => {}} />
                    <View style={{height: '90%'}}>
                        <FlatList
                            data={RESIDENTS}
                            renderItem={renderResidentItem}
                            style={{ width: '100%' }}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        justifyContent: 'center',
        width: '100%',
        height: 45,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 5
    },
    input_container: {
        width: '95%',
        fontSize: 25,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20
    }
});

export default PatientSelectionScreen;