import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SessionProvider } from "./src/hooks/Session";
import Login from "./src/views/Login";
import Register from "./src/views/Register";


const Stack = createStackNavigator();

export default function App() {
	return (
		<SessionProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />
				</Stack.Navigator>
			</NavigationContainer>
		</SessionProvider>
	);
}
