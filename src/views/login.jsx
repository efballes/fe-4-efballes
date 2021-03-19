import React, { useState } from "react";
import { useSession } from "../hooks/Session";
import { LogOrReg } from "../services/Idm";
import Screen from "../components/Screen";
import InputForm from  "../components/Forms/InputForm";
import Link from "../components/Link";
import Bttn from "../components/Bttn";
import { Alert } from "react-native";


function Login({route, navigation}) {
    const { email, password, session, login_status } = useSession();
    const [pword, setPword] = useState(route?.params?.pword || "");

    const handleError = (error) => {
        const error_message = error.resultCode == null ? "Bad Request" : error.message;
        Alert.alert("Error", error_message);    
    };

    const handleResponse = (response) => {
        switch (response?.resultCode) {
            case 120: // * User logged in successfully.
                email.setter(email.value);
                password.setter(pword);
                session.setter(response.session_id);
                login_status.setter("true");
                Alert.alert("Success", response.message);
                navigation.navigate("Home");
                break;
            default:
                handleError(response);
        }
    };

    const handleSubmit = () => {
        LogOrReg(email.value,pword,false)
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
                title="Login"
                fields={fields}
            >
                <Link
                    OuterText={"Are you a new user? Register "}
                    InnerText={"Here"}
                    onPress={()=>navigation.navigate("Register", {pword:pword})}
                />
                <Bttn title="Log In" onPress={handleSubmit}/>
            </InputForm>
        </Screen>
    )
}

export default Login
