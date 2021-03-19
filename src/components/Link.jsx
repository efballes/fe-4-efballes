import React from "react";
import {
    View, StyleSheet,
    TouchableOpacity,
    Text
} from "react-native";

const default_styles = StyleSheet.create({
    View: {
        flexDirection: "row"
    },
    AllText: {
        fontSize: 18, 
        color:"#FFFFFF",
    },
    OuterText: {},
    TouchableOpacity: {},
    InnerText: {
        textDecorationLine: "underline"
    }
});

export default function Link({OuterText, InnerText, onPress, styles}) {
    return (
        <View style={{
            ...default_styles.View,
            ...styles?.View
        }}>
            <Text 
                style={{
                    ...default_styles.AllText,
                    ...styles?.AllText,
                    ...default_styles.OuterText,
                    ...styles?.OuterText
                }}
            >
                {OuterText}
            </Text>
            <TouchableOpacity
                onPress={onPress} 
            >
                <Text
                    style={{
                        ...default_styles.AllText,
                        ...styles?.AllText,
                        ...default_styles.InnerText,
                        ...styles?.InnerText
                    }}
                >
                    {InnerText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
