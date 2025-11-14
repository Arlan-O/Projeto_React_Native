import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";



// importação da imagem do botão adicionar
const add = require("../assets/btnAdd.png");
import { fetchEventosApi } from "./Servicos/API";
import { deletarEventoApi } from "./Servicos/API";
export default function Eventos() {
  const navigation = useNavigation();


  // Função para formatar a data 
  const formatoData = (dataString) => {
    const dataObj = new Date(dataString);
    const dia = String(dataObj.getUTCDate()).padStart(2, "0");
    const mes = String(dataObj.getUTCMonth() + 1).padStart(2, "0");
    const ano = dataObj.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // States do componente
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);





  const handledelete = async (idDelete) => {
    // console.log('Deletando!');
    try {
      // const response = await fetch("http://192.168.1.69:8080/eventos",{
      await deletarEventoApi(idDelete);
      setIsLoading(true);
      console.log('EVENTO DELETADO!');
      BuscaEventosApi();

    } catch (error) {
      console.error(error);
      console.log('Erro de rede, sem conexão com o servidor' + error.message);
    }
  }



  // Busca eventos na api 
  const BuscaEventosApi = async () => {
    setError(null);
    try {
      const response = await fetchEventosApi();
      const data = await response;
      setEventos(data.content);
    } catch (err) {
      setError("Falha ao carregar eventos. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    BuscaEventosApi()
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      BuscaEventosApi();
    }, [])
  );

  // Renderiza os cards de evento para a FlatList
  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.nome_evento}</Text>
      <Text style={styles.eventDetails}>Data: {formatoData(item.data)}</Text>
      <Text style={styles.eventDetails}>Local: {item.endereco.local}</Text>
      <View style={styles.btnCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditarEvento', { eventoId: item.id })}
          style={styles.btnEdit}>
          <Text style={styles.textBtn}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handledelete(item.id)} style={styles.btnDelete}>
          <Text style={styles.textBtn}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Renderização Condicional ---
  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#20262d" />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </View>
    );
  }

  // Renderização em caso de erro 
  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyText}>😢</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={BuscaEventosApi}
        >
          <Text style={styles.buttonTextPrimary}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Renderização se der tudo certo 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Eventos</Text>
        <TouchableOpacity
          style={styles.buttonNew}
          onPress={() => navigation.navigate("CadastroEvento")}
        >
          <Image style={styles.addImg} source={add} />
        </TouchableOpacity>
      </View>


      {eventos.length === 0 ? (
        // Se a lista estiver vazia
        <View style={styles.centeredContainer}>
          <Text style={styles.emptyFace}>😢</Text>
          <Text style={styles.emptyText}>Nenhum evento cadastrado ainda.</Text>
        </View>
      ) : (
        // Se a lista tiver eventos
        <FlatList
          data={eventos}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#20262d"]}
            />
          }
        />
      )}

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonTextSecondary}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  buttonNew: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addImg: {
    width: 45,
    height: 45,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  emptyFace: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  buttonPrimary: {
    backgroundColor: "#20262d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
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
  add: {
    width: 24,
    height: 24,
  },
  btnCard: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  btnEdit: {
    width: 150,
    height: 40,
    backgroundColor: "#20262d",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  textBtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  btnDelete: {
    width: 150,
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#f55540ff",
  },
});
