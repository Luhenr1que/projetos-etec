
import React, { useState, useEffect }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AudioProvider } from './audioContext.js';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import Home from './src/pages/home';
import Cadastrar from './src/pages/login/cadastar';
import Entrar from './src/pages/login/entrar';
import Terri1 from './src/pages/territorios/1';
import Terri2 from './src/pages/territorios/2';
import Terri3 from './src/pages/territorios/3';
import Terri4 from './src/pages/territorios/4';
import Terri5 from './src/pages/territorios/5';
import Terri6 from './src/pages/territorios/6';
import Inicio from './src/pages/login/inicio';
import Splach from './src/pages/splach';

const Stack = createNativeStackNavigator();


export default function App() {

  const [font,setFont] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'sonic': require('./assets/fonts/Supersonic.ttf'),
        'cream': require('./assets/fonts/cream.ttf')
      })
      setFont(true)
    }
    loadFonts()
  }, [])

  return (
    <AudioProvider>

        <NavigationContainer>
        <StatusBar 
          hidden={true}
        />
        <Stack.Navigator>

        <Stack.Screen 
          name="Splach" 
          component={Splach} 
          options={{
            headerShown: false,
          }}
          />

        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
            name="Cadastrar" 
            component={Cadastrar} 
            options={{
              headerShown: false,
          }}
          />
          

          <Stack.Screen 
          name="Entrar" 
          component={Entrar} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Terri1" 
          component={Terri1} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Terri2" 
          component={Terri2} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Terri3" 
          component={Terri3} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Terri4" 
          component={Terri4} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Terri5" 
          component={Terri5} 
          options={{
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Terri6" 
          component={Terri6} 
          options={{
            headerShown: false,
          }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AudioProvider>

  );
}
