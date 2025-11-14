import React, { useState } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cadastrarEventoApi} from "./Servicos/API";

export default function CadastroEvento() {
  const navigation = useNavigation();

  
  const [formData, setFormData] = useState({
    
    nome_evento: "",
    data: "",
    numero_convidados: "",
    local: "",
    logradouro: "",
    numero: "",
    cep: "",
    cidade: "",
    uf: "",
  });

 
  const handleInputChange = (field, value) => {
    let formattedValue = value;

    
    if (field === "data") {
     
      const cleaned = value.replace(/[^0-9]/g, "");

      if (cleaned.length > 2 && cleaned.length <= 4) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      } else if (cleaned.length > 4) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(
          2,
          4
        )}/${cleaned.slice(4, 8)}`;
      } else {
        formattedValue = cleaned;
      }
    }


    setFormData((prevData) => ({
      ...prevData,
      [field]: formattedValue,
    }));
  };

  
  const handleSubmit = async () => {
   
    if (!formData.nome_evento || !formData.data || !formData.local) {
      Alert.alert("Erro", "Preencha pelo menos Nome, Data e Local do evento.");
      return;
    }

    const [dia, mes, ano] = formData.data.split("/");
    const dataISO = `${ano}-${mes}-${dia}`;

    const convidados = parseInt(formData.numero_convidados, 10) || 0;

    const dados = {
      nome_evento: formData.nome_evento,
      data: dataISO,
      numero_convidados: convidados,
      endereco: {
        local: formData.local,
        logradouro: formData.logradouro,
        numero: formData.numero,
        cep: formData.cep,
        cidade: formData.cidade,
        uf: formData.uf,
      },
    };

    try {
      await cadastrarEventoApi(dados);
      console.log("cadastrado!");
      navigation.goBack();
    } catch (err) {
      console.error("Erro no handleSubmit: ", err);
    }
    
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastrar Novo Evento</Text>

        <View style={styles.form}>
 
          <Text style={styles.sectionTitle}>Dados do Evento</Text>
          <Text style={styles.label}>Nome do Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Casamento de Ana e Bruno"
            value={formData.nome_evento}
            onChangeText={(text) => handleInputChange("nome_evento", text)}
          />

          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: DD/MM/AAAA"
            value={formData.data}
            onChangeText={(text) => handleInputChange("data", text)}
            keyboardType="numeric"
            maxLength={10}
          />

          <Text style={styles.label}>Número de Convidados</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 150"
            value={formData.numero_convidados}
            onChangeText={(text) =>
              handleInputChange("numero_convidados", text)
            }
            keyboardType="numeric"
          />


          <Text style={styles.sectionTitle}>Endereço</Text>

          <Text style={styles.label}>Local (Salão, Chácara, etc.)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Salão de Festas Felicidade"
            value={formData.local}
            onChangeText={(text) => handleInputChange("local", text)}
          />

          <Text style={styles.label}>Logradouro (Rua/Avenida)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Av. Principal"
            value={formData.logradouro}
            onChangeText={(text) => handleInputChange("logradouro", text)}
          />

          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1000"
            value={formData.numero}
            onChangeText={(text) => handleInputChange("numero", text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 87000-000"
            value={formData.cep}
            onChangeText={(text) => handleInputChange("cep", text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Curitiba"
            value={formData.cidade}
            onChangeText={(text) => handleInputChange("cidade", text)}
          />

          <Text style={styles.label}>UF</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: PR"
            value={formData.uf}
            onChangeText={(text) => handleInputChange("uf", text)}
            maxLength={2} 
            autoCapitalize="characters" 
          />

          
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
            <Text style={styles.buttonTextPrimary}>Cadastrar Evento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonTextSecondary}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  buttonPrimary: {
    backgroundColor: "#20262d",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20, 
    borderWidth: 2,
    borderColor: "#20262d",
  },
  buttonTextSecondary: {
    color: "#20262d",
    fontSize: 18,
    fontWeight: "bold",
  },
});
