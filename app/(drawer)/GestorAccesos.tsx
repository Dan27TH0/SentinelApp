import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GestorAccesos() {
    const navigation = useNavigation();
    
    const handleLogout = () => {
        console.log("Sesión cerrada");
    };

    return (
        <View style={estiloGestor.container}>
            <Text style={estiloGestor.titulo}>Gestor de accesos</Text>
        </View>
    );
}

const estiloGestor = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        position: 'absolute',
        top: 55,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        top: 45,
    },
});
