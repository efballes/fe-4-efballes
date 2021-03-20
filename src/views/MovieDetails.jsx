import React from "react"
import Screen from "../components/Screen";
import Title from "../components/Title";
import TextContent from "../components/TextContent";
import { imgUrl } from "../config/config.json";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Image: {
        height: 200,
        width: "98%",
    },
    Column: {
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
    },
    Row: {
        flexDirection: "row",
        width: "100%"
    },
    Title: {

    }
});

export default function MovieDetails({route, navigation}) {
    const movie = route?.params?.movie;
    return (
        <Screen>
            <ScrollView style={styles.Container}>
                <Title text={`${movie.title} (${movie.year})`}/>
                <View style={styles.Row}>
                    <View
                        style={{
                            ...styles.Column,
                            width: "50%"
                        }}
                    >
                        <Image
                            style={styles.Image}
                            source={{
                                uri: `${imgUrl}${movie.poster_path}`,
                            }}
                        />
                    </View>
                    <View 
                        style={{
                            ...styles.Column,
                            width: "50%"
                        }}
                    >
                        <TextContent 
                            title="Director" 
                            content={movie.director}
                        />
                        <TextContent 
                            title="Overview" 
                            content={movie.overview}
                        />
                    </View>
                </View>
                <View style={styles.Row}>
                    <View
                        style={{
                            ...styles.Column,
                            width: "50%"
                        }}
                    >
                        <TextContent
                            title="Rating"
                            content={movie.rating}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.Column,
                            width: "50%"
                        }}
                    >
                        <TextContent
                            title="Votes"
                            content={movie.num_votes}
                        />
                    </View>
                </View>
                <View style={styles.Row}>
                    <View
                        style={{
                            ...styles.Column,
                            width: "50%"
                        }}
                    >
                        <TextContent
                            title="Budget"
                            content={movie.budget}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.Column,
                            width: "50%"
                        }}
                    >
                        <TextContent
                            title="Revenue"
                            content={movie.revenue}
                        />
                    </View>
                </View>
                <TextContent
                    title="Genres"
                    content={ movie.genres.map(({genre_id, name}) => (name)).join(", ")}
                />
                <TextContent
                    title="Actors"
                    content={ movie.people.map(({person_id, name}) => (name)).join(", ")}
                />
            </ScrollView>
        </Screen>
    );
}
