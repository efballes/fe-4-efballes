import React from "react";
import { 
    StyleSheet, 
    View, Text, 
    TextInput
} from "react-native";

export const default_styles = StyleSheet.create({
    LabelInputContainer: {
        width: "95%",
        margin: "2%",
    },
    AllText: {
        fontFamily: "sans-serif",
        fontSize: 20,
    },
    Label: {
        color: "#FFFFFF",
        paddingLeft: "2%"
    },
    Input: {
        padding: "2%",
        margin: "2%",
        color: "#00171F",
        backgroundColor: "#FFFFFF",
        borderColor: "#00A8E8",
        borderWidth: 2,
        borderRadius: 15
    }
});

export default function LabelInput({props, styles}){
    return (
        <View 
            style={{
                ...default_styles.LabelInputContainer,
                ...styles?.LabelInputContainer
            }}
        >
            <Text
                style={{
                    ...default_styles.AllText,
                    ...styles?.AllText,
                    ...default_styles.Label,
                    ...styles?.Label
                }}
            >
                {`${props.label}: `}
            </Text>
            <TextInput
                keyboardType={props?.keyboardType || "default"}
                textContentType={props?.textContentType || "none"}
                defaultValue={props?.defaultValue}
                onChangeText={props?.onChangeText}
                placeholder={props?.placeholder}
                placeholderColor={props?.placeholderColor || "#00A8E8"}
                maxLength={props?.maxLength || 50 }
                secureTextEntry={
                    props?.secureTextEntry === undefined ? 
                        false 
                    : 
                        props?.secureTextEntry
                }
                style={{
                    ...default_styles.AllText,
                    ...styles?.AllText,
                    ...default_styles.Input,
                    ...styles?.Input,
                }}
            />
        </View>
    );
}