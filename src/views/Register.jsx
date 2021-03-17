import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { useSession } from "../hooks/Session";
import { LogOrReg } from "../services/Idm";
import { 
    StyleSheet, 
    View, Text, 
    TextInput, 
    Pressable, 
    Alert
} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000",
    }, 
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: "#fafafa",
        paddingLeft: "2%"
    },
    LabelEntry: {
        width: "95%",
        margin: "2%"
    },
    input: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: "#fafafa",
        padding: "2%",
        margin: "2%",
        backgroundColor: "#444141",
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 15
    },
    Register: {
        fontFamily: 'sans-serif',
        fontSize: 35,
        marginTop: "5%",
        padding: "5%",
        color: "#fafafa",
        backgroundColor: "blue",
        borderColor: "#fafafa",
        borderWidth: 2,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center"
    }
});

function Register({navigation}) {
    const { email, session, login_status } = useSession();
    const [password, setPassword] = useState("");

    const handleError = (error) => {
        const error_message = error.resultCode == null ? "Bad Request" : error.message;
        Alert.alert(error_message);    
    };

    const handleResponse = (response) => {
        switch (response?.resultCode) {
            case 110: // * User logged in successfully.
                email.setter(email.value);
                Alert.alert(response.message);
                break;
            default:
                handleError(response);
        }
    };

    const handleSubmit = () => {
        LogOrReg(email.value,password,true)
            .then(response => handleResponse(response.data))
            .catch(error => handleError(error));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text style={styles.text}>REGISTER TO FABFLIX</Text>


            <View style={styles.LabelEntry}>
                <Text style={styles.text}>
                    Email:
                </Text>
                <TextInput
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="PeterTheAnteater@uci.edu"
                    placeholderTextColor="grey"
                    onChangeText={text => {email.setter(text);}}
                    defaultValue={email.value}
                    maxLength={50}
                    style={styles.input}
                />
            </View>


            <View style={styles.LabelEntry}>
                <Text style={styles.text}>
                    Password:
                </Text>
                <TextInput
                    textContentType="password"
                    onChangeText={text => setPassword(text)}
                    defaultValue={password}
                    maxLength={50}
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>



            <Pressable 
                style={styles.Register}
                onPress={handleSubmit}
            >
                <Text style={styles.text}>REGISTER</Text>
            </Pressable>
        </View>
    )
}

export default Register
