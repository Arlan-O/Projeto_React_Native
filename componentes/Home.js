import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
const logo = require("../assets/logo.png");
const cakeAdd = require("../assets/cake_Add.png");
const tarefa = require("../assets/listAdd.png");
const equipe = require("../assets/Equipe.png");
const config = require("../assets/settings.png");


export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={estilo.page}>
      <Image source={logo} style={estilo.logo} />

      <Text style={estilo.textTopo}>Gestão do evento</Text>

      <View style={estilo.container}>
        <View style={estilo.btn}>
          <TouchableOpacity
            style={estilo.botao}
            onPress={() => navigation.navigate("CadastroEvento")}
          >
            
            <Image style={estilo.imgBotao} source={cakeAdd} />
          </TouchableOpacity>

          <View>
            <Text style={estilo.textoBotao}>Adicionar Evento</Text>
          </View>
        </View>

        <View style={estilo.btn}>
          <TouchableOpacity
            style={estilo.botao}
            onPress={() => navigation.navigate("Config")}
          >
            <Image style={estilo.imgBotao} source={equipe} />
          </TouchableOpacity>

          <View>
            <Text style={estilo.textoBotao}>Adicionar Equipe</Text>
          </View>
        </View>

        <View style={estilo.btn}>
          <TouchableOpacity
            style={estilo.botao}
            onPress={() => navigation.navigate("Config")}
          >
            <Image style={estilo.imgBotao} source={tarefa} />
          </TouchableOpacity>

          <View>
            <Text style={estilo.textoBotao}>Adicionar Tarefa</Text>
          </View>
        </View>

        <View style={estilo.btn}>
          <TouchableOpacity
            style={estilo.botao}
            onPress={() => navigation.navigate("Config")}
          >
            <Image style={estilo.imgBotao} source={config} />
          </TouchableOpacity>

          <View>
            <Text style={estilo.textoBotao}>Configurações</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  areaBotoes: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
   
  },

  botao: {
    padding: 15,
    borderRadius: "20%",
    backgroundColor: "#dce9f8ff",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 75,
    shadowColor: "#0c2b4ebb",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  imgBotao: {
    margin: 15,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 10,
    paddingTop: 10,
    color: "#20262d",
  },

  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dce9f8ff",
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },

  textTopo: {
    fontSize: 30,
    marginBottom: 25,
  },

  container: {
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    gap: 25,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    flexWrap: "wrap",
    width: "90%",
    shadowColor: "#0c2b4ebb",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
});
