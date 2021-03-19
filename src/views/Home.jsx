import React from "react";
import { 
    StyleSheet, 
    View, Text, 
    TextInput, 
    Pressable, 
    Alert,
    TouchableOpacity
} from "react-native";

export default function Home() {
    return (
        <View>
            <Text>Hello Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: "#00171f",
    }, 
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: "#ffffff"
    }
});