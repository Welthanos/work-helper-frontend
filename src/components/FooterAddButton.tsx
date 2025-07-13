import { Colors } from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FooterAddButton() {
    return (
        <View style={styles.footerWrapper}>
            <View style={styles.footerBackground}>
                <View style={styles.buttonBackground}>
                    <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => { }}>
                        <MaterialIcons name='add' size={35} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 130,
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    footerBackground: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: Colors.black,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center'
    },
    buttonBackground: {
        backgroundColor: Colors.white,
        width: 75,
        height: 75,
        borderRadius: 37.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -28
    },
    addButton: {
        backgroundColor: Colors.darkBlue,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
});