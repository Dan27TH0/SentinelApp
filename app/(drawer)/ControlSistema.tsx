import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

type BotonProps = {
    titulo: string;
    estilo: object;
    onPress: () => void;
    icono?: keyof typeof Feather.glyphMap;
};

const ESP32_IP = "http://192.168.8.11:3000";

const BotonControl = ({ titulo, estilo, onPress, icono }: BotonProps) => {
    const animacionPresion = new Animated.Value(0);

    const presionarBoton = () => {
        Animated.sequence([
            Animated.timing(animacionPresion, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(animacionPresion, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
        onPress();
    };

    const estiloAnimado = {
        transform: [
            {
                scale: animacionPresion.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.95],
                })
            }
        ]
    };

    return (
        <Animated.View style={estiloAnimado}>
            <TouchableOpacity style={[styles.boton, estilo]} onPress={presionarBoton}>
                {icono && <Feather name={icono} size={20} color="#FFFFFF" style={styles.icono} />}
                <Text style={styles.botonTexto}>{titulo}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function ControlSistema() {
    const [estadoPuerta, setEstadoPuerta] = useState("BLOQUEADO");
    const [isFetching, setIsFetching] = useState(false);
    const [escalaIcono] = useState(new Animated.Value(1));

    // Efecto de animación cuando cambia el estado
    useEffect(() => {
        Animated.sequence([
            Animated.timing(escalaIcono, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(escalaIcono, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();
    }, [estadoPuerta]);

    const obtenerEstadoPuerta = async () => {
        if (isFetching) return;

        setIsFetching(true);
        try {
            const response = await fetch(`${ESP32_IP}/estado`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setEstadoPuerta(data.estado);
        } catch (error) {
            console.error("Error al obtener el estado de la puerta:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const cambiarEstadoPuerta = async (accion: "abrir" | "cerrar") => {
        try {
            const response = await fetch(`${ESP32_IP}/${accion}, { method: "GET" }`);
            if (response.ok) {
                setEstadoPuerta(accion === "abrir" ? "DESBLOQUEADO" : "BLOQUEADO");
            }
        } catch (error) {
            console.error(`Error al intentar ${accion} la puerta:, error`);
        }
    };

    useEffect(() => {
        obtenerEstadoPuerta();
        const interval = setInterval(obtenerEstadoPuerta, 2500);
        return () => clearInterval(interval);
    }, []);

    const getIconoEstado = () => {
        return estadoPuerta === "BLOQUEADO" ? "lock" : "unlock";
    };

    const getColorEstado = () => {
        return estadoPuerta === "BLOQUEADO" ? "#CD6155" : "#00D283";
    };

    const estiloIcono = {
        transform: [{ scale: escalaIcono }]
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Control del Sistema IoT</Text>
            
            <View style={styles.estadoContainer}>
                <Text style={styles.estadoTexto}>Estado actual de la puerta:</Text>
                <View style={styles.estadoIndicador}>
                    <Animated.View style={estiloIcono}>
                        <Feather name={getIconoEstado()} size={32} color={getColorEstado()} />
                    </Animated.View>
                    <Text style={[styles.estado, { color: getColorEstado() }]}>{estadoPuerta}</Text>
                </View>
            </View>
            
            <View style={styles.seccionBotones}>
                <Text style={styles.textoTituloBoton}>Botones de control</Text>
                <View style={styles.viewBotones}>
                    <BotonControl 
                        titulo="Abrir" 
                        estilo={styles.botonAbrir} 
                        onPress={() => cambiarEstadoPuerta("abrir")} 
                        icono="unlock"
                    />
                    <BotonControl 
                        titulo="Cerrar" 
                        estilo={styles.botonCerrar} 
                        onPress={() => cambiarEstadoPuerta("cerrar")} 
                        icono="lock"
                    />
                </View>
            </View>
        </View>
    );
}

const { width } = Dimensions.get('window');
const esMovil = width < 768;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: '#1d182e',
    },
    titulo: {
        fontSize: esMovil ? 24 : 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic',
        marginTop: 60,
        marginBottom: 30,
    },
    estadoContainer: {
        width: esMovil ? '90%' : '60%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#7A5CFB',
        backgroundColor: '#2B2347',
        borderRadius: 20,
        padding: 25,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    estadoTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic',
        marginBottom: 15,
    },
    estadoIndicador: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    estado: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: 'CenturyGothic',
    },
    seccionBotones: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
    },
    textoTituloBoton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic',
        marginBottom: 20,
    },
    viewBotones: {
        flexDirection: esMovil ? 'column' : 'row',
        justifyContent: 'space-evenly',
        width: esMovil ? '100%' : '70%',
    },
    boton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#7A5CFB',
        borderRadius: 25,
        margin: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    botonAbrir: {
        backgroundColor: "#00D283",
    },
    botonCerrar: {
        backgroundColor: "#CD6155",
    },
    botonTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic',
    },
    icono: {
        marginRight: 8,
    },
});