import React, { useState } from "react";
import {View, StyleSheet, Text } from "react-native";
import SmallContainer from "./SmallContainer";
import {Picker} from "@react-native-picker/picker";

export const styles = StyleSheet.create({
    View: {
        flexDirection: "row",
        width:"100%", 
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    },
    TouchableOpacity: { marginTop: 0 },
    Text: {
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
    },
    OptionsPicker: {
        width: "90%",
        padding: "5%",
        justifyContent: "center",
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
        backgroundColor: "#003459", 
    }
});

export default function Selector({option, objectSetter}) {
    const [value, setValue] = useState(objectSetter.getter(option.label));
    const valueSetter = (itemValue, itemIndex) => {
        objectSetter.setter(option.label, itemValue);
        setValue(objectSetter.getter(option.label));
    }
    return (
        <SmallContainer>
            <Text style={styles.Text}>{`${option.name}: `}</Text>
            <Picker
                selectedValue={value}
                onValueChange={valueSetter}
                style={styles.OptionsPicker}
            >
                {   option.options.map(
                        (selection, key) => (
                            <Picker.Item
                                key={key}
                                label={selection.label.toUpperCase()}
                                value={selection.value}
                            />
                        )
                    )
                }
            </Picker>
        </SmallContainer>
    );
};

