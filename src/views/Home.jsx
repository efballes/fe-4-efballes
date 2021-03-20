import React, {useState} from "react";
import Screen from "../components/Screen";
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList"
import { StyleSheet, Modal } from "react-native";

const styles = StyleSheet.create({
    Screen: {
        padding: "0%"
    }
});

export default function Home() {
    return (
        <Screen style={styles.Screen}>
            <NavBar/>
            {/* <MovieList/> */}
        </Screen>
    );
}