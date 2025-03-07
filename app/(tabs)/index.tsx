import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BotonC from "../components/botonC";
import { Link, router } from 'expo-router'

const Index = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <BotonC titulo="Productos" onPress={() => {router.replace('productos',{relativeToDirectory:true})}} />
                <BotonC titulo="Categoría" onPress={() => {router.replace('categoria',{relativeToDirectory:true})}} />
            </View>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "80%",
        marginTop: 10,
    },
});
