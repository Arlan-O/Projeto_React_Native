import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//dados para renderizar na tela de tarefas (Sem acesso a api)
// const MOCK_DATA = [
//   { id: 1, nome_tarefa: 'Contratar banda', responsavel: 'Maria', status: 'Pendente' },
//   { id: 2, nome_tarefa: 'Reservar salão', responsavel: 'João', status: 'Concluído' },
//   { id: 3, nome_tarefa: 'Enviar convites', responsavel: 'Maria', status: 'Em Andamento' },
// ];


const MOCK_DATA = []; 

export default function Tarefas() {
  const navigation = useNavigation();

  // States para gerenciar os dados da API
  const [tarefas, setTarefas] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // useEffect é executado quando o componente é montado
  useEffect(() => {
    fetchTarefas();
  }, []);

  // Função para buscar os dados da sua API Spring Boot
  const fetchTarefas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      //  Simulação de API 
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setTarefas(MOCK_DATA); 
      // Fim da Simulação 

    } catch (err) {
      setError('Falha ao carregar tarefas. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false); 
    }
  };

  
  const renderTaskItem = ({ item }) => {
    
    let statusColor = '#777'; // Padrão (Pendente)
    if (item.status === 'Concluído') statusColor = '#2ecc71'; // Verde
    if (item.status === 'Em Andamento') statusColor = '#f39c12'; // Laranja
    
    return (
      <View style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.nome_tarefa}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.taskDetails}>Responsável: {item.responsavel}</Text>
      </View>
    );
  };


   if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  // Se der erro
  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyFace}>😢</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={fetchTarefas} // Recarregar
        >
          <Text style={styles.buttonTextPrimary}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Renderiza se tiver taferas no banco
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <TouchableOpacity 
          style={styles.buttonNew}
          onPress={() => navigation.navigate('Config')} 
        >
          <Text style={styles.buttonNewText}>+</Text>
        </TouchableOpacity>
      </View>

      {tarefas.length === 0 ? (
        // Se a lista estiver vazia
        <View style={styles.centeredContainer}>
          <Text style={styles.emptyFace}>😢</Text>
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada ainda.</Text>
        </View>
      ) : (
        // Se a lista tiver tarefas
        <FlatList
          data={tarefas}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
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
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
 
  buttonNew: {
    backgroundColor: '#20262d',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNewText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  emptyFace: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  list: {
    flex: 1,
  },
  // Card da Tarefa
  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, 
    marginRight: 10, 
  },
  taskDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  buttonPrimary: {
    backgroundColor: '#20262d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: '#20262',
  },
  buttonTextSecondary: {
    color: '#20262d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});