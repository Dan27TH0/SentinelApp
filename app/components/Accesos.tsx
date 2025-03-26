// Código rediseñado del componente Accesos
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type AccesosProps = {
    // icono: React.Component;
    idAcceso: number;
    fecha: String;
    hora: String;
    tipoAcceso: String;
};

const Accesos = ({ idAcceso, fecha, hora, tipoAcceso }: AccesosProps) => {
    // Determinar el color del badge según el tipo de acceso
    const badgeColor = tipoAcceso === 'Entrada' ? '#00D283' : '#FF6B6B';
    
    return (
        <TouchableOpacity 
            style={estiloContenedor.contenedorAccesos}
            activeOpacity={0.9} // Añadido para feedback al tocar
        >
            <View style={estiloContenedor.contenedorPrincipal}>
                {/* Icono + Id del acceso */}
                <View style={estiloContenedor.iconoAcceso}>
                    <Text style={estiloContenedor.textoId}>{idAcceso}</Text>
                </View>
                
                <View style={estiloContenedor.contenedorInfo}>
                    {/* Fecha y Hora del acceso */}
                    <View style={estiloContenedor.contenedorFechaHora}>
                        <Text style={estiloContenedor.textoContenedor}>{fecha}</Text>
                        <Text style={estiloContenedor.separador}>|</Text>
                        <Text style={estiloContenedor.textoContenedor}>{hora}</Text>
                    </View>
                    
                    {/* Tipo de acceso */}
                    <View style={[estiloContenedor.contenedorTipoAcceso, { backgroundColor: badgeColor }]}>
                        <Text style={estiloContenedor.textoTipoAcceso}>{tipoAcceso}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const estiloContenedor = StyleSheet.create({
    contenedorAccesos: {
        backgroundColor: '#7A5CFB',
        borderRadius: 20,
        marginBottom: 15,
        padding: 15,
        width: '100%',
        elevation: 5, // Sombra suave
        shadowColor: '#1d182e',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    contenedorPrincipal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconoAcceso: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        elevation: 3,
        shadowColor: '#1d182e',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    contenedorInfo: {
        flex: 1,
    },
    contenedorFechaHora: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 1,
        marginBottom: 8,
    },
    separador: {
        marginHorizontal: 8,
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    contenedorTipoAcceso: {
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    textoContenedor: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'Roboto',
    },
    textoId: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1d182e',
        fontFamily: 'Roboto',
    },
    textoTipoAcceso: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
    }
});

export default Accesos;