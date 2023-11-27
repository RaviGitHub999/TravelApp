import { View, Text } from 'react-native'
import React from 'react'
import Splash from './app/components/splash/Splash'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/components/login/Login';
import SignUp from './app/components/signUp/SignUp';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
 <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App