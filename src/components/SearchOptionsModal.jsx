
import React, {useState} from "react";
import Selector from "./Selector";
import Bttn from "./Bttn";
import SearchForm from "./Forms/SearchForm";
import { 
    StyleSheet,
    Modal, View, 
    Text
} from 'react-native';
import { useSession } from "../hooks/Session";

export const style = StyleSheet.create({
    View: {
        backgroundColor: "#00171F"
    },
    Container: {
        justifyContent:"center",
    },  
    Modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#00171F"
    },
    Text: {
        fontFamily: 'sans-serif',
        fontWeight: "bold",
        fontSize: 20,
        color: "#FFFFFF",
    },
});

export default function SearchOptionsModal({visible, setVisible, styles}){
    const { search_options } = useSession();
    const [ mode, setMode ] = useState(search_options.getCurrentLabel());
    const modeSetter = (itemValue, itemIndex) => {
        search_options.setState(itemValue);
        setMode(itemValue);
    }


    return (
        <View>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setVisible(!visible);
                }}
            >
                <View style={{
                    ...style.View,
                    ...styles.Container,
                    ...style.Container,
                    ...style.Modal,
                }}>
                    <SearchForm
                        mode={mode}
                        modeSetter={modeSetter}
                        styles={styles}
                    >
                        <View style={styles.Row}>
                            {   search_options.search_filter.forForm().map((item, outkey) => (
                                    <Selector 
                                        key={outkey} 
                                        option={item}
                                        objectSetter={search_options.search_filter}
                                    />
                                ))
                            }
                        </View>
                        <View style={styles.Row}>
                            <Bttn title="close" styles={styles} onPress={()=>setVisible(!visible)}/>
                            <Bttn title="Search"styles={styles} />
                        </View>
                    </SearchForm>
                </View>
            </Modal>
        </View>
    )
}
