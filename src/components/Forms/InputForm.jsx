import React from "react";
import LabelInput from "./LabelInput";
import Title from "../Title";
import { 
    StyleSheet, 
    View
} from "react-native";

const default_styles = StyleSheet.create({
    InputFormContainer: {
        flex: 1,
        width: "100%",
        padding: "5%",
        alignItems: 'center',
        justifyContent: "center"
    }
});

export default function InputForm({title, fields, styles, children}) {
    return (
        <View 
            style={{
                ...default_styles.InputFormContainer,
                ...styles?.InputFormContainer
            }}
        >
            <Title text={title}/>
            { 
                fields.map(
                    (props, key) => 
                        (
                            <LabelInput
                                props={props}
                                key={key}
                                styles={{
                                    ...default_styles?.LabelInput,
                                    ...styles?.LabelInput
                                }}
                            />
                        )
                )
            }
            { children }
        </View>
    );
}