import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Usa useRouter de Expo Router
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/commonjs/src/types';
import { useAuth } from '../auth/authContexto';

type NavbarProps = {
    navigation: DrawerNavigationHelpers;
};

const Navbar = ({navigation}: NavbarProps) => {
    const { user, signOut } = useAuth();
    const router = useRouter(); // Obtén el router de Expo Router
    
    const handleLogout = async () => {
        await signOut(); // Cierra la sesión
        router.replace('/Home'); // Redirige al Login
    };

    // Determinar ruta actual
    const getCurrentRoute = () => {
        const state = navigation.getState();
        if (state && state.routes && state.routes.length > 0) {
            const currentRoute = state.routes[state.index];
            return currentRoute.name;
        }
        return '';
    };

    const currentRoute = getCurrentRoute();

    const isActive = (route: string) => {
        return currentRoute === route;
    };

    const renderMenuItem = (route: string, label: string, icon: keyof typeof MaterialIcons.glyphMap) => {
        const active = isActive(route);
        
        return (
            <TouchableOpacity 
                style={[styles.menuItem, active && styles.activeMenuItem]} 
                onPress={() => router.push(route)}
                activeOpacity={0.7}
            >
                <View style={styles.menuItemContent}>
                    <MaterialIcons 
                        name={icon} 
                        size={24} 
                        color={active ? '#7A5CFB' : '#FFFFFF'} 
                    />
                    <Text style={[styles.menuText, active && styles.activeMenuText]}>{label}</Text>
                </View>
                {active && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.drawerContainer}>
            <TouchableOpacity 
                onPress={() => router.back()} 
                style={styles.closeButton}
                activeOpacity={0.7}
            >
                <MaterialIcons name="close" size={30} color="#FFFFFF" /> 
            </TouchableOpacity>
            
            <View style={styles.profileSection}>
                <View style={styles.profileCircle}>
                    <MaterialIcons name="person" size={50} color="#1d182e" />
                </View>
                <Text style={styles.profileName}>
                    {user ? user.displayName || 'Usuario' : 'Invitado'}
                </Text>
            </View>
            
            <View style={styles.divider} />
            
            {user ? (
                <>
                    <View style={styles.menuSection}>
                        {renderMenuItem('Perfil', 'Perfil', 'person')}
                        {renderMenuItem('Home', 'Inicio', 'home')}
                        {renderMenuItem('Principal', 'Control de IoT', 'devices')}
                        {renderMenuItem('Busqueda', 'Buscar', 'search')}
                        {renderMenuItem('Carrito', 'Carrito', 'shopping-cart')}
                    </View>
                    
                    <View style={styles.footerSection}>
                        <View style={styles.divider} />
                        <TouchableOpacity 
                            style={styles.logoutButton} 
                            onPress={handleLogout}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="logout" size={20} color="#FFFFFF" />
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.menuSection}>
                        {renderMenuItem('Login', 'Iniciar Sesión', 'login')}
                        {renderMenuItem('Registro', 'Registrarse', 'person-add')}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#1d182e',
        padding: 0,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(122, 92, 251, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSection: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 20,
    },
    profileCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#7A5CFB',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#7A5CFB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic',
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginVertical: 15,
    },
    menuSection: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
        flex: 1,
    },
    menuItem: {
        marginVertical: 10,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeMenuItem: {
        backgroundColor: 'rgba(122, 92, 251, 0.1)',
    },
    menuText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic',
        marginLeft: 15,
    },
    activeMenuText: {
        color: '#7A5CFB',
        fontWeight: 'bold',
    },
    activeIndicator: {
        width: 4,
        height: 20,
        backgroundColor: '#7A5CFB',
        borderRadius: 2,
    },
    footerSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#00D283',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#00D283',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'CenturyGothic',
        marginLeft: 8,
    },
});

export default Navbar;