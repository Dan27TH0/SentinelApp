import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import Drawer from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../auth/authContexto';
import { usePathname, useRouter } from 'expo-router';

// Tipos para las props del Header
type CustomHeaderProps = {
  title?: string;
  navigation: any; // Tipo más específico podría ser NavigationProp
  hasNotifications?: boolean;
};

// Tipos para las props del Drawer
type CustomDrawerContentProps = DrawerContentComponentProps & {
  state: {
    routes: Array<{ name: string; key: string }>;
    index: number;
  };
  descriptors: any;
  navigation: any;
};

// Tipos para el usuario
type UserType = {
  photoURL?: string;
  displayName?: string;
  email?: string;
};

// Componente para el Header personalizado
const CustomHeader = ({ title, navigation, hasNotifications = false }: CustomHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable 
        onPress={() => navigation.openDrawer()}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Ionicons name="menu" size={24} color="#fff" />
      </Pressable>
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      <Pressable 
        onPress={() => {/* Navegar a notificaciones */}}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <View>
          <Ionicons name="notifications" size={24} color="#fff" />
          {hasNotifications && (
            <View style={styles.badge} />
          )}
        </View>
      </Pressable>
    </View>
  );
};

// Componente personalizado para el contenido del Drawer
const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    setHasNotifications(true);
  }, []);

  const menuCategories: Record<string, string[]> = {
    "Principal": ["Home"],
    "Control IoT": ["ControlAccesos", "ControlSistema"],
    "Productos": ["Busqueda", "DetalleProducto", "Carrito"],
    "Usuario": ["Perfil", "GestorAccesos"]
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerScrollView}>
      {/* Encabezado del Drawer */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL } as ImageSourcePropType} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {(user?.displayName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.username}>{user?.displayName || user?.email || 'Usuario'}</Text>
      </View>

      <View style={styles.divider} />

      {Object.entries(menuCategories).map(([category, screens]) => (
        <View key={category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          
          {screens.map(screenName => {
            const screenOption = props.state.routes.find(route => route.name === screenName);
            if (!screenOption) return null;
            
            const isFocused = props.state.index === props.state.routes.findIndex(route => route.name === screenName);
            const screenProps = props.descriptors[screenOption.key].options;
            
            const getIcon = () => {
              switch(screenName) {
                case 'Busqueda': 
                  return <Ionicons name="search" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'Carrito': 
                  return <MaterialIcons name="shopping-cart" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'ControlAccesos': 
                  return <MaterialIcons name="security" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'ControlSistema': 
                  return <MaterialIcons name="door-front" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'DetalleProducto': 
                  return <MaterialIcons name="info" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'GestorAccesos': 
                  return <FontAwesome5 name="user-lock" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'Perfil': 
                  return <MaterialIcons name="person" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'Principal': 
                  return <Ionicons name="home" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                default: 
                  return <MaterialIcons name="circle" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
              }
            };
            
            return (
              <Pressable
                key={screenName}
                onPress={() => props.navigation.navigate(screenName)}
                style={[
                  styles.drawerItem,
                  isFocused && styles.drawerItemActive
                ]}
              >
                <View style={styles.drawerItemIcon}>
                  {getIcon()}
                </View>
                <Text style={[
                  styles.drawerItemText,
                  isFocused && styles.drawerItemTextActive
                ]}>
                  {screenProps.title || screenName}
                </Text>
                {isFocused && <View style={styles.activeIndicator} />}
              </Pressable>
            );
          })}
          
          <View style={styles.divider} />
        </View>
      ))}
      
      <Pressable
        style={styles.logoutButton}
        onPress={() => signOut && signOut()}
      >
        <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default function RootLayout() {
    const { user } = useAuth();
    const [hasNotifications, setHasNotifications] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasNotifications(true);
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation, route }) => ({
                headerShown: true,
                headerTitleAlign: "center",
                header: ({ navigation, route, options }) => (
                    <CustomHeader 
                        title={options.title} 
                        navigation={navigation}
                        hasNotifications={hasNotifications}
                    />
                ),
                drawerStyle: {
                    backgroundColor: "#2B2347",
                    width: 280,
                },
                drawerActiveBackgroundColor: "rgba(122, 92, 251, 0.2)",
                drawerActiveTintColor: "#00D283",
                drawerInactiveTintColor: "#fff",
            })}
        >
            {user && <Drawer.Screen name="Home" options={{ title: "Principal" }} />}
            {user && <Drawer.Screen name="Busqueda" options={{ title: "Buscar" }} />}
            {user && <Drawer.Screen name="Carrito" options={{ title: "Carrito" }} />}
            {user && <Drawer.Screen name="ControlAccesos" options={{ title: "Accesos" }} />}
            {user && <Drawer.Screen name="ControlSistema" options={{ title: "Control de la Puerta" }} />}
            {user && <Drawer.Screen name="DetalleProducto" options={{ title: "Detalles del producto" }} />}
            {user && <Drawer.Screen name="GestorAccesos" options={{ title: "Gestor de Accesos" }} />}
            {user && <Drawer.Screen name="Perfil" options={{ title: "Perfil" }} />}
            {user && <Drawer.Screen name="Principal" options={{ title: "Controles" }} />}
        </Drawer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2B2347',
        height: 65,
        paddingHorizontal: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.7,
    },
    badge: {
        position: 'absolute',
        right: -2,
        top: -2,
        backgroundColor: '#00D283',
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2B2347',
    },
    drawerScrollView: {
        backgroundColor: '#2B2347',
    },
    drawerHeader: {
        padding: 16,
        paddingTop: 40,
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 12,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#7A5CFB',
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#7A5CFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    username: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 8,
    },
    categoryTitle: {
        color: '#7A5CFB',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 4,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 2,
        position: 'relative',
    },
    drawerItemActive: {
        backgroundColor: 'rgba(122, 92, 251, 0.2)',
    },
    drawerItemIcon: {
        marginRight: 16,
        width: 24,
    },
    drawerItemText: {
        color: '#fff',
        fontSize: 16,
    },
    drawerItemTextActive: {
        color: '#00D283',
        fontWeight: 'bold',
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#00D283',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 59, 48, 0.2)',
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        marginLeft: 12,
        fontSize: 16,
    },
});