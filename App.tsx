import { View, Text } from 'react-native'
import React from 'react'
import Splash from './app/components/splash/Splash'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/components/login/Login';
import SignUp from './app/components/signUp/SignUp';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import AppNavigation from './app/components/common/navigation/AppNavigation';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
    </Provider>
  )
}

export default App