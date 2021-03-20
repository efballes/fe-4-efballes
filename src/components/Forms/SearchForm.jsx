import React from "react";
import Bttn from "../Bttn";
import InputForm from "./InputForm";
import SmallContainer from "../SmallContainer";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View, Text } from "react-native";
import { useSession } from "../../hooks/Session";

const default_styles = StyleSheet.create({
    InputFormContainer: {
        flex: 1,
        width: "100%",
        padding: "5%",
        marginTop: "5%",
        alignItems: 'center',
        justifyContent: "flex-start"
    }
});

export default function SearchForm({mode, modeSetter, children, styles}) {
    const { search_options } = useSession();
    return (
        <InputForm
            styles={default_styles}
            fields={
                search_options
                    .forSearchForm()
                    .map(
                        item => (
                        {   
                            ...item,
                            onChangeText:text=>search_options.search_params.setter(item.name, text)
                        }
                    )
                )
            }
            header={(
                <View style={{
                    ...styles.Row,
                    justifyContent:"center",
                }}>
                    <Text style={styles.Text}>Search Mode: </Text>
                    <Picker
                        selectedValue={mode}
                        onValueChange={modeSetter}
                        style={styles.ModePicker}
                    >
                        {   search_options.getData().map(
                                (item, key) => (
                                    <Picker.Item
                                        key={key}
                                        label={item.label}
                                        value={item.value}
                                    />
                                )
                            )
                        }
                    </Picker>
                    
                </View>
            )}
        >
            {children}
        </InputForm>
    )
}
