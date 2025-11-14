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

export default function CadastroTarefas() {
  const navigation = useNavigation();

  
  const [formData, setFormData] = useState({
    nome_tarefa: '',
    responsavel: '',
    prazo: '',
    status: 'Pendente', 
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  
  const handleSubmit = async () => {
    if (!formData.nome_tarefa || !formData.responsavel) {
      Alert.alert('Erro', 'Preencha pelo menos o Nome da Tarefa e o Responsável.');
      return;
    }
    
    console.log('Enviando para API:', formData);
    Alert.alert('Sucesso', 'Tarefa cadastrada (simulação)!');
    setFormData({ nome_tarefa: '', responsavel: '', prazo: '', status: 'Pendente' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Tarefa</Text>

      <View style={styles.form}>
        
        <Text style={styles.label}>Nome da Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Contratar banda"
          value={formData.nome_tarefa}
          onChangeText={(text) => handleInputChange('nome_tarefa', text)}
        />

        
        <Text style={styles.label}>Responsável</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: João (da equipe)"
          value={formData.responsavel}
          onChangeText={(text) => handleInputChange('responsavel', text)}
          autoCapitalize="words"
        />

        
        <Text style={styles.label}>Prazo (Data Limite)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: DD/MM/AAAA"
          value={formData.prazo}
          onChangeText={(text) => handleInputChange('prazo', text)}
          keyboardType="numeric"
        />

        
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Pendente, Em Andamento, Concluído"
          value={formData.status}
          onChangeText={(text) => handleInputChange('status', text)}
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={handleSubmit}
        >
          <Text style={styles.buttonTextPrimary}>Cadastrar Tarefa</Text>
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
  // --- Estilos para os botões ---
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
  buttonTextSecondary: {
    color: '#20262d',
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
});