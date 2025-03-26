import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    const logoOpacity = new Animated.Value(0);
    const textOpacity = new Animated.Value(0);

    useEffect(() => {
        // Animación para el logo
        Animated.sequence([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            router.replace('Home');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/logo.png')}
                style={[styles.logo, { opacity: logoOpacity }]}
            />
            <Animated.Text style={[styles.appName, { opacity: textOpacity }]}>
                SentinelApp
            </Animated.Text>
            <Text style={styles.tagline}>Seguridad a tu alcance</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d182e',
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'CenturyGothic-Bold',
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 16,
        color: '#7A5CFB',
        fontFamily: 'CenturyGothic',
        marginTop: 10,
    }
});
