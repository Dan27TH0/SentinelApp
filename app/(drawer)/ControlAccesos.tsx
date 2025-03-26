import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator, Animated } from 'react-native';
import Accesos from '../components/Accesos';
import { AccesosProps } from '../components/Accesos';

export default function ControlAccesos() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [refrescando, setRefrescando] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const obtenerDatos = async () => {
        try {
            setRefrescando(true);
            const respuesta = await fetch('http://192.168.8.11:3000/accesos');
            const datosJson = await respuesta.json();
            setDatos(datosJson);
            
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        } finally {
            setCargando(false);
            setRefrescando(false);
        }
    };

    useEffect(() => {
        obtenerDatos();
        const intervalo = setInterval(() => {
            obtenerDatos();
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    const renderItem = ({ item }: { item: AccesosProps }) => (
        <Accesos 
            idAcceso={item.idAcceso} 
            fecha={item.fecha} 
            hora={item.hora} 
            tipoAcceso={item.tipoAcceso} 
        />
    );

    return (
        <View style={estilosAccesos.container}>
            <View style={estilosAccesos.header}>
                <Text style={estilosAccesos.titulo}>Registro de accesos</Text>
                {refrescando && !cargando && (
                    <View style={estilosAccesos.actualizandoContainer}>
                        <ActivityIndicator size="small" color="#00D283" />
                        <Text style={estilosAccesos.actualizandoTexto}>Actualizando...</Text>
                    </View>
                )}
            </View>
            
            <View style={estilosAccesos.contenedorAccesos}>
                {cargando ? (
                    <View style={estilosAccesos.cargandoContainer}>
                        <ActivityIndicator size="large" color="#00D283" />
                        <Text style={estilosAccesos.cargandoTexto}>Cargando registros...</Text>
                    </View>
                ) : datos.length === 0 ? (
                    <View style={estilosAccesos.emptyContainer}>
                        <Text style={estilosAccesos.emptyIcon}>📝</Text>
                        <Text style={estilosAccesos.mensajeVacio}>No hay registros de accesos disponibles</Text>
                        <Text style={estilosAccesos.mensajeVacioSubtexto}>Los nuevos registros aparecerán aquí automáticamente</Text>
                        <TouchableOpacity 
                            style={estilosAccesos.refreshButton}
                            onPress={obtenerDatos}
                            activeOpacity={0.7}
                        >
                            <Text style={estilosAccesos.refreshButtonText}>Actualizar ahora</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
                        <FlatList
                            data={datos}
                            renderItem={renderItem}
                            keyExtractor={item => item.idAcceso.toString()}
                            contentContainerStyle={estilosAccesos.lista}
                            showsVerticalScrollIndicator={false}
                        />
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

const estilosAccesos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d182e',
        padding: 16,
    },
    header: {
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(43, 35, 71, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(122, 92, 251, 0.3)',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginBottom: 4,
    },
    actualizandoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    actualizandoTexto: {
        color: '#00D283',
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'Roboto',
    },
    contenedorAccesos: {
        flex: 1,
        backgroundColor: 'rgba(43, 35, 71, 0.5)',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(122, 92, 251, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    cargandoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cargandoTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Roboto',
        marginTop: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    mensajeVacio: {
        textAlign: 'center',
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    mensajeVacioSubtexto: {
        textAlign: 'center',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: 'Roboto',
        marginBottom: 24,
    },
    refreshButton: {
        backgroundColor: 'rgba(0, 210, 131, 0.15)',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 210, 131, 0.3)',
    },
    refreshButtonText: {
        color: '#00D283',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    lista: {
        padding: 16,
    },
    estadoTexto: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: '#FFFFFF',
    },
});