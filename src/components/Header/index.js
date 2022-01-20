import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../constants/theme';

const Header = () => {
  return (
    <View style={styles.container} accessible accessibilityRole="header">
        <Text style={styles.title}>Vamos Rachar!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.primary,
        width: '100%',
        height: 60,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 32,
        marginTop: Constants.statusBarHeight,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.white,
    }
});

export default Header;