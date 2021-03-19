import React from 'react'
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import { useSession } from "../hooks/Session";
import { StyleSheet } from "react-native";


const Content = ({Stack}) => {
    const { login_status } = useSession();
    const options = StyleSheet.create({
        headerStyle: {
            backgroundColor: "#007EA7"
        },
        headerTintStyle: {},
        headerTitleStyle: {}
    });
    return (
        <Stack.Navigator 
            initialRouteName={ login_status.status === "true" ? "Home" : "Login" }
            screenOptions={{
                headerStyle: { backgroundColor: "#003459" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: {
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: 20,
                }
            }}
        >
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        {/* { login_status.status === "false" ? 
            (<>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
            </>)
            :
            (<>
                <Stack.Screen name="Home" component={Home}/>
            </>)
        } */}
		</Stack.Navigator>
    );
}

export default Content
