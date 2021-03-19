import React from "react";
import { View, Text, StyleSheet } from "react-native";

const default_styles = StyleSheet.create({
    View: {
        flexDirection: "row",
        textAlign: "center"
    },
    Text: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF"
    }
});

export default function Title({text, styles}) {
    return (
        <View 
            style={{
                ...default_styles.View,
                ...styles?.View
            }}
        >
            <Text
                style={{
                    ...default_styles.Text,
                    ...styles?.Text,
                }}
            >
                {text}
            </Text>
        </View>
    );
}