import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Platform,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componentes reutilizables
const Badge = ({ text }: { text: string }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

const PriceDisplay = ({ price }: { price: string }) => (
  <View style={styles.priceContainer}>
    <Text style={styles.currencySymbol}>$</Text>
    <Text style={styles.priceText}>{price}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const DetalleProducto = () => {
  const params = useLocalSearchParams();
  const [isPressed, setIsPressed] = useState(false);

  // Extracción de parámetros con valores por defecto para evitar errores
  const imagen = params.imagen as string || 'https://via.placeholder.com/300';
  const nombreProducto = params.nombreProducto as string || 'Producto';
  const precio = params.precio as string || '0';
  const stock = params.stock as string || '0';
  const descripcion = params.descripcion as string || 'Sin descripción disponible';

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* Imagen del Producto con efecto de sombra y contenedor mejorado */}
        <View style={styles.imageCardContainer}>
          <View style={styles.imagenContenedor}>
            <Image 
              source={{ uri: imagen }} 
              style={styles.imagen}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Sección de información principal */}
        <View style={styles.infoSection}>
          {/* Nombre del Producto */}
          <Text style={styles.nombreProducto}>{nombreProducto}</Text>
          
          {/* Fila de precio y stock */}
          <View style={styles.priceStockRow}>
            <PriceDisplay price={precio} />
            <Badge text={`Stock: ${stock} unidades`} />
          </View>

          <Divider />
          
          {/* Botón de compra con efecto de presión */}
          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed ? styles.buttonPressed : {}
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text style={styles.buttonText}>Comprar</Text>
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Características */}
        <View style={styles.caracteristicasContainer}>
          <View style={styles.descriptionHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
            <Text style={styles.caracteristicasTitulo}>Descripción</Text>
          </View>
          <Divider />
          <Text style={styles.caracteristicasTexto}>
            {descripcion}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Obtener dimensiones de pantalla para diseño responsive
const { width } = Dimensions.get('window');

// Paleta de colores moderna basada en el morado original
const COLORS = {
  primary: '#1d182e',         // Color base (morado oscuro)
  primaryLight: '#2d2842',    // Morado más claro para fondos secundarios
  accent: '#7A5CFB',          // Morado vibrante para acentos
  accentLight: '#9678FF',     // Morado más claro para hover
  success: '#00D283',         // Verde para botones activos
  successDark: '#00B873',     // Verde oscuro para efectos hover
  white: '#FFFFFF',           // Blanco para textos
  gray: '#E0E0E0',            // Gris claro para divisores
  textSecondary: '#E0E0E0',   // Texto secundario
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  imageCardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  imagenContenedor: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  imagen: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  infoSection: {
    width: '100%',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  nombreProducto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.5,
  },
  priceStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currencySymbol: {
    color: COLORS.success,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  priceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.success,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  badge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 16,
  },
  button: {
    backgroundColor: COLORS.success,
    padding: 16,
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonPressed: {
    backgroundColor: COLORS.successDark,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    marginRight: 8,
  },
  caracteristicasContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caracteristicasTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  caracteristicasTexto: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'left',
  },
});

export default DetalleProducto;