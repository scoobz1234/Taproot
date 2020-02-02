import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ResidentItem = props => {
    return (
        <View style={styles.residentItem}>
            <TouchableOpacity onPress={props.onSelect}>
                <View>
                    <View style={{ ...styles.residentRow, ...styles.residentHeader }}>
                        <View style={styles.container}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.name} numberOfLines={1}>{props.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.residentRow, ...styles.residentDetail }}>
                        <Text>{props.id.toUpperCase()}</Text>
                        <Text>{props.facility.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    residentItem: {
        height: 100,
        width: '97%',
        backgroundColor: Colors.tertiary,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5, 
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    residentRow: {
        flexDirection: 'row'
    },
    residentHeader: {
        height: '50%'
    },
    residentDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50%'
    },
    nameContainer: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    name: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});

export default ResidentItem;
