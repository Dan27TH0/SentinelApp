import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductoBusqueda, { ProductoBusquedaProps } from './components/ProductosBusqueda';
import { useRouter } from 'expo-router';
import { User } from 'firebase/auth';
import { useAuth } from './auth/authContexto';
import { Ionicons } from '@expo/vector-icons';

interface HomeProps{
    usuario: User
}

type Producto = {
    _id: string;
    nombre: string;
    imagen: string;
    precio: number;
    descripcion: string;
    marca: string;
    stock: number;
};

const Home: React.FC<HomeProps> = ({ usuario }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    const obtenerProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api-delta-dun.vercel.app/api/products');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProductos(data);
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('No se pudieron cargar los productos. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const enviarDatos = (productos: Producto) => {
        router.push({
            pathname: 'DetalleProducto',
            params: {
                id: productos._id,
                imagen: productos.imagen,
                nombre: productos.nombre,
                precio: productos.precio.toString(),
                descripcion: productos.descripcion,
                marca: productos.marca,
                stock: productos.stock.toString()
            }
        });
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const renderItem = ({ item }: { item: Producto }) => (
        <ProductoBusqueda 
            id={item._id}
            imagen={item.imagen}
            nombre={item.nombre}
            precio={item.precio}
            descripcion={item.descripcion}
            marca={item.marca}
            stock={item.stock}
            onPress={() => enviarDatos(item)} 
        />
    );

    const handleRefresh = () => {
        obtenerProductos();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Nexus.ITC</Text>
                <TouchableOpacity 
                    style={styles.profileButton}
                    onPress={() => router.push('Perfil')}
                >
                    <Ionicons name="person-circle-outline" size={32} color="#7A5CFB" />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
                style={styles.searchBar}
                onPress={() => router.push('Busqueda')}
            >
                <Ionicons name="search" size={20} color="#7A5CFB" />
                <Text style={styles.searchText}>Buscar productos...</Text>
            </TouchableOpacity>

            <View style={styles.contenedorLista}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#7A5CFB" />
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                            <Text style={styles.refreshButtonText}>Reintentar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={productos}
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.lista}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1d182e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingTop: 10,
    },
    logo: {
        fontSize: 28,
        color: '#ffffff',
        fontFamily: 'CenturyGothic',
        fontWeight: 'bold',
    },
    profileButton: {
        padding: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2B2347',
        borderColor: '#7A5CFB',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
    },
    searchText: {
        color: '#9188a8',
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'CenturyGothic',
    },
    contenedorLista: {
        flex: 1,
        backgroundColor: '#2B2347',
        borderColor: '#7A5CFB',
        borderWidth: 2,
        borderRadius: 20,
        padding: 12,
    },
    lista: {
        paddingVertical: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#ff7675',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'CenturyGothic',
    },
    refreshButton: {
        backgroundColor: '#7A5CFB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    refreshButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'CenturyGothic',
        fontWeight: 'bold',
    },
});

export default Home;
