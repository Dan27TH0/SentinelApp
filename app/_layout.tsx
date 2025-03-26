import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import Drawer from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './auth/authContexto';
import { usePathname } from 'expo-router';

type CustomDrawerContentProps = DrawerContentComponentProps & {
  state: {
    routes: Array<{ name: string; key: string }>;
    index: number;
  };
  descriptors: any;
  navigation: any;
};

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const menuCategories = {
    "Principal": ["Home"],
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerScrollView}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL } as ImageSourcePropType} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {(user?.displayName?.[0] || user?.email?.[0] || 'I').toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.username}>{user?.displayName || user?.email || 'Invitado'}</Text>
      </View>

      <View style={styles.divider} />

      {Object.entries(menuCategories).map(([category, screens]) => (
        <View key={category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          
          {screens.map(screenName => {
            const screenOption = props.state.routes.find(route => route.name === screenName);
            if (!screenOption) return null;
            
            const isFocused = props.state.index === props.state.routes.findIndex(route => route.name === screenName);
            
            const getIcon = () => {
              switch(screenName) {
                case 'Home': 
                  return <Ionicons name="home" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
                case 'Perfil': 
                  return <MaterialIcons name="person" size={24} color={isFocused ? "#00D283" : "#FFF"} />;
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
                  {screenName}
                </Text>
                {isFocused && <View style={styles.activeIndicator} />}
              </Pressable>
            );
          })}
          
          <View style={styles.divider} />
        </View>
      ))}
      
      {user ? (
        <Pressable
          style={styles.logoutButton}
          onPress={() => signOut && signOut()}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      ) : (
        <>
          <Pressable
            style={styles.loginButton}
            onPress={() => props.navigation.navigate("Login")}
          >
            <MaterialCommunityIcons name="login" size={24} color="#FFF" />
            <Text style={styles.loginText}>Iniciar sesión</Text>
          </Pressable>
          
          <Pressable
            style={styles.registerButton}
            onPress={() => props.navigation.navigate("Registro")}
          >
            <MaterialCommunityIcons name="account-plus" size={24} color="#FFF" />
            <Text style={styles.registerText}>Registrarse</Text>
          </Pressable>
        </>
      )}
    </DrawerContentScrollView>
  );
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <ContenidoApp/>
        </AuthProvider>
    )
}

function ContenidoApp() {
    const { user } = useAuth();
    
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: !user, // Mostrar header solo cuando no hay usuario
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#2B2347",
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontSize: 20,
                    fontFamily: "CenturyGothic-Bold",
                },
                drawerStyle: {
                    backgroundColor: "#2B2347",
                    width: 280,
                },
                drawerActiveBackgroundColor: "rgba(122, 92, 251, 0.2)",
                drawerActiveTintColor: "#00D283",
                drawerInactiveTintColor: "#fff",
            }}
        >
            {/* Pantallas públicas - Accesibles sin autenticación */}
            <Drawer.Screen
                name="index"
                options={{ 
                    headerShown: false,
                    title: "Inicio"
                }}
            />
            
            <Drawer.Screen
                name="Login"
                options={{ 
                    headerShown: true,
                    title: "Iniciar sesión"
                }}
            />
            <Drawer.Screen
                name="Home"
                options={{ 
                    headerShown: true,
                    title: "Inicio"
                }}
            />

            <Drawer.Screen
                name="Registro"
                options={{ 
                    headerShown: true,
                    title: "Registrarse"
                }}
            />

            {/* Pantallas protegidas - Requieren autenticación */}
            {user && (
                <Drawer.Screen
                    name="Perfil"
                    options={{ 
                        headerShown: false,
                        title: "Perfil"
                    }}
                />
            )}
        </Drawer>
    );
}

const styles = StyleSheet.create({
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
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0, 210, 131, 0.2)',
        borderRadius: 8,
    },
    loginText: {
        color: '#fff',
        marginLeft: 12,
        fontSize: 16,
    },
    registerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(122, 92, 251, 0.2)',
        borderRadius: 8,
    },
    registerText: {
        color: '#fff',
        marginLeft: 12,
        fontSize: 16,
    },
});