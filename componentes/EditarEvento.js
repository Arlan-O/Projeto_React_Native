import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator, 
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { buscarEventoPorId, atualizarEvento } from './Servicos/API';

export default function EditarEvento() {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { eventoId } = route.params; 

  const [isLoading, setIsLoading] = useState(true); 
  const [formData, setFormData] = useState({
    nome_evento:'',
    data: '',
    local: '',
    logradouro: '',
    numero: '',
    cep: '',
    cidade: '',
    uf: '',
  });

  // 1. BUSCAR DADOS
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const fullEventData = await buscarEventoPorId(eventoId);

        let dataLimpa = fullEventData.data;
        if(dataLimpa && dataLimpa.includes('T')) {
            dataLimpa = dataLimpa.split('T')[0]; 
        }
        
        const [ano, mes, dia] = dataLimpa.split('-');
        const dataFormatada = `${dia}/${mes}/${ano}`;

        setFormData({
          nome_evento: fullEventData.nome_evento,
          data: dataFormatada,
          local: fullEventData.endereco.local,
          logradouro: fullEventData.endereco.logradouro,
          numero: fullEventData.endereco.numero,
          cep: fullEventData.endereco.cep,
          cidade: fullEventData.endereco.cidade,
          uf: fullEventData.endereco.uf,
        });

      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
        navigation.goBack(); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventoId]);

  const handleFormChange = (field, value) => {
    let formattedValue = value;
    
    // Máscara de Data
    if (field === 'data') {
      const cleaned = value.replace(/[^0-9]/g, '');
      if (cleaned.length > 2 && cleaned.length <= 4) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      } else if (cleaned.length > 4) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
      } else {
        formattedValue = cleaned;
      }
    }
    
    if (field === 'cep') {
       const cleaned = value.replace(/[^0-9]/g, '');

       
       if (cleaned.length > 5) {
         
         formattedValue = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
       } else {
         formattedValue = cleaned;
       }
    }

    setFormData(prevData => ({ ...prevData, [field]: formattedValue }));
  };

  const handleUpdateEvent = async () => {
    if (!formData.data || !formData.local || !formData.nome_evento) {
      Alert.alert('Erro', 'Preencha Nome, Data e Local.');
      return;
    }

    // Converte data para YYYY-MM-DD
    const [dia, mes, ano] = formData.data.split('/');
    const dataISO = `${ano}-${mes}-${dia}`;

    const dadosAtualizados = {
      nome_evento: formData.nome_evento,
      data: dataISO,
      endereco: {
        local: formData.local,
        logradouro: formData.logradouro,
        numero: formData.numero,
        cep: formData.cep,       
        cidade: formData.cidade, 
        uf: formData.uf,         
      }
    };

    try {
      await atualizarEvento(eventoId, dadosAtualizados);
      Alert.alert('Sucesso', 'Evento atualizado!');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      const msg = err.message || 'Erro desconhecido';
      Alert.alert('Erro', 'Falha ao salvar: ' + msg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.modalContainer}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.modalForm}>
          
          <Text style={styles.modalTitle}>Editar Evento</Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#20262d" />
          ) : (
            <>
              <Text style={styles.label}>Nome do Evento</Text>
              <TextInput
                style={styles.input}
                value={formData.nome_evento}
                onChangeText={(text) => handleFormChange('nome_evento', text)}
              />
              
              <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
              <TextInput
                style={styles.input}
                value={formData.data}
                onChangeText={(text) => handleFormChange('data', text)}
                keyboardType="numeric"
                maxLength={10}
              />

              <Text style={styles.label}>Local</Text>
              <TextInput
                style={styles.input}
                value={formData.local}
                onChangeText={(text) => handleFormChange('local', text)}
              />

              <Text style={styles.label}>Logradouro</Text>
              <TextInput
                style={styles.input}
                value={formData.logradouro}
                onChangeText={(text) => handleFormChange('logradouro', text)}
              />

              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                value={formData.numero}
                onChangeText={(text) => handleFormChange('numero', text)}
                keyboardType="numeric"
              />
              
              <Text style={styles.label}>CEP</Text>
              <TextInput
                style={styles.input} 
                value={formData.cep}
                onChangeText={(text) => handleFormChange('cep', text)}
                keyboardType="numeric"
              />

              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput
                        style={styles.input} 
                        value={formData.cidade}
                        onChangeText={(text) => handleFormChange('cidade', text)}
                    />
                </View>
                <View style={{width: 80}}>
                    <Text style={styles.label}>UF</Text>
                    <TextInput
                        style={styles.input} 
                        value={formData.uf}
                        onChangeText={(text) => handleFormChange('uf', text)}
                        maxLength={2}
                        autoCapitalize="characters"
                    />
                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleUpdateEvent}
              >
                <Text style={styles.buttonTextPrimary}>Salvar Alterações</Text>
              </TouchableOpacity>

              <TouchableOpacity
                 style={styles.buttonSecondary}
                 onPress={() => navigation.goBack()}
               >
                 <Text style={styles.buttonTextSecondary}>Cancelar</Text>
               </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalForm: {
    flexGrow: 1,
    padding: 20,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    color: '#000', 
  },
  buttonPrimary: {
    backgroundColor: "#20262d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#20262d",
  },
  buttonTextSecondary: {
    color: "#20262d",
    fontSize: 18,
    fontWeight: "bold",
  },
});