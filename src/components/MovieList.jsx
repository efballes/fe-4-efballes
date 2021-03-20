import React from "react";
import { useSession } from "../hooks/Session";
import {
    StyleSheet,
    ScrollView,
    FlatList,
} from "react-native";

export default function MovieList() {
    const { movies } = useSession();
    return (
        <ScrollView>
            <FlatList/>
        </ScrollView>
    )
}
