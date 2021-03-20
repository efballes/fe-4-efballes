import React from "react";
import { View } from "react-native";

export default function SmallContainer({children}) {
    return (
        <View
            style={{
                padding: "5%",
                alignItems: 'center',
                textAlign: "center",
                justifyContent: "space-between",
                borderColor: "#00A8E8",
                borderWidth: 2,
                borderRadius: 15,
            }}
        >
            {children}
        </View>
    );
};