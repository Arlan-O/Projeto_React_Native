
const BASE_URL = 'http://localhost:8080';

export const fetchEventosApi = async () => {
    
  try {
    const response = await fetch(`http://localhost:8080/eventos`, {method: 'GET'});

    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(`Erro da API: ${response.status} - ${erroTexto}`);
    }

    return response.json();

  } catch (error) {

    console.error('Erro no serviço fetchEventosApi:', error);
    throw error; 
  }
};

export const buscarEventoPorId = async (idDoEvento) => {
  try {
    const response = await fetch(`${BASE_URL}/eventos/${idDoEvento}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(`Erro ao buscar evento: ${erroTexto || response.status}`);
    }

    return await response.json(); 

  } catch (error) {
    console.error('Erro no serviço buscarEventoPorId:', error);
    throw error;
  }
};


export const deletarEventoApi = async (idDoEvento) => {
  try {
    const response = await fetch(`${BASE_URL}/eventos/${idDoEvento}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const textoErro = await response.text();
      throw new Error(`'Erro ao deletar evento.'${textoErro || response.status}`);
    }
    
    return true; 

  } catch (error) {
    console.error('Erro no serviço deletarEventoApi:', error);
    throw error;
  }
};

export const cadastrarEventoApi = async (dadosDoEvento) => {
  try {
    const response = await fetch(`${BASE_URL}/eventos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosDoEvento),
    });

    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(`Erro da API: ${erroTexto || response.status}`);
    }

  } catch (error) {
    
    console.error('Erro no serviço cadastrarEventoApi:', error);
    throw error; 
  }
};

export const atualizarEvento = async (id, dadosAtualizar) => {
  try {
    const response = await fetch(`${BASE_URL}/eventos/${id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAtualizar),
    });

    if (!response.ok) {
      const erroMsg = await response.text();
      throw new Error(erroMsg || 'Erro ao atualizar evento');
    }

    return true; 

  } catch (error) {
    console.error("Erro em atualizarEvento:", error);
    throw error;
  }
};