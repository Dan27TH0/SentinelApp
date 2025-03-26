import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, StatusBar, Image } from 'react-native';
import ProductosCarrito from '../components/ProductosCarrito';
import { LinearGradient } from 'expo-linear-gradient';

const productos = [
    {
        id: '1',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn050vaT4lrxqSGhFsqIJEqZATeSIjn41HSQ&s',
        nombreProducto: 'React Native Expo',
        estado: 'En progreso',
        onPress: () => {console.log('Cerrar')}
    },
    {
        id: '2',
        imagen: 'https://via.placeholder.com/150',
        nombreProducto: 'Producto 2',
        estado: 'En camino',
        onPress: () => {console.log('Cerrar')}
    },
    {
        id: '3',
        imagen: 'https://via.placeholder.com/150',
        nombreProducto: 'Producto 2',
        estado: 'En camino',
        onPress: () => {console.log('Cerrar')}
    },
    {
        id: '4',
        imagen: 'https://via.placeholder.com/150',
        nombreProducto: 'Producto 2',
        estado: 'En camino',
        onPress: () => {console.log('Cerrar')}
    },
    // Agrega más productos aquí
];

const Carrito = () => {
    // Invierte el orden de los productos
    const productosInvertidos = [...productos].reverse();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1d182e" barStyle="light-content" />
            
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Carrito</Text>
                <Text style={styles.headerSubtitle}>{productos.length} productos</Text>
            </View>
            
            {/* Catálogo de Productos */}
            <FlatList
                data={productosInvertidos} // Usa los datos invertidos
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductosCarrito
                        imagen={item.imagen}
                        nombreProducto={item.nombreProducto}
                        estado={item.estado}
                        onPress={item.onPress}
                    />
                )}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.contenedorAcciones}>
                {/* Resumen del Precio */}
                <View style={styles.resumenPrecioContainer}>
                    <Text style={styles.resumenPrecioLabel}>Precio Total:</Text>
                    <Text style={styles.resumenPrecioTexto}>$XX.XX</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    {/* Botón Eliminar Todo */}
                    <TouchableOpacity 
                        style={styles.botonEliminarTodo} 
                        onPress={() => console.log('Eliminar todo')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.botonEliminarTodoTexto}>Eliminar todo</Text>
                    </TouchableOpacity>

                    {/* Botón Hacer Pedido */}
                    <TouchableOpacity 
                        style={styles.botonHacerPedido} 
                        onPress={() => console.log('Hacer pedido')}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            colors={['#00D283', '#0AB68B']}
                            style={styles.gradientButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.botonHacerPedidoTexto}>Hacer pedido</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d182e',
    },
    header: {
        padding: 16,
        paddingTop: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(122, 92, 251, 0.3)',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    headerSubtitle: {
        color: '#7A5CFB',
        fontSize: 16,
    },
    lista: {
        padding: 16,
        paddingTop: 8,
        paddingBottom: 100,
        flexDirection: 'column-reverse', // Invierte el orden de los elementos
    },
    botonEliminarTodo: {
        backgroundColor: 'rgba(255, 59, 48, 0.15)',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    botonEliminarTodoTexto: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resumenPrecioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(122, 92, 251, 0.1)',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(122, 92, 251, 0.3)',
    },
    resumenPrecioLabel: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    resumenPrecioTexto: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    botonHacerPedido: {
        flex: 1.5,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 5, // Sombra para Android
        shadowColor: '#00D283', // Sombra para iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    gradientButton: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    botonHacerPedidoTexto: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contenedorAcciones: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#1d182e',
        borderTopWidth: 1,
        borderTopColor: 'rgba(122, 92, 251, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Carrito;