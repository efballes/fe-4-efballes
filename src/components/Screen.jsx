import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from "react-native";

const default_styles = StyleSheet.create({
    Screen: {
        flex: 1,
        padding: "5%",
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: "#00171F"
    }
});


export default function Screen({children, style}) {
    return (
        <View 
            style={{
                ...default_styles.Screen,
                ...style?.Screen
            }}
        >
            <StatusBar style="auto"/>
            {children}
        </View>
    );
}
