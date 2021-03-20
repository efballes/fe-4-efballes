import React, {useState} from "react";
import SearchOptionsModal from "../components/SearchOptionsModal"
import Bttn from "./Bttn";
import { useSession } from "../hooks/Session";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "stretch"
    },
    Row: {
        flexDirection: "row",
        width:"100%", 
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    },
    TouchableOpacity: { marginTop: 0 },
    Text: {
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
    },
    ModePicker: {
        width: "50%",
        padding: "5%",
        justifyContent: "center",
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
        backgroundColor: "#003459", 
    },
    OptionsPicker: {
        width: "90%",
        padding: "5%",
        justifyContent: "center",
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
        backgroundColor: "#003459", 
    }
});

export default function NavBar() {
    const [modalVisible, setModalVisible] = useState(false);
    const { seach_options } = useSession();

    return (
        <View style={styles.Container}>
            <View style={styles.Row}>
                <Bttn title="Options" styles={styles} onPress={()=>{
                    setModalVisible(!modalVisible);
                }}/>
                <Bttn title="Search" styles={styles}/>
            </View>
            <SearchOptionsModal 
                visible={modalVisible}
                setVisible={setModalVisible}
                styles={styles}
            />
        </View>
    
    );
}