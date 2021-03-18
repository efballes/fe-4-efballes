import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { useSession } from "../hooks/Session";
import { LogOrReg } from "../services/Idm";
import { 
    StyleSheet, 
    View, Text, 
    TextInput, 
    Pressable, 
    TouchableOpacity,
    Alert
} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00171f",
    }, 
    text: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: "#ffffff",
        paddingLeft: "2%"
    },
    LabelEntry: {
        width: "95%",
        margin: "2%"
    },
    input: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: "#00171f",
        padding: "2%",
        margin: "2%",
        backgroundColor: "#ffffff",
        borderColor: "#00a8e8",
        borderWidth: 1,
        borderRadius: 15
    },
    link: {
        fontSize: 18, 
        color:"#ffffff", 
    },
    Register_pressable: {
        marginTop: "5%",
        padding: "5%",
        backgroundColor: "#003459",
        borderColor: "#00a8e8",
        borderWidth: 2,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center"
    },
    Register_text: {
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#ffffff",
    }
});

function Register({navigation}) {
    const { email, session, login_status } = useSession();
    const [password, setPassword] = useState("");

    const handleError = (error) => {
        const error_message = error.resultCode == null ? "Bad Request" : error.message;
        Alert.alert("Error", error_message);    
    };

    const handleResponse = (response) => {
        switch (response?.resultCode) {
            case 110: // * User Registered in successfully.
                email.setter(email.value);
                Alert.alert("Success", response.message);
                navigation.navigate("Login");
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



            <View style={{flexDirection:"row"}}>
                <Text style={styles.link}>
                    {"Already have an account? Log In "}
                </Text>
                <TouchableOpacity>
                    <Pressable
                        onPress={()=> {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text
                            style={
                                {
                                    fontSize: 18,
                                    color:"#fafafa",
                                    textDecorationLine:"underline"
                                }
                        }>
                            Here
                        </Text>
                    </Pressable>
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Pressable
                    style={styles.Register_pressable}
                    onPress={handleSubmit}
                >
                    <Text style={styles.Register_text}>Register</Text>
                </Pressable>
            </TouchableOpacity>
        </View>
    )
}

export default Register
