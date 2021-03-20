import React from "react";
import {View, Text, StyleSheet} from "react-native";

export const style = StyleSheet.create({
    View: {
        width: "98%",
        justifyContent: "center",
        textAlign: "center"
    },
    Title: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#00A8E8",
        fontSize: 18
    },
    Content: {
        fontFamily: "sans-serif",
        color: "#FFFFFF",
        fontSize: 15
    }
});

export default function TextContent({title, content, styles}) {
    return (
        <View 
            style={{
                ...style.View,
                ...styles?.TextContentView
            }}
        >
            <Text 
                style={{
                    ...style.Title,
                    ...styles?.TextContentTitle
                }}
            >
                    {`${title}: `}
            </Text>
            <Text 
                style={{
                    ...style.Content,
                    ...styles?.TextContentContent
                }}
            >
                    {content}
            </Text>
        </View>
    )
}
