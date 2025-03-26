import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Switch, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
  ScrollView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Perfil() {
    const [notificaciones, setNotificaciones] = useState(false);
    const [temaOscuro, setTemaOscuro] = useState(true);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <StatusBar barStyle="light-content" backgroundColor="#1d182e" />
                
                <View style={styles.container}>
                    {/* Header con decoración */}
                    <View style={styles.headerDecoration}>
                        <View style={styles.decorationCircle1} />
                        <View style={styles.decorationCircle2} />
                    </View>
                    
                    {/* Tarjeta de Perfil */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeader}>
                            <View style={styles.profileCircle}>
                                <MaterialIcons name="person" size={60} color="#FFFFFF" />
                            </View>
                            
                            <View style={styles.editButton}>
                                <MaterialIcons name="edit" size={18} color="#FFFFFF" />
                            </View>
                        </View>
                        
                        {/* Información del Usuario */}
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>Admin</Text>
                            <Text style={styles.userEmail}>admin@example.com</Text>
                            <View style={styles.userRole}>
                                <Text style={styles.roleText}>Administrador</Text>
                            </View>
                        </View>
                    </View>
                    
                    {/* Sección de Configuraciones */}
                    <View style={styles.settingsSection}>
                        <Text style={styles.sectionTitle}>Configuración</Text>
                        
                        {/* Configuración de Notificaciones */}
                        <View style={styles.settingItem}>
                            <View style={styles.settingIconContainer}>
                                <Ionicons name="notifications-outline" size={22} color="#00D283" />
                            </View>
                            <Text style={styles.settingText}>Notificaciones</Text>
                            <Switch
                                value={notificaciones}
                                onValueChange={(value) => setNotificaciones(value)}
                                trackColor={{ false: '#3D3452', true: '#00D283' }}
                                thumbColor="#FFFFFF"
                                style={styles.switch}
                            />
                        </View>
                        
                        {/* Privacidad */}
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingIconContainer}>
                                <Ionicons name="lock-closed-outline" size={22} color="#00D283" />
                            </View>
                            <Text style={styles.settingText}>Privacidad</Text>
                            <MaterialIcons name="chevron-right" size={24} color="#6E6A7C" />
                        </TouchableOpacity>
                        
                        {/* Ayuda */}
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingIconContainer}>
                                <Ionicons name="help-circle-outline" size={22} color="#00D283" />
                            </View>
                            <Text style={styles.settingText}>Ayuda</Text>
                            <MaterialIcons name="chevron-right" size={24} color="#6E6A7C" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Botón de Cerrar Sesión */}
                    <TouchableOpacity 
                        style={styles.logoutButton} 
                        onPress={() => console.log('Cerrar sesión')}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.logoutText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                    
                    {/* Versión */}
                    <Text style={styles.versionText}>Versión 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1d182e',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1d182e',
        padding: 20,
        position: 'relative',
    },
    headerDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        overflow: 'hidden',
    },
    decorationCircle1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(122, 92, 251, 0.3)',
        top: -100,
        left: -50,
    },
    decorationCircle2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(0, 210, 131, 0.2)',
        top: -50,
        right: -30,
    },
    profileCard: {
        width: '100%',
        backgroundColor: '#2A2440',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    profileHeader: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    profileCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#7A5CFB',
        marginTop: -60,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#2A2440',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    editButton: {
        position: 'absolute',
        right: 0,
        top: -40,
        backgroundColor: '#00D283',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    userInfo: {
        alignItems: 'center',
        width: '100%',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    userEmail: {
        fontSize: 14,
        color: '#AAA9B1',
        marginBottom: 12,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
    userRole: {
        backgroundColor: '#7A5CFB33',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 10,
    },
    roleText: {
        color: '#7A5CFB',
        fontWeight: '600',
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    settingsSection: {
        width: '100%',
        backgroundColor: '#2A2440',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#3D3452',
    },
    settingIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#3D3452',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    settingText: {
        fontSize: 16,
        color: '#FFFFFF',
        flex: 1,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
    switch: {
        transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [],
    },
    logoutButton: {
        backgroundColor: '#FF5252',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 30,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    },
    versionText: {
        color: '#6E6A7C',
        fontSize: 12,
        marginTop: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    }
});