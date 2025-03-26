// Código rediseñado del componente ProductoCarrito
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export type ProductoCarritoProps = {
    imagen: string;
    nombreProducto: string;
    estado: string;
    precio?: number;
    cantidad?: number;
    onPress: () => void;
};

const ProductoCarrito = ({ 
    imagen, 
    nombreProducto, 
    estado, 
    precio = 0, 
    cantidad: initialCantidad = 1, 
    onPress 
}: ProductoCarritoProps) => {
    const [cantidad, setCantidad] = useState(initialCantidad);
    const esAgotado = estado === 'Agotado';
    
    // Función para manejar la cantidad
    const handleCantidad = (incremento: number) => {
        const nuevaCantidad = cantidad + incremento;
        if (nuevaCantidad >= 1) {
            setCantidad(nuevaCantidad);
        }
    };
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles.contenedorProducto,
                esAgotado ? styles.contenedorAgotado : null
            ]}
            activeOpacity={0.8}
        >
            {/* Botón de eliminar en esquina superior derecha */}
            <TouchableOpacity style={styles.botonEliminar}>
                <Ionicons name="close-sharp" size={24} color="#fff"/>
            </TouchableOpacity>
            
            <View style={styles.contenedorInterno}>
                {/* Imagen del producto */}
                <View style={styles.imagenContenedor}>
                    <Image source={{ uri: imagen }} style={styles.imagen} />
                    
                    {/* Badge de estado */}
                    <View style={[
                        styles.badgeEstado,
                        {backgroundColor: esAgotado ? '#FF6B6B' : '#00D283'}
                    ]}>
                        <Text style={styles.textoEstado}>{estado}</Text>
                    </View>
                </View>
                
                {/* Información del producto */}
                <View style={styles.contenedorTexto}>
                    <Text style={styles.nombreProducto} numberOfLines={2} ellipsizeMode="tail">
                        {nombreProducto}
                    </Text>
                    
                    {precio > 0 && (
                        <Text style={styles.precio}>
                            ${(precio * cantidad).toFixed(2)}
                        </Text>
                    )}
                    
                    {/* Selector de cantidad */}
                    <View style={styles.selectorCantidad}>
                        <TouchableOpacity 
                            style={styles.botonCantidad}
                            onPress={() => handleCantidad(-1)}
                            disabled={esAgotado}
                        >
                            <MaterialIcons name="remove" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        
                        <Text style={styles.textoCantidad}>{cantidad}</Text>
                        
                        <TouchableOpacity 
                            style={styles.botonCantidad}
                            onPress={() => handleCantidad(1)}
                            disabled={esAgotado}
                        >
                            <MaterialIcons name="add" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contenedorProducto: {
        backgroundColor: '#7A5CFB', 
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        elevation: 5,
        shadowColor: '#1d182e',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        position: 'relative',
    },
    contenedorAgotado: {
        opacity: 0.6,
    },
    contenedorInterno: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonEliminar: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagenContenedor: {
        width: 110,
        height: 110,
        borderRadius: 15,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        position: 'relative',
    },
    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badgeEstado: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 4,
        alignItems: 'center',
    },
    textoEstado: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    contenedorTexto: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'space-between',
        height: 100,
    },
    nombreProducto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        marginBottom: 8,
    },
    precio: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        marginBottom: 10,
    },
    selectorCantidad: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
    },
    botonCantidad: {
        backgroundColor: '#1d182e',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoCantidad: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginHorizontal: 15,
    },
});

export default ProductoCarrito;