# Agendamento de Eventos (App Frontend)

![React Native](https://img.shields.io/badge/framework-React_Native-blue?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/plataforma-Expo-black?style=for-the-badge&logo=expo)
![Linguagem](https://img.shields.io/badge/linguagem-JavaScript-yellow?style=for-the-badge)

---

## 📖 Sobre o Projeto

Este projeto é o frontend (aplicativo móvel) para o **Sistema de Agendamento de Eventos**. O app consome a [API Spring Boot](https://github.com/Arlan-O/Projeto_Agendamento.git) e permite o gerenciamento completo (CRUD: Criar, Ler, Atualizar e Deletar) de **Eventos**.

Foi desenvolvido como um projeto de estudos, aplicando as boas práticas de desenvolvimento mobile com React Native, como a separação de responsabilidades (Componentes de tela, Serviços de API) e o uso de hooks para gerenciamento de estado.

---

## 🛠️ Tecnologias Utilizadas

As seguintes ferramentas e tecnologias foram usadas na construção do projeto:

* **React Native:** Framework para desenvolvimento de apps nativos (iOS e Android).
* **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento React Native.
* **React Navigation:** Para gerenciamento das rotas e navegação entre as telas.
* **npm:** Para gerenciamento de pacotes e dependências.
* **Fetch API:** Para realizar as chamadas HTTP para o backend.

---

## 🚀 Como Rodar o Projeto Localmente

Siga estes passos para configurar e executar o projeto em sua máquina local.

### 1. Pré-requisitos

* [Node.js (versão LTS)](https://nodejs.org/en/)
* [Git](https://git-scm.com/)
* O app **[Expo Go](https://expo.dev/go)** no seu celular (iOS ou Android).

### 2. Instalação (Passo a Passo)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Arlan-O/Projeto_React_Native.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd Projeto_React_Native
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### 3. Executando o App

1.  **Inicie o servidor de desenvolvimento Expo:**
    ```bash
    npx expo start
    ```

2.  **Abra o aplicativo:**
    * Um QR Code aparecerá no seu terminal.
    * Abra o aplicativo **Expo Go** no seu celular e escaneie o QR Code.
    * O aplicativo será carregado automaticamente no seu dispositivo.

---

## ⚙️ Configuração da API (Importante!)

Para que o aplicativo funcione, ele precisa saber onde encontrar o seu servidor (o backend Spring Boot).

1.  **Abra o arquivo de serviço da API:**
    `src/Servicos/API.js`

2.  **Encontre a constante `BASE_URL`:**
    ```javascript
    // src/Servicos/API.js
    const BASE_URL = 'http://localhost:8080';
    ```

3.  **Altere o endereço:**
    * Como você está executando no celular (Expo Go), `localhost` **não vai funcionar**.
    * Você **precisa** usar o endereço de IP da sua máquina na rede local (Wi-Fi).

    **Exemplo de Correção:**
    ```javascript
    // 1. Descubra o IP da sua máquina (ex: 'ipconfig' no Windows ou 'ifconfig' no Mac)
    // 2. Garanta que seu celular e computador estão na MESMA rede Wi-Fi

    // Substitua 'localhost' pelo seu IP:
    const BASE_URL = '[http://192.168.1.10:8080](http://192.168.1.10:8080)'; // (Use o SEU IP aqui)
    ```

4.  Salve o arquivo. O Expo Go deve recarregar o app automaticamente com a nova configuração.

[app-planner.webm](https://github.com/user-attachments/assets/8346f75b-d607-4a91-9ebb-665245222388)

