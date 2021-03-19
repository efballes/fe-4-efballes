import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SessionProvider } from "./src/hooks/Session";
import Content from "./src/App/Content";


const Stack = createStackNavigator();

export default function App() {
	return (
		<SessionProvider>
			<NavigationContainer>
				<Content Stack={Stack}/>
			</NavigationContainer>
		</SessionProvider>
	);
}
