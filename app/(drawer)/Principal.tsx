import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { useAuth } from '../auth/authContexto';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.85;

// Definición de tipos
interface MenuOption {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  description: string;
}

interface User {
  nombre?: string;
  email: string;
  [key: string]: any; // Para otras propiedades que pueda tener el usuario
}

export default function Principal(): React.ReactElement {
  const router = useRouter();
  const { user } = useAuth() as { user: User | null };

  const menuOptions: MenuOption[] = [
    {
      title: 'Controles del Sistema',
      icon: 'shield-checkmark-outline',
      route: 'ControlSistema',
      description: 'Gestione los controles y configuraciones del sistema'
    },
    {
      title: 'Registro de Accesos',
      icon: 'key-outline',
      route: 'ControlAccesos',
      description: 'Visualice y administre los accesos registrados'
    },
    {
      title: 'Dispositivos Registrados',
      icon: 'hardware-chip-outline',
      route: 'DispositivosRegistrados',
      description: 'Administre los dispositivos en el sistema'
    },
    {
      title: 'Configuración',
      icon: 'settings-outline',
      route: 'Configuracion',
      description: 'Personalice las opciones de su cuenta'
    }
  ];

  const handleNavigation = (route: string): void => {
    if (!route) return;
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1d182e" />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Control de Accesos</Text>
          {user && (
            <Text style={styles.subtitle}>
              Bienvenido, {user.nombre || user.email}
            </Text>
          )}
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerButtons}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => handleNavigation(option.route)}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name={option.icon} size={28} color="#FFFFFF" />
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonText}>{option.title}</Text>
                    <Text style={styles.buttonDescription}>{option.description}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.push('Login')}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    backgroundColor: '#1d182e',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7A5CFB',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  containerButtons: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#00D283',
    padding: 18,
    marginVertical: 10,
    width: buttonWidth,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'sans-serif-medium',
  },
  buttonDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  logoutText: {
    color: '#FF6B6B',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  }
});