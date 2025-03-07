import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import Boton from "./components/Boton";
import { router } from "expo-router";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/users");
            const users = await response.json();

            const user = users.find((u) => u.username === username);
            if (!user) {
                Alert.alert("Usuario no encontrado");
                return;
            }

            if (user.password !== password) {
                Alert.alert("Contraseña incorrecta");
                return;
            }

            Alert.alert("Bienvenido", `Hola, ${user.name.firstname} ${user.name.lastname}!`);
            router.replace("/(tabs)");
        } catch (error) {
            Alert.alert("No se pudo conectar con la API");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("./img/login.png")} style={styles.image} />
            <Text style={styles.loginText}>Login</Text>

            <TextInput style={styles.input} placeholder="Nombre de usuario"
              placeholderTextColor="#999" value={username} onChangeText={setUsername} 
            />

            <TextInput style={styles.input} placeholder="Contraseña"
              placeholderTextColor="#999" secureTextEntry={true} value={password} onChangeText={setPassword} 
            />

            <Boton titulo="Enviar" onPress={handleLogin} estilo={styles.botong} />

            <View style={styles.linksContainer}>
                <Text style={styles.linkText} onPress={() => Alert.alert("Aún no puedes crear una cuenta")}>
                    ¿No estás registrado? Crea una cuenta
                </Text>
                <Text style={styles.linkText} onPress={() => Alert.alert("Aún no puedes recuperar tu contraseña")}>
                    ¿Olvidaste tu contraseña? Haz clic aquí para recuperarla
                </Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    loginText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    botong: {
        width: "100%",
        height: 40,
        backgroundColor: "#2EC431",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    linksContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    linkText: {
        color: "#007bff",
        fontSize: 14,
        marginBottom: 10,
        textDecorationLine: "underline",
    },
});
