import React from "react";
import { StatusBar } from 'expo-status-bar';
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList"
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        padding: "2%",
        alignItems: 'center',
        backgroundColor: "#00171F",
        justifyContent: "flex-start",
    }
});

export default function Home({route, navigation}) {
    return (
        <View 
            style={styles.Screen}
        >
            <StatusBar style="auto"/>
            <NavBar/>
            <MovieList 
                route={route}
                navigation={navigation}
            />
        </View>
    );
}