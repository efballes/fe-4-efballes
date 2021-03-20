import React from "react";
import Bttn from "./Bttn";
import { useSession } from "../hooks/Session";
import {
    StyleSheet,
    View, Text,
    FlatList,
} from "react-native";

export const styles = StyleSheet.create({
    View: {
        width: "98%",
        marginVertical: "4%",
        padding: "2%",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 15,
    },
    FlatList: {

    },
    TouchableOpacity: {
        marginTop: "0%",
        padding:"2%",
    },
    Item: {
        padding: "1%",
        margin: "1%",
        backgroundColor: "#00171F"
    },
    Text: {
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 15,
        color: "#FFFFFF",
    }
});

export default function MovieList({route, navigation}) {
    const { movies, movie, movies_request} = useSession();
    const Item = ({item}) => (
        <Bttn
            title={`[${item.index}]: ${item.title} (${item.year})`}
            styles={styles}
            onPress={()=>{
                console.log(item.movie_id);
                movies_request({
                    request_type: "get",
                    param: item.movie_id,
                });
                if(movie.selected !== null) {
                    navigation.navigate("Details", {movie: movie.selected});
                }
            }}
        />
    );
    const renderItem = ({item}) => {
        return (<Item item={item}/>);
    };

    return (
        <View style={styles.View}>
            <FlatList
                data={movies?.list || []}
                renderItem={renderItem}
                keyExtractor={(item) => item.movie_id}
            />
        </View>
    )
}
