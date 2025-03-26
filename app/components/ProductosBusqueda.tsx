// Código rediseñado del componente ProductoBusqueda
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type EspecificacionesProps = {
    tamaño: String,
    color: String,
    material: String
}

export type ProductoBusquedaProps = {
    id: string;
    nombre: string;
    marca?: string;
    modelo?: string;
    codigo?: string;
    precio: number;
    descripcion?: string;
    categoria?: string;
    imagen: string;
    stock?: number;
    especificaciones?: EspecificacionesProps;
    onPress: () => void;
};

const ProductoBusqueda = ({ imagen, nombre, precio = 0, stock = 0, onPress }: ProductoBusquedaProps) => {
    const disponible = stock > 0;
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.contenedorProducto}
            activeOpacity={0.8} // Transición suave al hacer tap
        >
            <View style={styles.imagenContenedor}>
                <Image source={{ uri: imagen }} style={styles.imagen} />
                
                {/* Badge de stock */}
                <View style={[
                    styles.badgeStock, 
                    {backgroundColor: disponible ? '#00D283' : '#FF6B6B'}
                ]}>
                    <Text style={styles.textoStock}>
                        {disponible ? 'Disponible' : 'Agotado'}
                    </Text>
                </View>
            </View>
            
            <View style={styles.contenedorTexto}>
                <Text style={styles.nombre} numberOfLines={2} ellipsizeMode="tail">
                    {nombre}
                </Text>
                
                {/* Precio con estilo destacado */}
                <View style={styles.precioContainer}>
                    <Text style={styles.simboloPrecio}>$</Text>
                    <Text style={styles.precio}>{precio.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contenedorProducto: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 10,
        overflow: 'hidden',
        width: '45%',
        elevation: 5,
        shadowColor: '#1d182e',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(122, 92, 251, 0.2)',
    },
    imagenContenedor: {
        width: '100%',
        height: 150,
        backgroundColor: '#f5f5f5',
        position: 'relative',
    },
    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badgeStock: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        elevation: 3,
    },
    textoStock: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    contenedorTexto: {
        padding: 12,
        backgroundColor: '#7A5CFB',
    },
    nombre: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        marginBottom: 8,
        height: 40,
    },
    precioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    simboloPrecio: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00D283',
        marginRight: 2,
        fontFamily: 'Roboto',
    },
    precio: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
    },
});

export default ProductoBusqueda;