import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity, 
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroEquipe() {
  const navigation = useNavigation();

  
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
  });

 
  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

 
  const handleSubmit = async () => {
   
    if (!formData.nome || !formData.email || !formData.telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    console.log('Enviando para API:', formData);
    Alert.alert('Sucesso', 'Membro cadastrado (simulação)!');
    setFormData({ nome: '', telefone: '', email: '' }); 
    navigation.goBack();
 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Membro da Equipe</Text>

      <View style={styles.form}>
        
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Maria Souza"
          value={formData.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
          autoCapitalize="words" 
        />

        <Text style={styles.label}>Telefone / WhatsApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: (44) 99988-7766"
          value={formData.telefone}
          onChangeText={(text) => handleInputChange('telefone', text)}
          keyboardType="phone-pad"
        />

        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: maria.souza@email.com"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address" 
          autoCapitalize="none" 
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={handleSubmit}
        >
          <Text style={styles.buttonTextPrimary}>Cadastrar Membro</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonTextSecondary}>Voltar</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', 
    marginTop:40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  buttonPrimary: {
    backgroundColor: '#20262d',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20, 
    borderWidth: 2,
    borderColor: '#20262d',
  },
  buttonTextSecondary: {
    color: '#20262d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});