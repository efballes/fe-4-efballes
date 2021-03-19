import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Text
} from "react-native";

const default_styles = StyleSheet.create({
    TouchableOpacity: {
        marginTop: "5%",
        padding: "5%",
        backgroundColor: "#003459",
        borderColor: "#00A8E8",
        borderWidth: 2,
        borderRadius: 15,
    },
    Pressable: {
        textAlign: "center",
        justifyContent: "center"
    },
    Text: {
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
    }
});

export default function Bttn({title, onPress, styles}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...default_styles.TouchableOpacity,
                ...styles?.TouchableOpacity
            }}
        >
            <Pressable
                onPress={onPress}
                style={{
                    ...default_styles.Pressable,
                    ...styles?.Pressable
                }}
            >
                <Text 
                    style={{
                        ...default_styles.Text,
                        ...styles?.Text
                    }}
                >
                    {title}
                </Text>
            </Pressable>
        </TouchableOpacity>
    );
}