import React, { useState } from "react";
import {View, Text, TextInput, Button, Alert} from "react-native";
import { useSession } from "../hooks/Session";
import { LogOrReg } from "../services/Idm";

function login() {
    const { email, session, login_status } = useSession();
    const [password, setPassword] = useState("");

    return (
        <View>
            <Text>FABFLIX</Text>
            <View>
                <Text>Email</Text>
                <TextInput
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="PeterTheAnteater@uci.edu"
                    placeholderTextColor="grey"
                    onChangeText={text => {email.setter(text);}}
                    defaultValue={email.value}
                    maxLength={50}
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    textContentType="password"
                    onChangeText={text => setPassword(text)}
                    defaultValue={password}
                    maxLength={50}
                    secureTextEntry={true}
                />
            </View>
            <Button
                title="Login"
                onPress={()=>Alert.alert(`Email: ${email.value}\nPassword: ${password}`)}
            />
        </View>
    )
}

export default login
