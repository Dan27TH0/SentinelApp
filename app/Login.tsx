import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Image,
  StatusBar,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./auth/firebase";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const buttonScale = new Animated.Value(1);
  const router = useRouter();

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    animateButton();
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("¡Bienvenido!", "Inicio de sesión exitoso");
      router.replace('/Home');
    } catch (error: any) {
      let errorMessage = "Error al iniciar sesión";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No existe una cuenta con este correo electrónico";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Contraseña incorrecta";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "El formato del correo electrónico es inválido";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Demasiados intentos fallidos. Inténtalo más tarde";
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1d182e" />
      
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons name="log-in-outline" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.titulo}>Iniciar Sesión</Text>
        <Text style={styles.subtitulo}>Bienvenido de nuevo</Text>
      </View>
      
      <View style={styles.contenedorLogin}>
        <View style={styles.inputContainer}>
          <Text style={styles.estadoTexto}>Correo Electrónico</Text>
          <View style={[
            styles.inputWrapper, 
            emailFocused && styles.inputWrapperFocused
          ]}>
            <Ionicons name="mail-outline" size={20} color="#7A5CFB" style={styles.inputIcon} />
            <TextInput 
              placeholder="ejemplo@correo.com" 
              value={email} 
              keyboardType="email-address" 
              autoCapitalize="none" 
              placeholderTextColor={'rgba(255,255,255,0.5)'} 
              style={styles.input} 
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.estadoTexto}>Contraseña</Text>
          <View style={[
            styles.inputWrapper, 
            passwordFocused && styles.inputWrapperFocused
          ]}>
            <Ionicons name="lock-closed-outline" size={20} color="#7A5CFB" style={styles.inputIcon} />
            <TextInput 
              placeholder='••••••••' 
              secureTextEntry={!showPassword} 
              value={password} 
              placeholderTextColor={'rgba(255,255,255,0.5)'} 
              style={styles.input} 
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity 
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#7A5CFB" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
          <TouchableOpacity 
            style={styles.botonIniciar} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.botonTexto}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>¿Aún no tienes cuenta?</Text>
        <TouchableOpacity onPress={() => router.push('Registro')}>
          <Text style={styles.botonRegistroTexto}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#1d182e',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7A5CFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#7A5CFB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'CenturyGothic',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'CenturyGothic',
  },
  contenedorLogin: {
    width: '100%',
    backgroundColor: 'rgba(43, 35, 71, 0.7)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(122, 92, 251, 0.3)',
  },
  inputContainer: {
    marginBottom: 16,
  },
  estadoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'CenturyGothic',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(122, 92, 251, 0.5)',
    borderRadius: 12,
    backgroundColor: 'rgba(29, 24, 46, 0.8)',
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: '#7A5CFB',
    shadowColor: '#7A5CFB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon: {
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  showPasswordButton: {
    padding: 10,
    marginRight: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 5,
  },
  forgotPasswordText: {
    color: '#7A5CFB',
    fontSize: 14,
    fontFamily: 'CenturyGothic',
  },
  botonIniciar: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00D283',
    borderRadius: 16,
    shadowColor: '#00D283',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  botonTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'CenturyGothic',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontFamily: 'CenturyGothic',
    marginRight: 8,
  },
  botonRegistroTexto: {
    color: '#7A5CFB',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'CenturyGothic',
  },
});