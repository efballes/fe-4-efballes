import React, { useState } from "react";
import { useSession } from "../hooks/Session";
import { LogOrReg } from "../services/Idm";
import Screen from "../components/Screen";
import InputForm from  "../components/Forms/InputForm";
import Link from "../components/Link";
import Bttn from "../components/Bttn";
import { Alert } from "react-native";

function Register({route, navigation}) {
    const { email } = useSession();
    const [pword, setPword] = useState(route?.params?.pword || "");

    const handleError = (error) => {
        const error_message = error.resultCode == null ? "Bad Request" : error.message;
        Alert.alert("Error", error_message);    
    };

    const handleResponse = (response) => {
        switch (response?.resultCode) {
            case 110: // * User Registered in successfully.
                email.setter(email.value);
                navigation.navigate("Login", {pword:pword});
                Alert.alert("Success", response.message);
                break;
            default:
                handleError(response);
        }
    };

    const handleSubmit = () => {
        LogOrReg(email.value,pword,true)
            .then(response => handleResponse(response.data))
            .catch(error => handleError(error));
    };

    const fields = [
        {
            label: "Email",
            keyboardType: "email-address",
            textContentType: "emailAddress",
            placeholder: "PeterTheAnteater@uci.edu",
            onChangeText:text => email.setter(text),
            defaultValue: email.value
        },
        {
            label: "Password",
            textContentType:"password",
            onChangeText: text => setPword(text),
            defaultValue: pword,
            secureTextEntry: true
            
        }
    ];

    return (
        <Screen>
            <InputForm
                title="Register"
                fields={fields}
            >
                <Link
                    OuterText={"Already have an account? Log In "}
                    InnerText={"Here"}
                    onPress={()=>navigation.navigate("Login", {pword:pword})}
                />
                <Bttn title="Register" onPress={handleSubmit}/>
            </InputForm>
        </Screen>
    )
}

export default Register
