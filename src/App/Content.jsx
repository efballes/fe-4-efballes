import React from 'react'
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import MovieDetails from "../views/MovieDetails";
import { useSession } from "../hooks/Session";


const Content = ({Stack}) => {
    const { login_status } = useSession();
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
        { login_status.status === "false" ? 
            (<>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
            </>)
            :
            (<>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Details" component={MovieDetails}/>
            </>)
        }
		</Stack.Navigator>
    );
}

export default Content
