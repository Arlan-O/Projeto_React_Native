

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator(); 
const Stack = createNativeStackNavigator(); 

import Home from './componentes/Home';
import Eventos from './componentes/Eventos';
import Config from './componentes/Config';
import Tarefas from './componentes/Tarefas';
import CadastroEquipe from './componentes/CadastroEquipe';
import CadastroEvento from './componentes/CadastroEvento';
import CadastroTarefa from './componentes/CadastroTarefa';
import EditarEvento from './componentes/EditarEvento';


function Tabs() { 

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#20262d',
        },
        headerShown: false,
        tabBarActiveTintColor: '#4980beff',     
        tabBarInactiveTintColor: '#c7def8ff',     
      }}
    >

      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size || 24} />
          ),
          headerShown: false
        }} />

      <Tab.Screen name="Eventos" component={Eventos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='event' color={color} size={size || 24} />
          ),
          headerShown: false
        }} />

      <Tab.Screen name="Tarefas" component={Tarefas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='list' color={color} size={size || 24} />
          ),
          headerShown: false
        }}
      />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Eventos" component={Eventos} />
          <Stack.Screen name="Config" component={Config} />
          <Stack.Screen name="Tarefas" component={Tarefas} />
          <Stack.Screen name='CadastroEvento' component={CadastroEvento} />
          <Stack.Screen name='CadastroEquipe' component={CadastroEquipe} />
          <Stack.Screen name='CadastroTarefa' component={CadastroTarefa} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="EditarEvento" component={EditarEvento} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
