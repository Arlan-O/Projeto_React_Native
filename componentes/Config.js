import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator, // Ícone de "carregando"
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Config() {
  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []); 

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.maintenanceIcon}>🛠️</Text>
      <Text style={styles.maintenanceTitle}>Em Manutenção</Text>
      <Text style={styles.maintenanceText}>
        Estamos em manutenções, volte mais tarde.
      </Text>
      
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.buttonSecondary} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonTextSecondary}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  maintenanceIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  maintenanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  maintenanceText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  // Botão "Voltar" (estilo secundário)
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#20262d',
  },
  buttonTextSecondary: {
    color: '#20262d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});