import { View, Text } from 'react-native'
import React from 'react'
import Splash from './app/components/splash/Splash'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/components/login/Login';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
 <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App