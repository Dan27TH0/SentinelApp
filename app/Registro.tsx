import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './auth/firebase';
import { Ionicons } from '@expo/vector-icons';

export default function Registro() {
  // Mantiene exactamente el mismo estado y lógica del componente original
  const [step, setStep] = useState(1); // Paso actual del formulario
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const router = useRouter();

  // Funciones originales mantenidas
  const handleSiguiente = () => {
    if (step < 4) {
      setStep(step + 1); // Avanzar al siguiente paso
    }
  };

  const handleAnterior = () => {
    if (step > 1) {
      setStep(step - 1); // Retroceder al paso anterior
    }
  };

  const handleRegistro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;
      console.log('Usuario registrado:', user);
      router.push('Login');
    } catch (error: any) {
      console.error('Error al registrar:', error);
      alert('Error al registrar: ' + error.message);
    }
  };

  // Renderizar cada paso manteniendo lógica original
  const renderPaso = () => {
    switch (step) {
      case 1:
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput
                  placeholder="Ejemplo: xxxx@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={correo}
                  onChangeText={setCorreo}
                  style={styles.input}
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => router.replace('Login')}>
              <Text style={styles.textoIniciarSesion}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuario</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Nombre de usuario" 
                  value={usuario} 
                  onChangeText={setUsuario} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="create-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Ingresa tu nombre" 
                  value={nombre} 
                  onChangeText={setNombre} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Apellido paterno</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="create-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Ingresa tu apellido paterno" 
                  value={apellidoPaterno} 
                  onChangeText={setApellidoPaterno} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Apellido materno</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="create-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Ingresa tu apellido materno" 
                  value={apellidoMaterno} 
                  onChangeText={setApellidoMaterno} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="" 
                  secureTextEntry 
                  value={contrasena} 
                  onChangeText={setContrasena} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Vuelve a ingresar tu contraseña" 
                  secureTextEntry 
                  value={confirmarContrasena} 
                  onChangeText={setConfirmarContrasena} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>
          </>
        );
      case 4:
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número de teléfono</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={18} color="#7A5CFB" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Ejemplo: 555-555-5555" 
                  keyboardType="phone-pad" 
                  value={telefono} 
                  onChangeText={setTelefono} 
                  style={styles.input} 
                  placeholderTextColor={'rgba(255,255,255,0.5)'}
                />
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header con pasos */}
      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>Registro (Paso {step} de 4)</Text>
        <View style={styles.progressBar}>
          {[1, 2, 3, 4].map(index => (
            <View 
              key={index} 
              style={[
                styles.progressStep, 
                index <= step ? styles.progressStepActive : {}
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Contenedor principal */}
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contenedorRegistro}>
            {renderPaso()}
          </View>
        </ScrollView>
      </View>

      {/* Botones de navegación */}
      <View style={styles.botonesNavegacion}>
        {step > 1 && (
          <TouchableOpacity style={styles.botonSecundario} onPress={handleAnterior}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.botonTexto}>Anterior</Text>
          </TouchableOpacity>
        )}
        {step < 4 ? (
          <TouchableOpacity style={styles.boton} onPress={handleSiguiente}>
            <Text style={styles.botonTexto}>Siguiente</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
            <Text style={styles.botonTexto}>Registrar</Text>
            <Ionicons name="checkmark" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d182e',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'CenturyGothic',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  progressStep: {
    width: '22%',
    height: 6,
    backgroundColor: 'rgba(122, 92, 251, 0.3)',
    borderRadius: 3,
  },
  progressStepActive: {
    backgroundColor: '#7A5CFB',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  contenedorRegistro: {
    width: '85%',
    backgroundColor: '#2B2347',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#7A5CFB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'CenturyGothic',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1d182e',
    borderWidth: 2,
    borderColor: '#7A5CFB',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    color: '#FFFFFF',
    fontSize: 16,
  },
  botonesNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  boton: {
    flexDirection: 'row',
    backgroundColor: '#00D283',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#00D283',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  botonSecundario: {
    flexDirection: 'row',
    backgroundColor: '#7A5CFB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    shadowColor: '#7A5CFB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonIcon: {
    marginHorizontal: 5,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'CenturyGothic',
  },
  textoIniciarSesion: {
    color: '#7A5CFB',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
    fontFamily: 'CenturyGothic',
  },
});